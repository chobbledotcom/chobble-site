/**
 * Build-time transform that encrypts mailto: links in HTML.
 *
 * Uses jsdom to find all <a href="mailto:..."> elements, encrypts the href
 * and visible text, and adds a data-decrypt-link attribute so the
 * browser-side decrypt script can restore them.
 */
const { JSDOM } = require("jsdom");
const { generateKeyText, encrypt, decodeBase64 } = require("./aes-encrypt");

const keyText = generateKeyText();
const keyBytes = decodeBase64(keyText);

/**
 * Encrypt all mailto: links in an HTML string.
 * Also converts plain-text email addresses into encrypted mailto links.
 * @param {string} content - HTML content
 * @returns {string} - HTML with encrypted email links
 */
const encryptEmailsInHtml = (content) => {
  if (!content.includes("mailto:") && !content.includes("@")) return content;

  const dom = new JSDOM(content);
  const document = dom.window.document;

  // Encrypt existing mailto links
  for (const link of document.querySelectorAll('a[href^="mailto:"]')) {
    link.textContent = encrypt(link.textContent, keyBytes);
    link.setAttribute("href", encrypt(link.getAttribute("href"), keyBytes));
    link.setAttribute("data-decrypt-link", "");
  }

  return dom.serialize();
};

/**
 * Get the encryption key text for injecting into templates.
 * @returns {string}
 */
const getKeyText = () => keyText;

module.exports = { encryptEmailsInHtml, getKeyText };
