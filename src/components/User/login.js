import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userSignIn } from "../../actions/user.action";
import LayoutWrapper from "../../common/wrapper";

import "./index.css";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    // offset: 8,
    span: 8,
  },
};

const Login = (props) => {
  useEffect(() => {
    if (props.token) {
      props.history.push("/cart");
    }
  }, [props.token]);

  const onFinish = (values) => {
    let data = {
      ...values,
      role: "patient",
      device_detail: {
        device_type: values.device_detail.device_type || "web",
        player_id: "",
      },
    };
    props.userSignIn(data);
    props.history.push("/cart");
  };

  return (
    <LayoutWrapper name="registration" defaultKey="2">
      <div className="site-layout-content">
        <Form
          {...layout}
          initialValues={{
            type: "Web",
          }}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name={["user", "password"]}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name={["device_detail", "device_type"]}
            label="Device Type"
          >
            <Select defaultValue="web">
              <Option value="web">Web</Option>
              <Option value="ios">IOS</Option>
              <Option value="android">Android</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="btn-auth">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LayoutWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userSignIn }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
