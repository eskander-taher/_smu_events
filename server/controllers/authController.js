const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Author = require("../models/authorModel");
const Mod = require("../models/modModel");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

const SALT_ROUNDS = 10;

const userRegistrationSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	middleName: z.string().min(1).optional(),
	phoneNumber: z.string().min(1).optional(),
	dateOfBirth: z.string().optional(),
});

const authorRegistrationSchema = userRegistrationSchema.extend({
	authorStatus: z.enum([
		"Молодой ученый",
		"Специалитет",
		"Бакалавриат",
		"Магистрант",
		"Аспирант",
	]),
	region: z.string().min(1),
	city: z.string().min(1),
	university: z.string().min(1),
	faculty: z.string().min(1),
	department: z.string().min(1),
	course: z.number().int().min(1),
	groupNumber: z.string().min(1),
});

const modRegistrationSchema = userRegistrationSchema.extend({
	faculty: z.string().min(1),
	department: z.string().min(1),
	jobTitle: z.enum([
		"Ассистент",
		"Старший преподаватель",
		"Доцент",
		"Профессор",
		"Заведующий кафедрой",
	]),
});

exports.registerUser = async (req, res) => {
	try {
		// Validating user input
		let user = null;
		try {
			user = userRegistrationSchema.parse(req.body);
		} catch (error) {
			return res
				.status(400)
				.json({ success: false, message: "Данные формы введены неверно", error });
		}

		// Storing user input in db
		let createdUser = null;
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(user.password, salt);

			createdUser = new User({
				...user,
				password: hashedPassword,
			});

			await createdUser.save();
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: "Не удалось сохранить данные в БД", error });
		}

		try {
			const { id, email } = createdUser;
			await sendVerificationEmail(id, email);
			res.json({
				success: true,
				message: `Сообщение о подтверждении было отправлено на электронную почту: ${email}`,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				error,
				message: "Не удалось отправить письмо с подтверждением.",
			});
		}
	} catch (error) {
		return res.status(500).json({ success: false, error, message: "Ошибка сервера" });
	}
};

exports.registerAuthor = async (req, res) => {
	try {
		// Validating author input
		let author = null;

		try {
			author = authorRegistrationSchema.parse({
				...req.body,
				course: parseInt(req.body.course),
			});
		} catch (error) {
			console.log(error);
			return res
				.status(400)
				.json({ success: false, message: "Данные формы введены неверно.", error });
		}

		// Storing author input in db
		let createdAuthor = null;
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(author.password, salt);

			createdAuthor = new Author({
				...author,
				password: hashedPassword,
			});
			await createdAuthor.save();
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "Не удалось сохранить данные в БД.",
				error,
			});
		}

		try {
			const { id, email } = createdAuthor;
			await sendVerificationEmail(id, email);
			res.json({
				success: true,
				message: `Сообщение о подтверждении было отправлено на электронную почту: ${email}`,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "Не удалось отправить письмо с подтверждением.",
				error,
			});
		}
	} catch (error) {
		return res.status(500).json({ success: false, error, message: "Ошибка сервера." });
	}
};

exports.registerMod = async (req, res) => {
	try {
		// Validating mod input
		let mod = null;
		try {
			mod = modRegistrationSchema.parse(req.body);
		} catch (error) {
			return res
				.status(400)
				.json({ success: false, message: "Данные формы введены неверно.", error });
		}

		// Storing mod input in db
		let createdMod = null;
		try {
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(mod.password, salt);

			createdMod = new Mod({
				...mod,
				password: hashedPassword,
				role: "mod",
			});

			await createdMod.save();
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: "Не удалось сохранить данные в БД.", error });
		}

		try {
			const { id, email } = createdMod;
			await sendVerificationEmail(id, email);
			res.json({
				success: true,
				message: `Сообщение о подтверждении было отправлено на электронную почту: ${email}`,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: "Не удалось отправить письмо с подтверждением.",
				error,
			});
		}
	} catch (error) {
		return res.status(500).json({ success: false, message: "Ошибка сервера.", error });
	}
};

