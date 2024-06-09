const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		order: {
			type: Number,
			required: true,
		},
		mod: {
			type: Schema.Types.ObjectId,
			ref: "Mod",
			required: true,
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: "Event",
		},
	},
	{
		timestamps: true,
		collection: "sections",
	}
);

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
