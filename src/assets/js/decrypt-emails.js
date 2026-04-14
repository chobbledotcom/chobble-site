/**
 * Client-side AES-CTR decryption for obfuscated email links.
 *
 * At build time, mailto: links are encrypted and marked with
 * data-decrypt-link. This script decrypts them using the key
 * stored in its own script tag's data-decrypt-key attribute.
 */
(function () {
  "use strict";

  var NONCE_BYTES = 3;
  var BLOCK_BYTES = 16;
  var BITS_PER_BYTE = 8;

  /** @param {number} code @returns {number} */
  function getValue(code) {
    if (code === 45) return 63;
    if (code < 58) return code - 48;
    if (code < 91) return code - 29;
    if (code === 95) return 62;
    return code - 87;
  }

  /**
   * Decode custom base64 text to bytes.
   * @param {string} text
   * @returns {Uint8Array}
   */
  function decodeBase64(text) {
    var values = [];
    for (var c = 0; c < text.length; c++) {
      values.push(getValue(text.charCodeAt(c)));
    }
    var length = Math.floor((3 * values.length) / 4);
    var bytes = new Uint8Array(length);
    for (var j = 0; j < length; j++) {
      var i = Math.floor(j / 3) * 4 + (j % 3) + 1;
      var r = 2 * (i % 4);
      bytes[j] = ((values[i - 1] << r) & 0xff) | (values[i] >> (6 - r));
    }
    return bytes;
  }

  /** @param {string} keyText @returns {Promise<CryptoKey>} */
  function importKey(keyText) {
    return window.crypto.subtle.importKey(
      "raw",
      decodeBase64(keyText),
      { name: "AES-CTR" },
      false,
      ["decrypt"],
    );
  }

  /** @param {string} inputText @param {CryptoKey} key @returns {Promise<string>} */
  function decrypt(inputText, key) {
    var inputBytes = decodeBase64(inputText);
    var nonceBytes = inputBytes.slice(0, NONCE_BYTES);
    var codeBytes = inputBytes.slice(NONCE_BYTES);

    var counter = new Uint8Array(BLOCK_BYTES);
    counter.set(nonceBytes);

    return window.crypto.subtle
      .decrypt(
        {
          name: "AES-CTR",
          counter: counter,
          length: (BLOCK_BYTES - NONCE_BYTES) * BITS_PER_BYTE,
        },
        key,
        codeBytes,
      )
      .then(function (plainBytes) {
        return new TextDecoder().decode(plainBytes);
      });
  }

  function init() {
    var scriptTag = document.querySelector("script[data-decrypt-key]");
    if (!scriptTag) return;

    var keyText = scriptTag.getAttribute("data-decrypt-key");
    if (!keyText) return;

    if (!window.crypto || !window.crypto.subtle) return;

    var links = document.querySelectorAll("a[data-decrypt-link]");
    if (links.length === 0) return;

    importKey(keyText).then(function (key) {
      for (var idx = 0; idx < links.length; idx++) {
        (function (link) {
          Promise.all([
            decrypt(link.getAttribute("href").replace(/^#/, ""), key),
            decrypt(link.innerHTML, key),
          ]).then(function (results) {
            link.setAttribute("href", results[0]);
            link.innerHTML = results[1];
          });
        })(links[idx]);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
