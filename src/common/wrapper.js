import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userSignOut } from "../actions/user.action";
import "./index.css";

class LayoutWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToSignup = () => {
    this.props.history.push("/signup");
  };

  goToSignin = () => {
    this.props.history.push("/signin");
  };

  goToProduct = () => {
    this.props.history.push("/products");
  };

  goToCart = () => {
    this.props.history.push("/cart");
  };

  signout = () => {
    this.props.userSignOut();
    this.goToSignin();
  };

  render() {
    const { Header, Content, Footer } = Layout;

    const menuItem = !this.props.token ? (
      <>
        <Menu.Item key="1" onClick={this.goToSignup}>
          Sign up
        </Menu.Item>
        <Menu.Item key="2" onClick={this.goToSignin}>
          Sign in
        </Menu.Item>
      </>
    ) : (
      <>
        <Menu.Item key="1" onClick={this.goToProduct}>
          Products
        </Menu.Item>
        <Menu.Item key="2" onClick={this.goToCart}>
          Cart
        </Menu.Item>
        <Menu.Item key="3" onClick={this.signout}>
          Logout
        </Menu.Item>
      </>
    );
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.props.defaultKey] || ["3"]}
            >
              {menuItem}
            </Menu>
          </Header>
          <Content style={{ padding: "10px 25px" }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Test task ©2021 Created by Kiran Virani
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userSignOut }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LayoutWrapper)
);
