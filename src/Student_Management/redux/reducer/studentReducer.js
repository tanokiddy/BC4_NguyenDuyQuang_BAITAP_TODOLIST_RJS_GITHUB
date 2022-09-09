import {
  add_student,
  delete_student,
  edit_student,
  update_student,
} from "../actions/types/ActionTypes";

const initialState = {
  studentList: [
    {
      studentCode: "1",
      phoneNumber: "0981234561",
      fullName: "Nguyen Van A",
      email: "nguyenvanA@gmail.com",
    },
    {
      studentCode: "2",
      phoneNumber: "0981222261",
      fullName: "Nguyen Van B",
      email: "nguyenvanB@gmail.com",
    },
    {
      studentCode: "3",
      phoneNumber: "091723123",
      fullName: "Nguyen Van C",
      email: "nguyenvanC@gmail.com",
    },
  ],
  studentEdit: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case add_student: {
      let cloneStudentList = [...state.studentList];
      let { studentCode, phoneNumber, fullName, email } = action.newStudent;
      cloneStudentList = [...cloneStudentList, action.newStudent];
      return { ...state, studentList: cloneStudentList };
    }
    case delete_student: {
      return {
        ...state,
        studentList: state.studentList.filter(
          (student) => student.studentCode !== action.studentId
        ),
      };
    }
    case edit_student: {
      return { ...state, studentEdit: action.student };
    }
    case update_student: {
      let cloneStudentList = [...state.studentList];
      let index = cloneStudentList.findIndex((student) => {
        return student.studentCode == action.newStudent.studentCode;
      });
      if (index !== -1) {
        cloneStudentList[index] = action.newStudent;
        cloneStudentList = [...cloneStudentList];
      } else {
        cloneStudentList = [...cloneStudentList, action.newStudent];
      }
      return { ...state, studentList: cloneStudentList };
    }
    default:
      return { ...state };
  }
};
