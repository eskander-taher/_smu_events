const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtensionLimiter = require("../middleware/fileExtensionLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");

// Create a new submission
router.post(
	"/submissions",
	fileUpload({ createParentPath: true }),
	filesPayloadExists,
	fileExtensionLimiter([".doc", ".docx"]),
	fileSizeLimiter,
	submissionController.createSubmission
);

//  Getting submissions by event and mod
router.get(
	"/submissions/event/:eventId/mod/:modId",
	submissionController.getSubmissionsByEventAndMod
);

// Update an existing submission by ID
router.put("/submissions/:id", submissionController.updateSubmissionById);

// Get all submissions
router.get("/submissions", submissionController.getAllSubmissions);

// Get accepted sumission
router.get("/submissions/accepted", submissionController.getAcceptedSubmissions);

// Get a specific submission by ID
router.get("/submissions/:id", submissionController.getSubmissionById);

// Delete a submission by ID
router.delete("/submissions/:id", submissionController.deleteSubmissionById);

// Getting submissions by section
router.get("/submissions/section/:sectionId", submissionController.getSubmissionsBySection);

//  Getting submissions by author
router.get("/submissions/author/:authorId", submissionController.getSubmissionsByAuthor);

//  Getting submissions by author
router.get("/submissions/event/:eventId", submissionController.getSubmissionsByEvent);

//  Getting submissions by mod
router.get("/submissions/mod/:modId", submissionController.getSubmissionsByMod);

//  Grade sumission
router.put("/submissions/grade/:id", submissionController.gradeSubmissionById);

// group submissions by section
router.get("/submissions/grouped/sections", submissionController.getAllSubmissionsGroupedBySection);

// get winners of an event
router.get("/submissions/results/:eventId", submissionController.getResultsByEvent);
// get winners of an event
router.get("/submissions/download/:filename", submissionController.downloadSubmissionFile);


module.exports = router;
