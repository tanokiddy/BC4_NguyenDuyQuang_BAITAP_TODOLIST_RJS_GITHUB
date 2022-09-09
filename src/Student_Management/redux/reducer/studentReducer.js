import {
  add_student,
  delete_student,
  edit_student,
  update_student,
} from "../actions/types/ActionTypes";
import { validator } from "../../Validation/Validator";

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
    //=========================ADD STUDENT=================
    case add_student: {
      let cloneStudentList = [...state.studentList];
      let { studentCode, phoneNumber, fullName, email } = action.newStudent;
      //check valid studentCode
      let isValid =
        validator.kiemTraRong(
          studentCode,
          "notiSC",
          "vui lòng không để trống"
        ) && validator.kiemTraSo(studentCode, "notiSC", "Vui lòng chỉ nhập số");
      //check valid phoneNumber
      isValid &=
        validator.kiemTraRong(
          phoneNumber,
          "notiPN",
          "vui lòng không để trống"
        ) && validator.kiemTraSo(phoneNumber, "notiPN", "Vui lòng chỉ nhập số");
      //check valid fullName
      isValid &=
        validator.kiemTraRong(fullName, "notiFN", "vui lòng không để trống") &&
        validator.kiemTraChu(
          fullName,
          "notiFN",
          "Vui lòng nhập đúng định dạng"
        );
      //checkvalid email
      isValid &=
        validator.kiemTraRong(email, "notiEM", "vui lòng không để trống") &&
        validator.kiemTraEmail(
          email,
          "notiEM",
          "vui lòng nhập đúng định dạng email"
        );
      if (isValid) {
        cloneStudentList = [...cloneStudentList, action.newStudent];
      }
      return { ...state, studentList: cloneStudentList };
    }
    //=========================DEL STUDENT=================
    case delete_student: {
      return {
        ...state,
        studentList: state.studentList.filter(
          (student) => student.studentCode !== action.studentId
        ),
      };
    }
    //=========================EDIT STUDENT================
    case edit_student: {
      document.querySelector("#addStudent").style.display = "none";
      document.querySelector("#updateStudent").style.display = "inline-block";
      return { ...state, studentEdit: action.student };
    }
    //=========================UPDATE STUDENT==============
    case update_student: {
      let cloneStudentList = [...state.studentList];
      let index = cloneStudentList.findIndex((student) => {
        return student.studentCode == action.newStudent.studentCode;
      });
      let { studentCode, phoneNumber, fullName, email } = action.newStudent;
      //check valid studentCode
      let isValid =
        validator.kiemTraRong(
          studentCode,
          "notiSC",
          "vui lòng không để trống"
        ) && validator.kiemTraSo(studentCode, "notiSC", "Vui lòng chỉ nhập số");
      //check valid phoneNumber
      isValid &=
        validator.kiemTraRong(
          phoneNumber,
          "notiPN",
          "vui lòng không để trống"
        ) && validator.kiemTraSo(phoneNumber, "notiPN", "Vui lòng chỉ nhập số");
      //check valid fullName
      isValid &=
        validator.kiemTraRong(fullName, "notiFN", "vui lòng không để trống") &&
        validator.kiemTraChu(
          fullName,
          "notiFN",
          "Vui lòng nhập đúng định dạng"
        );
      //checkvalid email
      isValid &=
        validator.kiemTraRong(email, "notiEM", "vui lòng không để trống") &&
        validator.kiemTraEmail(
          email,
          "notiEM",
          "vui lòng nhập đúng định dạng email"
        );
      if (isValid) {
        if (index !== -1) {
          cloneStudentList[index] = action.newStudent;
          cloneStudentList = [...cloneStudentList];
        } else {
          cloneStudentList = [...cloneStudentList, action.newStudent];
        }
      }
      document.querySelector("#updateStudent").style.display = "none";
      document.querySelector("#addStudent").style.display = "inline-block";
      return { ...state, studentList: cloneStudentList };
    }
    default:
      return { ...state };
  }
};
