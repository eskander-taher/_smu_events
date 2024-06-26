const mongoose = require("mongoose");
const Submission = require("../models/submissionModel");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

exports.createSubmission = async (req, res) => {
	const data = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Check for file upload
		let uniqueFilename = "";
		if (req.files && req.files.file) {
			const file = req.files.file;
			uniqueFilename = `${uuidv4()}-${file.name}`;
			const filepath = path.join(__dirname, "..", "uploads", uniqueFilename);

			await file.mv(filepath, (err) => {
				if (err) {
					throw new Error("Загрузка файла не удалась");
				}
			});
		}

		const submission = new Submission({
			workName: data.workName,
			withPublication: data.withPublication,
			supervisorName: data.supervisorName,
			supervisorAcademicDegree: data.supervisorAcademicDegree,
			author: data.author,
			coauthors: data.coauthors || [],
			event: data.event,
			section: data.section,
			comments: data.comments || [],
			file: uniqueFilename,
			status: data.status || "ожидание",
			grade: data.grade,
			grader: data.grader,
			processingAgreed: data.processingAgreed,
		});

		const savedSubmission = await submission.save({ session });

		await session.commitTransaction();
		res.json({
			success: true,
			message: "Успешное создание Заявки",
			data: savedSubmission,
		});
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при создании Заявки.",
			error: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.updateSubmissionById = async (req, res) => {
	const submissionId = req.params.id;
	const data = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const submission = await Submission.findById(submissionId).session(session);

		if (!submission) {
			await session.abortTransaction();
			return res.status(404).json({
				success: false,
				message: "Заявка не найдена.",
				error: "Submission not found.",
			});
		}

		// Check for file upload
		if (req.files && req.files.file) {
			const file = req.files.file;
			const uniqueFilename = `${uuidv4()}-${file.name}`;
			const filepath = path.join(__dirname, "..", "uploads", uniqueFilename);

			await file.mv(filepath, (err) => {
				if (err) {
					throw new Error("Загрузка файла не удалась");
				}
			});

			// Update file path in submission
			submission.file = uniqueFilename;
		}

		submission.workName = data.workName || submission.workName;
		submission.withPublication =
			data.withPublication !== undefined ? data.withPublication : submission.withPublication;
		submission.supervisorName = data.supervisorName || submission.supervisorName;
		submission.supervisorAcademicDegree =
			data.supervisorAcademicDegree || submission.supervisorAcademicDegree;
		submission.author = data.author || submission.author;
		submission.coauthors = data.coauthors || submission.coauthors;
		submission.event = data.event || submission.event;
		submission.section = data.section || submission.section;
		submission.comments = data.comments || submission.comments;
		submission.status = data.status || submission.status;
		submission.grade = data.grade !== undefined ? data.grade : submission.grade;
		submission.grader = data.grader || submission.grader;

		const savedSubmission = await submission.save({ session });

		await session.commitTransaction();
		res.json({
			success: true,
			message: "Успешное обновление Заявки",
			data: savedSubmission,
		});
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при обновлении Заявки.",
			error: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.getAllSubmissions = async (req, res) => {
	try {
		const submissions = await Submission.find()
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();
		res.status(200).json({
			success: true,
			message: "Все Заявки успешно получены",
			data: submissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении всех Заявки",
			error: error.message,
		});
	}
};

exports.getSubmissionById = async (req, res) => {
	try {
		const submission = await Submission.findById(req.params.id)
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();
		if (!submission) {
			return res.status(404).json({
				success: false,
				message: "Заявка не найдена",
				error: "Submission not found",
			});
		}
		res.status(200).json({
			success: true,
			message: "Заявка успешно получена",
			data: submission,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Заявки",
			error: error.message,
		});
	}
};

exports.getSubmissionsBySection = async (req, res) => {
	const sectionId = req.params.sectionId;

	try {
		const submissions = await Submission.find({ section: sectionId })
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();

		if (!submissions) {
			return res.status(404).json({
				success: false,
				message: "Заявки для этого раздела не найдены",
				error: "No submissions found for this section",
			});
		}

		res.status(200).json({
			success: true,
			message: "Заявки по разделу успешно получены",
			data: submissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Заявки по разделу",
			error: error.message,
		});
	}
};

exports.getSubmissionsByAuthor = async (req, res) => {
	const authorId = req.params.authorId;

	try {
		const submissions = await Submission.find({ author: authorId })
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();

		if (!submissions) {
			return res.status(404).json({
				success: false,
				message: "Заявки для этого автора не найдены",
				error: "No submissions found for this author",
			});
		}

		res.status(200).json({
			success: true,
			message: "Заявки по автору успешно получены",
			data: submissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Заявки по автору",
			error: error.message,
		});
	}
};

exports.gradeSubmissionById = async (req, res) => {
	const submissionId = req.params.id;
	let { grade, status, comment, mod } = req.body;

	if (grade) {
		grade = parseInt(grade);
	}

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const submission = await Submission.findById(submissionId).session(session);

		if (!submission) {
			await session.abortTransaction();
			return res.status(404).json({
				success: false,
				message: "Заявка не найдена.",
				error: "Submission not found.",
			});
		}

		// Update the grade and status
		submission.grade = grade !== undefined ? parseInt(grade) : submission.grade;
		submission.status = status || submission.status;
		submission.grader = mod || submission.grader;

		// Add a new comment if provided
		if (comment) {
			submission.comments.push({
				comment,
				mod,
			});
		}

		const savedSubmission = await submission.save({ session });

		await session.commitTransaction();
		res.status(200).json({
			success: true,
			message: "Оценка Заявки успешно обновлена",
			data: savedSubmission,
		});
	} catch (error) {
		await session.abortTransaction();
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при оценке Заявки.",
			error: error.message,
		});
	} finally {
		session.endSession();
	}
};

