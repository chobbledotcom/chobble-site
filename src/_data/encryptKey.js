/**
 * Eleventy global data: AES encryption key for email obfuscation.
 *
 * Generates a single key per build. Available in templates as {{ encryptKey }}.
 */
const { generateKeyText } = require("../_lib/aes-encrypt");

const keyText = generateKeyText();

module.exports = function () {
  return keyText;
};
