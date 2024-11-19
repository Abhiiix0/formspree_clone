import decryptMessage from "../helper/DecryptData.js";

function decryptMiddleware(req, res, next) {
  try {
    const { encData } = req.body;
    if (!encData) {
      return res.status(400).json({ error: "Missing encrypted data" });
    }
    // Decrypt the data
    const decryptedData = decryptMessage(encData);
    console.log(decryptMessage);
    // Attach the decrypted data to req.body for further processing
    req.body = decryptedData;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Decryption Error:", error.message);
    return res.status(500).json({ error: "Failed to decrypt data" });
  }
}
export default decryptMiddleware;
