const Project = require("../models/project");

module.exports.home = function (req, res) {
  return res.render("home", { title: "Welcome To App" });
};

module.exports.create = function (req, res) {
  return res.render("createProject", { title: "Create Project" });
};

module.exports.addProjectToDom = function (req, res) {
  Project.create({
    projectName: req.body.projectName,
    description: req.body.description,
    authorName: req.body.authorName,
  });
  return res.redirect("/projectDetails");
};

module.exports.details = async function (req, res) {
  const projectDetails = await Project.find({});
  res.render("projectDetails", {
    title: "Project Details",
    projectDetails: projectDetails,
  });
};

module.exports.filterProjectDetails = async (req, res) => {
  let projectDetails = await Project.find({});
  const filterReq = req.body;

  if (filterReq.flexRadio === "Project Title") {
    const filteredProjectDetails = filterBy("Title", projectDetails);
    return res.render("projectDetails", {
      title: "Project Details",
      projectDetails: filteredProjectDetails,
    });
  } else if (filterReq.flexRadio === "Project Description") {
    const filteredProjectDetails = filterBy("Description", projectDetails);
    return res.render("projectDetails", {
      title: "Project Details",
      projectDetails: filteredProjectDetails,
    });
  } else if (filterReq.flexRadio === "Project Author") {
    const filteredProjectDetails = filterBy("Author", projectDetails);
    return res.render("projectDetails", {
      title: "Project Details",
      projectDetails: filteredProjectDetails,
    });
  }
};

function filterBy(filter, projectDetails) {
  switch (filter) {
    case "Title":
      for (let check = 0; check < projectDetails.length; ++check) {
        for (let index = 0; index < projectDetails.length - 1; ++index) {
          let temp = null;
          if (
            projectDetails[index].projectName >
            projectDetails[index + 1].projectName
          ) {
            temp = projectDetails[index];
            projectDetails[index] = projectDetails[index + 1];
            projectDetails[index + 1] = temp;
          }
        }
      }
      return projectDetails;

    case "Description":
      for (let check = 0; check < projectDetails.length; ++check) {
        for (let index = 0; index < projectDetails.length - 1; ++index) {
          let temp = null;
          if (
            projectDetails[index].description >
            projectDetails[index + 1].description
          ) {
            temp = projectDetails[index];
            projectDetails[index] = projectDetails[index + 1];
            projectDetails[index + 1] = temp;
          }
        }
      }
      return projectDetails;

    case "Author":
      for (let check = 0; check < projectDetails.length; ++check) {
        for (let index = 0; index < projectDetails.length - 1; ++index) {
          let temp = null;
          if (
            projectDetails[index].authorName >
            projectDetails[index + 1].authorName
          ) {
            temp = projectDetails[index];
            projectDetails[index] = projectDetails[index + 1];
            projectDetails[index + 1] = temp;
          }
        }
      }
      return projectDetails;

    default:
      break;
  }
}

module.exports.createAnIssue = function (req, res) {
  const issueId = req.params;
  res.render("createIssue", { title: "Create Issue", issueId });
};

module.exports.addAnIssue = async (req, res) => {
  const issue = req.body;
  console.log(issue);
  const bugId = req.params.id;
  // const collection = await mongoDB();
  await Project.findOneAndUpdate({ _id: bugId }, { $push: { bugs: issue } });

  res.redirect("/projectDetails");
};
