const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coauthorSchema = new Schema({
	fullName: {
		type: String,
		required: true,
		trim: true,
	},
	university: {
		type: String,
		required: true,
		trim: true,
	},
});

const submissionSchema = new Schema(
	{
		workName: {
			type: String,
			required: true,
			trim: true,
		},
		withPublication: {
			type: Boolean,
		},
		processingAgreed: {
			type: Boolean,
			required: true,
		},
		supervisorName: {
			type: String,
			required: true,
			trim: true,
		},
		supervisorAcademicDegree: {
			type: String,
			required: true,
			trim: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "Author",
			required: true,
		},
		coauthors: [coauthorSchema],
		event: {
			type: Schema.Types.ObjectId,
			ref: "Event",
			required: true,
		},
		section: {
			type: Schema.Types.ObjectId,
			ref: "Section",
			required: true,
		},
		comments: [
			{
				mod: {
					type: Schema.Types.ObjectId,
					ref: "Mod",
					required: true,
				},
				comment: {
					type: String,
					required: true,
					trim: true,
				},
			},
		],
		file: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["ожидание", "принято", "отклонено"],
			default: "ожидание",
		},
		grade: {
			type: Number,
			min: 0,
			max: 10,
		},
		grader: {
			type: Schema.Types.ObjectId,
			ref: "Mod",
		},
	},
	{
		timestamps: true,
		collection: "submissions",
	}
);

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
