const btn = document.querySelector("#userAvatar");
const menu = document.querySelector("#profile-menu");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  menu.classList.toggle("hidden");
});
document.addEventListener("click", (e) => {
  if (!btn.contains(e.target)) {
    menu.classList.add("hidden");
  }
});
const deleteButtons = document.querySelectorAll(".btn-delete");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.querySelector("#delete-form");
const btnCancel = document.querySelector("#btn-cancel");
const question = document.querySelector("#question");

if (deleteButtons && deleteModal && deleteForm && question) {
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const studentName = btn.getAttribute("data-student-name");
      const studentID = btn.getAttribute("data-student-id");
      const classID = btn.getAttribute("data-class-id");
      deleteForm.action = `/classes/${classID}/delete/${studentID}`;
      question.innerHTML = `Bạn có chắc chắn muốn xóa học viên ${studentName} không?`;
      deleteModal.classList.remove("hidden");
      deleteModal.classList.add("flex");
    });
  });
}

if (btnCancel) {
  btnCancel.addEventListener("click", () => {
    deleteModal.classList.remove("flex");
    deleteModal.classList.add("hidden");
  });
}

const addAAtendanceBtn = document.querySelector("#addAAttendance");
const classesList = document.querySelector("#classesList");
if (addAAtendanceBtn) {
  addAAtendanceBtn.addEventListener("click", (e) => {
    classesList.classList.remove("hidden");
    classesList.classList.add("flex");
    e.stopPropagation();
  });
}
const dropdownMenu = document.querySelectorAll(".dropdown-menu");
if (dropdownMenu) {
  document.addEventListener("click", (e) => {
    dropdownMenu.forEach((element) => {
      if (!element.contains(e.target)) {
        if (!element.classList.contains("hidden")) {
          element.classList.add("hidden");
        }
      }
    });
  });
}
