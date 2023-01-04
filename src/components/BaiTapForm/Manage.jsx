import React, { Component } from "react";
import {
  addStudentAction,
  updateStudentAction,
} from "../../store/FormAction/formAction";
import { connect } from "react-redux";

class Manage extends Component {
  constructor(props) {
    super(props);
    this.formReft = React.createRef();
  }

  state = {
    values: {
      maSV: "",
      fullName: "",
      phoneNumber: "",
      email: "",
    },
    errors: {
      maSV: "",
      fullName: "",
      phoneNumber: "",
      email: "",
    },
  };

  handleChange = (even) => {
    const { value, name } = even.target;

    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };

  handleSubmit = (even) => {
    even.preventDefault();
    const isValid = even.target.checkValidity();

    console.log(isValid);
    if (!isValid) return;

    if (this.props.selectedUsers) {
      this.props.dispatch(updateStudentAction(this.state.values));
    } else {
      this.props.dispatch(addStudentAction(this.state.values));
    }
  };

  handleBlur = (event) => {
    const { name, validity, title, minLength, maxLength } = event.target;
    let message = "";

    const { valueMissing, tooLong, tooShort, patternMismatch } = validity;

    if (valueMissing) {
      message = `${title} cần nhập`;
    }

    if (tooShort || tooLong) {
      message = `${title} từ ${minLength}-${maxLength} số`;
    }

    if (patternMismatch) {
      message = `${title} sai định dạng`;
    }
    
    if(patternMismatch && title === "Mã sinh viên"){

      message = `${title} từ 4-10 chữ số`;
    }


    this.setState({
      errors: {
        ...this.state.errors,
        [name]: message,
      },
    });
  };

   // hàm chạy khi props thay đổi
   static getDerivedStateFromProps(nextProps, currentState) {
    console.log({
      nextProps: JSON.parse(JSON.stringify(nextProps)),
      currentState: JSON.parse(JSON.stringify(currentState)),
    });

    // chuyển giá trị của props thành state
    if (
      nextProps.selectedUsers &&
      currentState.values.maSV !== nextProps.selectedUsers.maSV
    ) {
      currentState.values = nextProps.selectedUsers;
    }
    return currentState;
  }


  render() {
    const {
      maSV = "",
      fullName = "",
      email = "",
      phoneNumber = "",
    } = this.state.values || {};
    return (
      <div className="container py-5">
        <h2 className="bg-dark text-white py-3">Thông tin sinh viên</h2>
        <form ref={this.formReft} onSubmit={this.handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Mã sinh viên</label>
              <input
                value={maSV}
                minLength={4}
                maxLength={10}
                pattern="^[0-9]{4,10}$"
                required
                title="Mã sinh viên"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                name="maSV"
                className="form-control"
              />
              <span className="text-danger">{this.state.errors.maSV}</span>
            </div>

            <div className="form-group col-md-6">
              <label>Họ và tên</label>
              <input
                value={fullName}
                required
                title="Họ và tên"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                name="fullName"
                className="form-control"
              />
              <span className="text-danger">{this.state.errors.fullName}</span>
            </div>

            <div className="form-group col-md-6">
              <label>Số điện thoại</label>
              <input
                value={phoneNumber}
                pattern="(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})"
                required
                title="Số điện thoại"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                name="phoneNumber"
                className="form-control"
              />
              <span className="text-danger">
                {this.state.errors.phoneNumber}
              </span>
            </div>

            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                title="Email"
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                name="email"
                className="form-control"
              />
              <span className="text-danger">{this.state.errors.email}</span>
            </div>
          </div>

          <button
            disabled={!this.formReft.current?.checkValidity()}
            className="btn btn-warning"
          >
            Thêm
          </button>
          <button type="reset" className="btn btn-success ml-4">
            Reset
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedUsers: state.formReducer.selectedUsers,
  };
};

export default connect(mapStateToProps)(Manage);
