import CryptoJS from "crypto-js";

function decryptMessage(encryptedData) {
  const secretKey = process.env.SKEY; // Use the same key as the frontend

  if (!secretKey) {
    throw new Error("Decryption key (SECRET_KEY) is missing or undefined.");
  }

  // Decrypt the data using the key
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to UTF-8 string

  // Parse the decrypted data back to JSON
  return JSON.parse(decryptedData);
}
export default decryptMessage;
