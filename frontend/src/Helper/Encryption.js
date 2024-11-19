import CryptoJS from "crypto-js";

function encryptMessage(data) {
  const secretKey = process.env.REACT_APP_SKEY;

  if (!data) {
    throw new Error("The message to encrypt is undefined or empty.");
  }

  if (!secretKey) {
    throw new Error(
      "The encryption key (REACT_APP_SKEY) is missing or undefined."
    );
  }

  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export default encryptMessage;
