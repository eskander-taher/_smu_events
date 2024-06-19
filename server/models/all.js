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
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./userModel');

const modSchema = new Schema({
    faculty: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        enum: ["Ассистент", "Старший преподаватель", "Доцент", "Профессор", "Заведующий кафедрой"],
        trim: true,
        required: true,
    },
    verifiedByAdmin: {
        type: Boolean,
        default: false,
    },
});

const Mod = User.discriminator('Mod', modSchema);

module.exports = Mod;
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
			enum: ["черновик", "предстоящий", "идет", "проверка статей", "завершен"],
			default: "черновик",
		},
		sections: [
			{
				type: Schema.Types.ObjectId,
				ref: "Section",
			},
		],
		submissions: [
			{
				type: Schema.Types.ObjectId,
				ref: "Submission",
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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "news",
    }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
 