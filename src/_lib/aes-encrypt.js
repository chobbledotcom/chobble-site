/**
 * Build-time AES-256-CTR encryption for email obfuscation.
 *
 * Encrypts email addresses at build time so they can be decrypted
 * client-side using the Web Crypto API.
 */
const { createCipheriv, randomBytes } = require("node:crypto");
const {
  BLOCK_BYTES,
  decodeBase64,
  encodeBase64,
  NONCE_BYTES,
} = require("./aes-base64");

const KEY_BYTES = 32; // AES-256

/** @returns {string} */
const generateKeyText = () => encodeBase64(randomBytes(KEY_BYTES));

/**
 * Encrypt plaintext using AES-256-CTR with a random nonce.
 * Output format: base64(nonce + ciphertext)
 * @param {string} plainText
 * @param {Uint8Array} keyBytes
 * @returns {string}
 */
const encrypt = (plainText, keyBytes) => {
  const nonce = randomBytes(NONCE_BYTES);
  const iv = Buffer.alloc(BLOCK_BYTES);
  nonce.copy(iv);

  const cipher = createCipheriv("aes-256-ctr", Buffer.from(keyBytes), iv);
  const codeBytes = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  const output = Buffer.concat([nonce, codeBytes]);
  return encodeBase64(new Uint8Array(output));
};

module.exports = { decodeBase64, encodeBase64, encrypt, generateKeyText };
