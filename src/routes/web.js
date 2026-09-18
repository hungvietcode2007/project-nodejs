const {
  getDashboard,
  getClassesPage,
  toggleClassesStatus,
  getClassesEditPage,
  editClassesInfo,
  getClassesCreatePage,
  addNewClasses,
  getStudentsPage,
  getStudentsEditPage,
  editStudentsInfo,
  addNewStudents,
  getStudentsCreatePage,
  searchStudents,
  searchClasses,
  getClassDetails,
  addStudentsToClassPage,
  addStudentsToClass,
  deleteStudentsFromClass,
  getAttendancePage,
  getAAttendance,
  getAttendancesOfClass,
  createNewAttendancePage,
  createNewAttendance,
  getStudentDetails,
  deleteClassesFromStudent,
  addClassesOfStudentPage,
  addClassesOfStudent,
  getScoresPage,
  createNewScorePage,
  createNewScore,
  getAScore,
} = require("../controllers/homeController");
const path = require("path");
const express = require("express");
const router = express.Router();
router.get("/", getDashboard);
router.get("/classes", getClassesPage);
router.post("/toggleClassesStatus/:id", toggleClassesStatus);
router.get("/classes/:id/edit", getClassesEditPage);
router.post("/classes/:id/edit", editClassesInfo);
router.get("/classes/create", getClassesCreatePage);
router.post("/classes/create", addNewClasses);
router.get("/students", getStudentsPage);
router.get("/students/:id/edit", getStudentsEditPage);
router.post("/students/:id/edit", editStudentsInfo);
router.get("/students/create", getStudentsCreatePage);
router.post("/students/create", addNewStudents);
router.get("/students/search", searchStudents);
router.get("/classes/search", searchClasses);
router.get("/classes/:id", getClassDetails);
router.get("/classes/:id/add", addStudentsToClassPage);
router.post("/classes/:id/add", addStudentsToClass);
router.post("/classes/:classID/delete/:studentID", deleteStudentsFromClass);
router.get("/attendance", getAttendancePage);
router.get("/attendance/:id", getAAttendance);
router.get("/classes/:id/attendance", getAttendancesOfClass);
router.get("/classes/:id/attendance/create", createNewAttendancePage);
router.post("/classes/:id/attendance/create", createNewAttendance);
router.get("/students/:id", getStudentDetails);
router.post("/students/:student_id/delete/:class_id", deleteClassesFromStudent);
router.get("/students/:id/add", addClassesOfStudentPage);
router.post("/students/:id/add", addClassesOfStudent);
router.get("/scores", getScoresPage);
router.get("/scores/:session_id/create", createNewScorePage);
router.post("/scores/:session_id/create", createNewScore);
router.get("/scores/:session_id/:title", getAScore);
module.exports = router;
