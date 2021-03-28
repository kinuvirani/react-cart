import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userSignUp } from "../../actions/user.action";
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

const Registration = (props) => {
  useEffect(() => {
    if (props.token) {
      props.history.push("/cart");
    }
  }, [props.token]);

  const onFinish = (values) => {
    let data = {
      user: {
        ...values.user,
        phone: `+91${values.user.phone}`,
      },
      device_detail: {
        device_type: values.device_detail.device_type || "web",
        player_id: "",
      },
    };
    props.userSignUp(data);
    props.history.push("/signin");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue="+91"
        style={{
          width: 70,
        }}
      >
        <Option value="+91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <LayoutWrapper name="registration" defaultKey="1">
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
            label="Fi
              rstname"
            name={["user", "first_name"]}
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name={["user", "last_name"]}
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["user", "phone"]}
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

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
              Sign Up
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
  return bindActionCreators({ userSignUp }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Registration)
);
