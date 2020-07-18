import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import InputFieldGroup from "../common/InputFieldGroup";
import Checkbox from "../common/Checkbox";

import { loginUser } from "../../actions/authActions";

// Log In Form
class Login extends Component {
  state = {
    email: "demo@gmail.com",
    password: "123456",
    rememberMe: true,
    errors: {},
  };

  componentDidMount() {
    // Check if alreay authenticated
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    // Check if authenticated and redirect
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    // Display errors
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (value, name) => {
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your GK Sales account or{" "}
                <Link to="/register" className="text-primary">
                  Register for a new account
                </Link>
              </p>
              <p className="text-center">
                For demo purposes, sign in as <span className="text-primary">demo@gmail.com</span> with the password{" "}
                <span className="text-primary">123456</span>
              </p>
              <form onSubmit={this.onSubmit} noValidate>
                <InputFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <InputFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <span className="text-center">
                  <Checkbox
                    name="rememberMe"
                    label="Remember Me"
                    value={this.state.rememberMe}
                    onChange={this.onChange}
                  />
                </span>
                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
