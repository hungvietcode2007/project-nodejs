const connection = require("../config/database");
const {
  deleteStudentsFromClass,
  getAAttendance,
} = require("../controllers/homeController");
const { search } = require("../routes/web");
const getAllClasses = async () => {
  const [results] = await connection.query(`SELECT * FROM Classes`);
  return results;
};
const countClasses = async () => {
  const [results] = await connection.query("SELECT COUNT(*) FROM Classes");
  return results;
};
const toggleClassStatus = async (id) => {
  const [status] = await connection.query(
    `SELECT status FROM Classes WHERE id=?`,
    [id],
  );
  if (status[0].status === "active") {
    await connection.query(
      `UPDATE Classes
SET status= "inactive"
WHERE id = ?`,
      [id],
    );
    return;
  }
  await connection.query(
    `UPDATE Classes
SET status= "active"
WHERE id = ?`,
    [id],
  );
};
const getClassByID = async (id) => {
  const [results] = await connection.query(`SELECT * FROM Classes WHERE id=?`, [
    id,
  ]);
  return results;
};
const editClassInfo = async (
  code,
  name,
  subject,
  teacher_name,
  start_date,
  description,
  id,
) => {
  await connection.query(
    `UPDATE Classes
        SET  code=?,
            name=?,
            subject=?,
            teacher_name=?,
            start_date=?,
            description=? 
        WHERE id=?`,
    [code, name, subject, teacher_name, start_date, description, id],
  );
};
const createAClass = async (
  code,
  name,
  subject,
  teacher_name,
  start_date,
  description,
  status,
) => {
  await connection.query(
    `INSERT INTO Classes(code,name,subject,teacher_name,start_date,description,status)
    VALUES (?,?,?,?,?,?,?)`,
    [code, name, subject, teacher_name, start_date, description, status],
  );
};
const getAllStudents = async () => {
  const [results] = await connection.query(`SELECT * FROM Students`);
  return results;
};
const getStudentByID = async (id) => {
  const [results] = await connection.query(
    `SELECT * FROM Students WHERE id=?`,
    [id],
  );
  return results;
};
const editStudentInfo = async (
  code,
  full_name,
  date_of_birth,
  gender,
  email,
  phone,
  note,
  id,
) => {
  await connection.query(
    `UPDATE Students
        SET  code=?,
            full_name=?,
            date_of_birth=?,
            gender=?,
            email=?,
            phone=?,
            note=?
        WHERE id=?`,
    [code, full_name, date_of_birth, gender, email, phone, note, id],
  );
};
const createAStudent = async (
  code,
  full_name,
  date_of_birth,
  gender,
  email,
  phone,
  note,
) => {
  await connection.query(
    `INSERT INTO Students(code,
  full_name,
  date_of_birth,
  gender,
  email,
  phone,
  note)
  VALUES(?,?,?,?,?,?,?)`,
    [code, full_name, date_of_birth, gender, email, phone, note],
  );
};
const countStudents = async () => {
  const [results] = await connection.query("SELECT COUNT(*) FROM Students");
  return results;
};
const searchStudent = async (keyword) => {
  const searchKeyword = `%${keyword}%`;
  const [results] = await connection.query(
    `SELECT * FROM Students 
    WHERE full_name LIKE ?
    OR code LIKE ?
    OR email LIKE ?
    OR date_of_birth LIKE ?
    OR phone LIKE ?
    OR note LIKE ?
    `,
    [
      searchKeyword,
      searchKeyword,
      searchKeyword,
      searchKeyword,
      searchKeyword,
      searchKeyword,
    ],
  );
  return results;
};
const searchClass = async (keyword) => {
  const searchKeyword = `%${keyword}%`;
  const [results] = await connection.query(
    `SELECT * FROM Classes
    WHERE name LIKE ?
    OR code LIKE ?
    OR subject LIKE ?
    OR teacher_name LIKE ?
    OR start_date LIKE ?
    OR description LIKE ?
    OR status LIKE ?
    `,
    [
      searchKeyword,
      searchKeyword,
      searchKeyword,
      searchKeyword,
      searchKeyword,
      searchKeyword,
      searchKeyword,
    ],
  );
  return results;
};
const getStudentsIDInClass = async (class_id) => {
  const results = await connection.query(
    `SELECT student_id FROM Classes_Students
    WHERE class_id=?`,
    [class_id],
  );
  return results;
};
const addStudentToClass = async (class_id, student_id) => {
  await connection.query(
    `INSERT INTO Classes_Students(class_id,student_id)
    VALUES (?,?)`,
    [class_id, student_id],
  );
};
const deleteStudentFromClass = async (class_id, student_id) => {
  connection.query(
    `DELETE FROM Classes_Students
    WHERE class_id=? AND student_id=?`,
    [class_id, student_id],
  );
};
const getAllAttendance = async () => {
  const [results] = await connection.query(`SELECT * FROM Sessions`);
  return results;
};
const attendanceInfo = async (id) => {
  const [results] = await connection.query(
    `SELECT * FROM Attendance WHERE session_id=?`,
    [id],
  );
  return results;
};
const getAttendanceByClassID = async (id) => {
  const [results] = await connection.query(
    `SELECT * FROM Sessions WHERE class_id=?`,
    [id],
  );
  return results;
};
const addANewAttendance = async (
  class_id,
  session_date,
  session_note,
  values,
) => {
  const [sessionResults] = await connection.query(
    `INSERT INTO Sessions(class_id,session_date,note)
    VALUES (?,?,?)`,
    [class_id, session_date, session_note],
  );
  const session_id = sessionResults.insertId;
  const finalValues = values.map((item) => [session_id, ...item]);
  await connection.query(
    `INSERT INTO Attendance(session_id,student_id,status,note)
    VALUES ?`,
    [finalValues],
  );
};
module.exports = {
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
};
