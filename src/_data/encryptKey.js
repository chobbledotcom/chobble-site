/**
 * Eleventy global data: AES encryption key for email obfuscation.
 *
 * Generates a single key per build. Available in templates as {{ encryptKey }}.
 */
const { getKeyText } = require("../_lib/encrypt-emails");

const keyText = getKeyText();

module.exports = function () {
  return keyText;
};
