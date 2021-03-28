import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { Table, Button, Tag } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProductList, addToCart } from "../../actions/product.action";
import LayoutWrapper from "../../common/wrapper";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Product = (props) => {
  useEffect(() => {
    props.getProductList();
  }, []);

  useEffect(() => {
    if (!props.token) {
      props.history.push("/signin");
    }
  }, [props.token]);

  const addProduct = (key) => {
    props.addToCart(key);
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
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        props.products.length >= 1 && record.qty > 0 ? (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => addProduct(record.key)}
          >
            Add to cart
          </Button>
        ) : (
          <Tag color="#cd201f">Sold Out</Tag>
        ),
    },
  ];

  return (
    <LayoutWrapper name="registration" defaultKey="1">
      <div className="site-layout-content">
        <Table
          columns={columns}
          pagination={false}
          dataSource={props.products || []}
        />
      </div>
    </LayoutWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProductList, addToCart }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
