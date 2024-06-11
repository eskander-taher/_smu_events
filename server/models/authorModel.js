const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./userModel');

const authorSchema = new Schema({
	authorStatus: {
		type: String,
		enum: ["Молодой ученый", "Специалитет", "Бакалавриат", "Магистрант", "Аспирант"],
		trim: true,
		required: true,
	},
	region: {
		type: String,
		trim: true,
		required: true,
	},
	city: {
		type: String,
		trim: true,
		required: true,
	},
	university: {
		type: String,
		trim: true,
		required: true,
	},
	faculty: {
		type: String,
		trim: true,
		required: true,
	},
	department: {
		type: String,
		trim: true,
		required: true,
	},
	course: {
		type: Number,
		trim: true,
		required: true,
	},
	groupNumber: {
		type: String,
		trim: true,
		required: true,
	},
	submissions: [
		{
			type: Schema.Types.ObjectId,
			ref: "Submission",
		},
	],
});

const Author = User.discriminator('Author', authorSchema);

module.exports = Author;
