const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true, ref: "ProjectName" },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: [{ type: String, required: true, ref: "Description" }],
    authorName: [{ type: String, required: true, ref: "Author" }],
    bugs: [
      {
        // Define the structure of each bug/issue object
        // For example, you can have fields like title, description, status, etc.
        issueName: String,
        issueDescription: String,
        authorName: String,
        // Add more fields as needed
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
