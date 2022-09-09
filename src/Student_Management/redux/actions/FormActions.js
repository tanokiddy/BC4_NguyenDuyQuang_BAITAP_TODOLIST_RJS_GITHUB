import {
  add_student,
  delete_student,
  edit_student,
  update_student,
} from "./types/ActionTypes";

export const addStudentAction = (newStudent) => ({
  type: add_student,
  newStudent,
});

export const deleteStudentAction = (studentId) => ({
  type: delete_student,
  studentId,
});

export const editStudentAction = (student) => ({
  type: edit_student,
  student,
});

export const updateStudentAction = (newStudent) => ({
  type: update_student,
  newStudent,
});
