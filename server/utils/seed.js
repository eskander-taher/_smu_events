// seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { moderators, authors } = require("./mockData");
const Mod = require("../models/modModel");
const Author = require("../models/authorModel");
const User = require("../models/userModel");

const HASHED_PASSWORD = "$2b$10$1TbWRpFKKoLdGPY33LCKKeN7EJm6V.2Zdzy1lvciydDJs5xtAClSe"

// Connect to MongoDB
mongoose.connect(
	"mongodb+srv://eskandertaher:wyDfmmc6eerTU81O@cluster0.fk9njl5.mongodb.net/uust_smu"
);

const addPasswordToUsers = async (users) => {
	return users.map((user) => ({ ...user, password: HASHED_PASSWORD }));
};

const addFullNameToUsers = (users) => {
	return users.map((user) => ({
		...user,
		fullName: `${user.lastName} ${user.firstName} ${user.middleName}`,
	}));
};

const adminData = {
	email: "admin@gmail.com",
	password: HASHED_PASSWORD,
	phoneNumber: "89500335200",
	verifiedByEmail: true,
	role: "админ",
	firstName: "Ескандер",
	lastName: "Аль-Шаибани",
	middleName: "Тахер",
	dateOfBirth: "18.05.1997",
};

const seedDatabase = async () => {
	try {
		// Clear existing data
		await Mod.deleteMany({});
		await Author.deleteMany({});
		await User.deleteMany({});

		// Add password to all users
		const moderatorsWithPassword = await addPasswordToUsers(moderators);
		const authorsWithPassword = await addPasswordToUsers(authors);

		const moderatorsWithFullName = addFullNameToUsers(moderatorsWithPassword);
		const authorsWithFullName = addFullNameToUsers(authorsWithPassword);

		// Insert new data
		const admin = await User.create(adminData);
		await admin.save();
		await Mod.insertMany(moderatorsWithFullName);
		await Author.insertMany(authorsWithFullName);

		console.log("Database seeded successfully");
		mongoose.connection.close();
	} catch (error) {
		console.error("Error seeding database:", error);
		mongoose.connection.close();
	}
};

seedDatabase();