exports.getAcceptedSubmissions = async (req, res) => {
	try {
		const submissions = await Submission.find({ status: "принято" })
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();

		if (!submissions || submissions.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Принятые Заявки не найдены",
				error: "No accepted submissions found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Принятые Заявки успешно получены",
			data: submissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении принятых Заявки",
			error: error.message,
		});
	}
};

exports.getSubmissionsByMod = async (req, res) => {
	const modId = req.params.modId;

	try {
		// Fetch sections where the mod matches the provided modId
		const sections = await mongoose.model("Section").find({ mod: modId }).exec();

		if (!sections || sections.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Разделы для этого модератора не найдены",
				error: "No sections found for this moderator",
			});
		}

		const sectionIds = sections.map((section) => section._id);

		// Find submissions for the fetched sections
		const submissions = await Submission.find({ section: { $in: sectionIds } })
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();

		if (!submissions) {
			return res.status(404).json({
				success: false,
				message: "Заявки для этого модератора не найдены",
				error: "No submissions found for this moderator",
			});
		}

		res.status(200).json({
			success: true,
			message: "Заявки по модератору успешно получены",
			data: submissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Заявки по модератору",
			error: error.message,
		});
	}
};

exports.getAllSubmissionsGroupedBySection = async (req, res) => {
	try {
		// Fetch all submissions
		const submissions = await Submission.find()
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "moderator" },
			})
			.populate("grader")
			.exec();

		// Group submissions by section
		const groupedBySection = submissions.reduce((acc, submission) => {
			const section = submission.section;

			// Find if the section already exists in the accumulator
			const sectionGroup = acc.find((group) => group.section._id.equals(section._id));

			if (sectionGroup) {
				// If the section group exists, add the submission to it
				sectionGroup.submissions.push(submission);
			} else {
				// If the section group does not exist, create a new one
				acc.push({
					section: section,
					submissions: [submission],
				});
			}

			return acc;
		}, []);

		res.status(200).json({
			success: true,
			message: "Заявки, сгруппированные по разделу, успешно получены",
			data: groupedBySection,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при группировке Заявки по разделам",
			error: error.message,
		});
	}
};

