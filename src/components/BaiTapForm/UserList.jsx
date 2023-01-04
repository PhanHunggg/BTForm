import React, { Component } from "react";
import { connect } from "react-redux";
import User from "./User";

class UserList extends Component {
  state = {
    keyword: "",
  };

  renderUser = () => {
    const filterStudent = this.props.userList.filter((ele) => {
      return (
        ele.fullName.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !==
        -1
      );
    });
    return filterStudent.map((element, idx) => {
      return <User idx={idx} key={element.maSV} element={element} />;
    });
  };

  render() {
    return (
      <div className="container">
        <div className="title">
          <h2 className="bg-dark text-white py-2">Danh sách sinh viên</h2>
        <div className="row">
          <div className="col-4">
          <input
            onChange={(event) => {
              this.setState({
                keyword: event.target.value,
              });
            }}
            className="form-control-plaintext my-2"
            placeholder="
            Find Student Name..."
            type="text"
          />
          </div>
        </div>
        </div>
        <table className="table table-striped">
          <thead className="bg-white">
            <tr>
              <th scope="col">Mã SV</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
        
          {this.renderUser()}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.formReducer.userList,
  };
};

export default connect(mapStateToProps)(UserList);
