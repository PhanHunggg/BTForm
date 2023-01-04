import React, { Component } from "react";
import Manage from "./Manage";
import UserList from "./UserList";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Manage />
        <UserList />
      </div>
    );
  }
}
