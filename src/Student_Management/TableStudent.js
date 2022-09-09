import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteStudentAction,
  editStudentAction,
} from "./redux/actions/FormActions";

class TableStudent extends Component {
  renderTbody = () => {
    return this.props.studentList.map((student) => {
      let { studentCode, phoneNumber, fullName, email } = student;
      return (
        <tr>
          <td>{studentCode}</td>
          <td>{fullName}</td>
          <td>{phoneNumber}</td>
          <td>{email}</td>
          <td>
            <i
              onClick={() => {
                this.props.dispatch(editStudentAction(student));
              }}
              type="button"
              className="fa fa-edit fa-lg"
            ></i>
            <i
              onClick={() => {
                this.props.dispatch(deleteStudentAction(studentCode));
              }}
              type="button"
              className="fa fa-trash fa-lg ml-3"
            ></i>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã SV</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>{this.renderTbody()}</tbody>
        </table>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
    // studentEdit: state.studentReducer.studentEdit,
  };
};

export default connect(mapStateToProps)(TableStudent);