exports.verifyByEmail = async (req, res) => {
	try {
		const verificationToken = req.query.token;
		const user = jwt.verify(verificationToken, process.env.SECRET);

		const verifiedUser = await User.findByIdAndUpdate(
			user.id,
			{ verifiedByEmail: true },
			{ new: true }
		);
		res.render("emailVerified", { name: verifiedUser.firstName, email: verifiedUser.email });
	} catch (error) {
		res.json({
			success: false,
			message: "Ошибка при обновлении пользователя в БД.",
			error,
		});
	}
};

exports.verifyByAdmin = async (req, res) => {
	try {
		const id = req.params.id;

		const verifiedMod = await Mod.findByIdAndUpdate(
			id,
			{ verifiedByAdmin: true },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Мод успешно проверен администратором`,
			data: verifiedMod,
		});
	} catch (error) {
		res.json({
			success: false,
			message: "Ошибка при обновлении пользователя в БД.",
			error,
		});
	}
};

exports.loginUser = async (req, res) => {
	try {
		// Validating user input
		const { email, password } = req.body;

		if (email.trim() === "" || password.trim() === "") {
			return res.status(400).json({
				success: false,
				message: "Все поля должны быть заполнены.",
			});
		}

		const user = req.body;

		// Check if the user exists in the database
		const existingUser = await User.findOne({ email: user.email });

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "Пользователь не найден. Пожалуйста, сначала зарегистрируйтесь.",
			});
		}

		if (!existingUser.verifiedByEmail) {
			return res.status(400).json({
				success: false,
				message: "Электронная почта не подтверждена.",
			});
		}

		if (existingUser.role === "mod") {
			if (!existingUser.verifiedByAdmin) {
				return res.status(409).json({
					success: false,
					message: "Модератор не проверен администратором.",
				});
			}
		}

		// Compare the provided password with the hashed password stored in the database
		const passwordMatch = await bcrypt.compare(user.password, existingUser.password);

		if (!passwordMatch) {
			return res.status(400).json({
				success: false,
				message: "Неверный пароль.",
			});
		}

		// Generate JWT token
		const token = jwt.sign(
			{
				...existingUser,
				id: existingUser._id,
			},
			process.env.SECRET,
			{
				expiresIn: "1d",
			}
		);

		res.json({
			success: true,
			token,
			role: existingUser.role,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Ошибка сервера.",
		});
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.json({
			success: true,
			data: users,
		});
	} catch (error) {
		res.json({ success: false, message: "Ошибка сервера.", error });
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.json({
			success: true,
			data: users,
		});
	} catch (error) {
		res.json({ success: false, message: "Ошибка сервера.", error });
	}
};

exports.getAllMods = async (req, res) => {
	try {
		const users = await User.find({ role: "mod" });

		res.json({
			success: true,
			message: "Все моды успешно загружены.",
			data: users,
		});
	} catch (error) {
		res.json({ success: false, message: "Ошибка сервера.", error });
	}
};

exports.getAllAuthors = async (req, res) => {
	try {
		const users = await User.find({ role: "author" });

		res.json({
			success: true,
			message: "Все авторы успешно загружены",
			data: users,
		});
	} catch (error) {
		res.json({ success: false, message: "Ошибка сервера.", error });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await User.deleteOne({ _id: id });

		res.json({
			success: true,
			message: "Пользователь успешно удален",
			data: result,
		});
	} catch (error) {
		res.json({ success: false, message: "Ошибка сервера.", error });
	}
};

exports.deleteAllUsers = async (req, res) => {
	try {
		const result = await User.deleteMany();

		res.json({
			success: true,
			message: "Все пользователи успешно удалены.",
			data: result,
		});
	} catch (error) {
		res.json({ success: false, message: "Ошибка сервера.", error });
	}
};
