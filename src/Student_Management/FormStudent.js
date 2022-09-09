import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addStudentAction,
  updateStudentAction,
} from "./redux/actions/FormActions";
class FormStudent extends Component {
  state = {
    studentCode: "",
    phoneNumber: "",
    fullName: "",
    email: "",
  };
  render() {
    return (
      <div>
        <h3 className="bg-dark text-white p-3">Thông tin sinh viên</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <span>Mã SV</span>
              <input
                value={this.state.studentCode}
                onChange={(e) => {
                  this.setState({
                    studentCode: e.target.value,
                  });
                }}
                type="text"
                className="form-control"
                placeholder="Ex: 2"
              />
              <span id="notiSC"></span>
            </div>
            <div className="form-group">
              <span>Số điện thoại</span>
              <input
                value={this.state.phoneNumber}
                onChange={(e) => {
                  this.setState({
                    phoneNumber: e.target.value,
                  });
                }}
                type="text"
                className="form-control"
                placeholder="Ex: 0981234567"
              />
              <span id="notiPN"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <span>Họ và tên</span>
              <input
                value={this.state.fullName}
                onChange={(e) => {
                  this.setState({
                    fullName: e.target.value,
                  });
                }}
                type="text"
                className="form-control"
                placeholder="Ex: Nguyễn Văn A"
              />
              <span id="notiFN"></span>
            </div>
            <div className="form-group">
              <span>Email</span>
              <input
                value={this.state.email}
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
                type="text"
                className="form-control"
                placeholder="Ex: nguyenvana@gmail.com"
              />
              <span id="notiEM"></span>
            </div>
          </div>
        </div>
        <div className="my-2 ">
          <button
            id="addStudent"
            onClick={() => {
              this.props.dispatch(addStudentAction(this.state));
            }}
            className="btn btn-success"
          >
            Add student
          </button>
          <button
            style={{ display: "none" }}
            id="updateStudent"
            onClick={() => {
              this.props.dispatch(updateStudentAction(this.state));
            }}
            className="btn btn-warning ml-3"
          >
            Update
          </button>
          <button
            onClick={() => {
              this.setState({
                studentCode: "",
                phoneNumber: "",
                fullName: "",
                email: "",
              });
            }}
            className="btn btn-secondary ml-3"
          >
            Clear form
          </button>
        </div>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.studentEdit.studentCode !== this.props.studentEdit.studentCode
    ) {
      this.setState({
        studentCode: this.props.studentEdit.studentCode,
        phoneNumber: this.props.studentEdit.phoneNumber,
        fullName: this.props.studentEdit.fullName,
        email: this.props.studentEdit.email,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // studentList: state.studentReducer.studentList,
    studentEdit: state.studentReducer.studentEdit,
  };
};

export default connect(mapStateToProps)(FormStudent);
