const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			enum: ["draft", "upcoming", "ongoing", "finished"],
			default: "draft",
		},
		sections: [
			{
				type: Schema.Types.ObjectId,
				ref: "Section",
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
		collection: "events",
	}
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
