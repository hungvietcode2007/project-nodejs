const connection = require("../config/database");
const {
  getAllClasses,
  countClasses,
  toggleClassStatus,
  getClassByID,
  editClassInfo,
  createAClass,
  getAllStudents,
  getStudentByID,
  editStudentInfo,
  createAStudent,
  countStudents,
  searchStudent,
  searchClass,
  getStudentsIDInClass,
  addStudentToClass,
  deleteStudentFromClass,
  getAllAttendance,
  attendanceInfo,
  getAttendanceByClassID,
  addANewAttendance,
} = require("../services/CRUDServices");
const getDashboard = async (req, res) => {
  const classesNumber = await countClasses();
  const studentsNumber = await countStudents();
  return res.render("dashboard", { classesNumber, studentsNumber });
};
const getClassesPage = async (req, res) => {
  const results = await getAllClasses();
  return res.render("classes", { classesList: results });
};
const toggleClassesStatus = async (req, res) => {
  const id = req.params.id;
  await toggleClassStatus(id);
  res.redirect("/classes");
};
const getClassesEditPage = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const results = await getClassByID(id);
  // console.log(results);
  const classInfo = results && results.length > 0 ? results[0] : {};
  res.render("editClass", { classInfo });
};
const editClassesInfo = async (req, res) => {
  const id = req.params.id;
  const code = req.body.code;
  const name = req.body.name;
  const subject = req.body.subject;
  const teacher_name = req.body.teacher_name;
  const start_date = req.body.start_date;
  const description = req.body.description;
  await editClassInfo(
    code,
    name,
    subject,
    teacher_name,
    start_date,
    description,
    id,
  );
  res.redirect("/classes");
};
const getClassesCreatePage = (req, res) => {
  res.render("createClass");
};
const addNewClasses = async (req, res) => {
  const code = req.body.code;
  const name = req.body.name;
  const subject = req.body.subject;
  const teacher_name = req.body.teacher_name;
  const start_date = req.body.start_date;
  const description = req.body.description;
  const status = req.body.status;
  await createAClass(
    code,
    name,
    subject,
    teacher_name,
    start_date,
    description,
    status,
  );
  res.redirect("/classes");
};
const getStudentsPage = async (req, res) => {
  const results = await getAllStudents();
  res.render("students", { studentsList: results });
};
const getStudentsEditPage = async (req, res) => {
  const id = req.params.id;
  const results = await getStudentByID(id);
  const studentInfo = results && results.length > 0 ? results[0] : {};
  res.render("editStudent", { studentInfo });
};
const editStudentsInfo = async (req, res) => {
  const code = req.body.code;
  const full_name = req.body.full_name;
  const date_of_birth = req.body.date_of_birth;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;
  const note = req.body.note;
  const id = req.params.id;
  await editStudentInfo(
    code,
    full_name,
    date_of_birth,
    gender,
    email,
    phone,
    note,
    id,
  );
  res.redirect("/students");
};
const getStudentsCreatePage = (req, res) => {
  res.render("createStudent");
};
const addNewStudents = async (req, res) => {
  const code = req.body.code;
  const full_name = req.body.full_name;
  const date_of_birth = req.body.date_of_birth;
  const gender = req.body.gender;
  const email = req.body.email;
  const phone = req.body.phone;
  const note = req.body.note;
  await createAStudent(
    code,
    full_name,
    date_of_birth,
    gender,
    email,
    phone,
    note,
  );
  res.redirect("/students");
};
const searchStudents = async (req, res) => {
  const keyword = req.query.keyword;
  const results = await searchStudent(keyword);
  res.render("studentsSearch", { studentsList: results, keyword });
};
const searchClasses = async (req, res) => {
  const keyword = req.query.keyword;
  const results = await searchClass(keyword);
  res.render("classesSearch", { classesList: results, keyword });
};
const getClassDetails = async (req, res) => {
  const class_id = req.params.id;
  const [class_name] = await connection.query(
    `SELECT name FROM Classes WHERE id=?`,
    [class_id],
  );
  const [ID] = await getStudentsIDInClass(class_id);
  const results = [];
  for (const student of ID) {
    const studentInfo = await getStudentByID(student.student_id);
    const studentData =
      studentInfo && studentInfo.length > 0 ? studentInfo[0] : {};
    results.push(studentData);
  }
  res.render("studentsInClass", {
    studentsList: results,
    class_name,
    class_id,
  });
};
const addStudentsToClassPage = async (req, res) => {
  const class_id = req.params.id;
  const [ID] = await getStudentsIDInClass(class_id);
  if (ID.length === 0) {
    const [results] = await connection.query(`SELECT * FROM Students`);
    res.render("addStudentsInClass", { studentsList: results, class_id });
  } else {
    const ID2 = [];
    for (const student of ID) {
      const id = student.student_id;
      ID2.push(id);
    }
    const [results] = await connection.query(
      `SELECT * FROM Students WHERE id NOT IN (?)`,
      [ID2],
    );
    res.render("addStudentsInClass", { studentsList: results, class_id });
  }
};
const addStudentsToClass = async (req, res) => {
  let student_id = req.body.studentID;
  const class_id = req.params.id;
  if (!student_id) {
    return res.redirect(`/classes/${class_id}`);
  }
  if (!Array.isArray(student_id)) {
    student_id = [student_id];
  }
  for (const id of student_id) {
    await addStudentToClass(class_id, id);
  }
  res.redirect(`/classes/${class_id}`);
};
const deleteStudentsFromClass = async (req, res) => {
  const student_id = req.params.studentID;
  const class_id = req.params.classID;
  await deleteStudentFromClass(class_id, student_id);
  res.redirect(`/classes/${class_id}`);
};
const getAttendancePage = async (req, res) => {
  const results = await getAllAttendance();
  for (const element of results) {
    const class_name = await getClassByID(element.class_id);
    element.class_name = class_name[0].name;
    element.class_code = class_name[0].code;
  }
  const results2 = await getAllClasses();
  // console.log(results);
  res.render("attendancePage", { List: results, classesList: results2 });
};
const getAAttendance = async (req, res) => {
  const id = req.params.id;
  const results = await attendanceInfo(id);
  const [results2] = await connection.query(
    `SELECT session_date FROM Sessions WHERE id=?`,
    [id],
  );
  for (const element of results) {
    const student_name = await getStudentByID(id);
    element.student_name = student_name[0].full_name;
    element.student_code = student_name[0].code;
    element.dob = student_name[0].date_of_birth;
  }
  res.render("attendance", { List: results, results2 });
};
const getAttendancesOfClass = async (req, res) => {
  const id = req.params.id;
  const results = await getAttendanceByClassID(id);
  for (const element of results) {
    const class_name = await getClassByID(element.class_id);
    element.class_name = class_name[0].name;
  }
  res.render("attendancesListOfClass", { List: results, id });
};
const createNewAttendancePage = async (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const date = `${day}/${month}/${year}`;
  const class_id = req.params.id;
  const [class_name] = await connection.query(
    `SELECT name FROM Classes WHERE id=?`,
    [class_id],
  );
  const [ID] = await getStudentsIDInClass(class_id);
  const results = [];
  for (const student of ID) {
    const studentInfo = await getStudentByID(student.student_id);
    const studentData =
      studentInfo && studentInfo.length > 0 ? studentInfo[0] : {};
    results.push(studentData);
  }
  res.render("createNewAttendance", {
    List: results,
    class_name,
    class_id,
    date,
  });
  console.log(class_id);
};

const createNewAttendance = async (req, res) => {
  const {
    class_id,
    session_date,
    session_note,
    student_id,
    status,
    student_note,
  } = req.body;
  if (!Array.isArray(student_id)) {
    student_id = [student_id];
    status = [status];
    student_note = [student_note];
  }
  const values = [];
  for (let i = 0; i < student_id.length; i++) {
    values.push([student_id[i], status[i], student_note[i] || ""]);
  }
  await addANewAttendance(class_id, session_date, session_note, values);
  res.send("hello");
};
module.exports = {
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
};