exports.deleteSubmissionById = async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const submission = await Submission.findById(req.params.id).exec();
		if (!submission) {
			await session.abortTransaction();
			session.endSession();
			return res.status(404).json({
				success: false,
				message: "Заявка не найдена",
				error: "Submission not found",
			});
		}

		await submission.remove({ session });

		await session.commitTransaction();
		session.endSession();

		res.status(200).json({
			success: true,
			message: "Заявка успешно удалена",
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при удалении Заявки",
			error: error.message,
		});
	}
};

exports.getResultsByEvent = async (req, res) => {
	const eventId = req.params.eventId;

	try {
		// Fetch all accepted submissions for the specified event
		const submissions = await Submission.find({ status: "принято", event: eventId })
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();

		// Group submissions by section
		const groupedBySection = submissions.reduce((acc, submission) => {
			const section = submission.section;

			// Find if the section already exists in the accumulator
			const sectionGroup = acc.find((group) => group.section._id.equals(section._id));

			if (sectionGroup) {
				// If the section group exists, add the submission to it
				sectionGroup.submissions.push(submission);
			} else {
				// If the section group does not exist, create a new one
				acc.push({
					section: section,
					submissions: [submission],
				});
			}

			return acc;
		}, []);

		// Determine winners for each section
		const results = groupedBySection.map((group) => {
			// Sort submissions by grade in descending order
			const sortedSubmissions = group.submissions.sort((a, b) => b.grade - a.grade);

			// Determine the winners
			let winners = { first: [], second: [], third: [] };
			let currentRank = 1;

			sortedSubmissions.forEach((submission, index) => {
				if (index === 0) {
					winners.first.push(submission);
				} else {
					const previousSubmission = sortedSubmissions[index - 1];
					if (submission.grade === previousSubmission.grade) {
						if (currentRank === 1) {
							winners.first.push(submission);
						} else if (currentRank === 2) {
							winners.second.push(submission);
						} else {
							winners.third.push(submission);
						}
					} else {
						if (winners.second.length === 0) {
							currentRank = 2;
							winners.second.push(submission);
						} else if (winners.third.length === 0) {
							currentRank = 3;
							winners.third.push(submission);
						} else {
							return;
						}
					}
				}
			});

			return {
				section: group.section,
				winners: winners,
			};
		});

		res.status(200).json({
			success: true,
			message: "Результаты мероприятия успешно получены",
			data: results,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении результатов мероприятия",
			error: error.message,
		});
	}
};

exports.downloadSubmissionFile = async (req, res) => {
	const filename = req.params.filename;
	const filepath = path.join(__dirname, "..", "uploads", filename);
	console.log(filepath);
	res.download(filepath);
};

exports.getSubmissionsByEvent = async (req, res) => {
	const eventId = req.params.eventId;

	try {
		const submissions = await Submission.find({ event: eventId })
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();

		if (!submissions) {
			return res.status(404).json({
				success: false,
				message: "Заявки  не найдены",
				error: "No submissions found ",
			});
		}

		res.status(200).json({
			success: true,
			message: "Заявки успешно получены",
			data: submissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Заявки",
			error: error.message,
		});
	}
};

exports.getSubmissionsByEventAndMod = async (req, res) => {
	const { eventId, modId } = req.params;

	try {
		// Fetch sections where the mod matches the provided modId
		const sections = await mongoose.model("Section").find({ mod: modId }).exec();

		if (!sections) {
			return res.status(404).json({
				success: false,
				message: "Разделы для этого модератора не найдены",
				error: "No sections found for this moderator",
			});
		}

		const sectionIds = sections.map((section) => section._id);

		// Find submissions for the specified event and fetched sections
		const submissions = await Submission.find({ event: eventId, section: { $in: sectionIds } })
			.populate("author")
			.populate("event")
			.populate("section")
			.populate({
				path: "comments",
				populate: { path: "mod" },
			})
			.populate("grader")
			.exec();

		if (!submissions) {
			return res.status(404).json({
				success: false,
				message: "Заявки не найдены для указанного события и модератора",
				error: "No submissions found for the specified event and moderator",
			});
		}

		res.status(200).json({
			success: true,
			message: "Заявки успешно получены",
			data: submissions,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Произошла ошибка при получении Заявки",
			error: error.message,
		});
	}
};
