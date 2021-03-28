import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { Table, Button, Tag } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCartProducts,
  removeFromCart,
  addToCart,
  removeQuantity,
} from "../../actions/product.action";
import LayoutWrapper from "../../common/wrapper";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import "./index.css";

const Product = (props) => {
  let [total, setTotal] = useState(0);
  useEffect(() => {
    props.getCartProducts();
  }, []);

  useEffect(() => {
    if (!props.token) {
      props.history.push("/signin");
    }
  }, [props.token]);

  useEffect(() => {
    let sum = 0;
    props.cart.length &&
      props.cart.forEach((c) => {
        sum += c.price * c.qty;
      });
    setTotal(sum);
  }, [props.cart]);

  const removeProduct = (data) => {
    props.removeFromCart(data);
    // const dataSource = [...this.state.dataSource];
    // this.setState({
    //   dataSource: dataSource.filter((item) => item.key !== key),
    // });
  };

  const addQuantity = (key) => {
    let obj = props.products.length && props.products.find((p) => p.key === key);
    if (obj && obj.qty > 0) {
      props.addToCart(key);
    }
  };

  const removeQuantity = (key) => {
    props.removeQuantity(key);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Quantity",
      key: "qty",
      dataIndex: "qty",
      render: (text, record) => {
        return (
          <>
            <PlusCircleOutlined
              className="icon"
              onClick={() => addQuantity(record.key)}
            />
            <input
              id="qty"
              type="text"
              name="name"
              value={record.qty}
              readOnly={true}
              className="input-box"
            />
            <MinusCircleOutlined
              className="icon"
              onClick={() => removeQuantity(record.key)}
            />
          </>
        );
      },
    },
    {
      title: "Total Price",
      key: "total",
      dataIndex: "totalty",
      render: (text, record) => (
        <>
          <div>{record.qty * record.price}</div>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        props.cart.length >= 1 && record.qty > 0 ? (
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => removeProduct(record)}
          >
            Remove
          </Button>
        ) : (
          <Tag color="#cd201f">Sold Out</Tag>
        ),
    },
  ];

  return (
    <LayoutWrapper name="registration" defaultKey="2">
      <div className="site-layout-content">
        <Table
          columns={columns}
          pagination={false}
          dataSource={props.cart || []}
        />
        {props.cart.length > 0 ? (
          <div className="invoice-details">
            <p className="invoice">Total Products: {props.cart.length || 0}</p>
            <p className="invoice">Total Price: {total}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </LayoutWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.product.cart,
    products: state.product.products,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getCartProducts, removeFromCart, addToCart, removeQuantity },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
