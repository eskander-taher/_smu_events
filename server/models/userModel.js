const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		phoneNumber: {
			type: String,
			trim: true,
		},
		verifiedByEmail: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ["автор", "админ", "модератор"],
			default: "автор",
		},
		firstName: {
			type: String,
			trim: true,
			required: true,
		},
		lastName: {
			type: String,
			trim: true,
			required: true,
		},
		middleName: {
			type: String,
			trim: true,
		},
		dateOfBirth: {
			type: String,
		},
		fullName: {
			type: String,
			trim: true,
		},
		bio: {
			type: String,
			trim: true,
			default: "биография",
		},
		xp: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		discriminatorKey: "userType",
		collection: "users",
	}
);

// Pre-save hook to populate fullName field
userSchema.pre("save", function (next) {
	if (this.middleName) {
		this.fullName = `${this.lastName} ${this.firstName} ${this.middleName}`;
	} else {
		this.fullName = `${this.lastName} ${this.firstName}`;
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
