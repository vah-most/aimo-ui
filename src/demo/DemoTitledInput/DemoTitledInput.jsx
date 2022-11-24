/*
 * Created on Sat Nov 05 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";

import AimoTitledInput from "../../AimoTitledInput";

import "./DemoTitledInput.scss";

class DemoTitledInput extends React.Component {
  state = {
    description: "",
    password: "",
    username: "",
  };

  handleDescriptionChange = (description) => {
    this.setState({ description });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleUsernameChange = (username) => {
    this.setState({ username });
  };

  render() {
    const { description, password, username } = this.state;

    return (
      <div className="demoTitledInputContainer">
        <AimoTitledInput
          activeStateClassName="demoInputContainer demoInputContainerActive"
          activeStatePlaceholderClassName="demoInputPlaceholder"
          inactiveStateClassName="demoInputContainer"
          inputClassName="usernameInput"
          onChange={this.handleUsernameChange}
          placeholder="Username"
          value={username}
        />
        <AimoTitledInput
          activeStateClassName="demoInputContainer demoInputContainerActive"
          activeStatePlaceholderClassName="demoInputPlaceholder"
          inactiveStateClassName="demoInputContainer"
          inputClassName="passwordInput"
          inputType="password"
          onChange={this.handlePasswordChange}
          placeholder="Password"
          value={password}
        />
        <AimoTitledInput
          activeStateClassName="demoTextareaContainer demoInputContainerActive"
          activeStatePlaceholderClassName="demoInputPlaceholder"
          inactiveStateClassName="demoTextareaContainer"
          inputClassName="descriptionInput"
          inputType="textarea"
          onChange={this.handleDescriptionChange}
          placeholder="Description"
          value={description}
          cols="40"
          rows="10"
        />
      </div>
    );
  }
}

export default DemoTitledInput;
