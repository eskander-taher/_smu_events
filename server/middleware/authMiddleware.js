const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Adjust the path as necessary

const authenticateToken = (requiredRole) => async (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			success: false,
			error: "Access denied. Token not provided.",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);

		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(404).json({
				success: false,
				error: "User not found.",
			});
		}

		if (!user.verifiedByEmail) {
			return res.status(403).json({
				success: false,
				error: "User email not verified. Please verify your email.",
			});
		}

		if (user.role === "mod") {
			if (!user.verifiedByAdmin) {
				return res.status(403).json({
					success: false,
					error: "Mod  not verified by admin.",
				});
			}
		}

		if (user.role !== requiredRole) {
			return res.status(403).json({
				success: false,
				error: "Access denied. Insufficient privileges.",
			});
		}

		req.user = user; // Attach the user to the request for later use in the route handler
		next();
	} catch (error) {
		console.error("Authentication error:", error);
		res.status(401).json({
			success: false,
			error: "Invalid token.",
		});
	}
};

module.exports = authenticateToken;
