import React, { Component } from "react";
import FormStudent from "./FormStudent";
import TableStudent from "./TableStudent";

export default class Student_Management extends Component {
  render() {
    return (
      <div className="container text-left mt-5">
        <FormStudent />
        <TableStudent />
      </div>
    );
  }
}
