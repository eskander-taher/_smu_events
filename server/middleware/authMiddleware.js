const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Adjust the path as necessary

const authenticateToken = (requiredRole) => async (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			success: false,
			error: "Доступ запрещен. Токен не предоставлен.",
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);

		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(404).json({
				success: false,
				error: "Пользователь не найден.",
			});
		}

		if (!user.verifiedByEmail) {
			return res.status(403).json({
				success: false,
				error: "Электронная почта пользователя не подтверждена. Пожалуйста, подтвердите свой адрес электронной почты.",
			});
		}

		if (user.role === "модератор") {
			if (!user.verifiedByAdmin) {
				return res.status(403).json({
					success: false,
					error: "модератор не проверен администратором.",
				});
			}
		}

		if (user.role !== requiredRole) {
			return res.status(403).json({
				success: false,
				error: "Доступ запрещен. Недостаточно прав.",
			});
		}

		req.user = user; // Attach the user to the request for later use in the route handler
		next();
	} catch (error) {
		console.error("Ошибка аутентификации:", error);
		res.status(401).json({
			success: false,
			error: "Неверный токен.",
		});
	}
};

module.exports = authenticateToken;
