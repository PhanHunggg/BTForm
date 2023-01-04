import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteStudentAction,
  setStudentAction,
} from "../../store/FormAction/formAction";

class User extends Component {
  handleSelect = (student) => {
    this.props.dispatch(setStudentAction(student));
  };

  handleDelete = (student) => {
    this.props.dispatch(deleteStudentAction(student));
  };

  render() {
    const { element, idx } = this.props;
    return (
      <tbody>
        <tr className={idx % 2 === 0 ? "bg-light" : "bg-white"}>
          <th scope="row">{element.maSV}</th>
          <td>{element.fullName}</td>
          <td>{element.phoneNumber}</td>
          <td>{element.email}</td>
          <td>
            <button
              onClick={() => this.handleSelect(element)}
              className="btn btn-primary mr-3"
            >
              Sửa
            </button>
            <button
              onClick={() => this.handleDelete(element)}
              className="btn btn-danger"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default connect()(User);
