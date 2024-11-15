import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    const token = req?.cookies?.token || "";
    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Attach the user data to the request object
    req.user = decoded;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
}
