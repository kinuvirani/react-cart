import {
  GET_PRODUCT_LIST,
  GET_CART_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_QUANTITY,
} from "../actions/actionType";

const init = {
  products: [
    {
      key: 1,
      name: "Cheese",
      price: 2.5,
      location: "Refrigerated foods",
      qty: 2,
    },
    {
      key: 2,
      name: "Crisps",
      price: 3,
      location: "The snack isle",
      qty: 5,
    },
    {
      key: 3,
      name: "Pizza",
      price: 4,
      location: "Refrigerated foods",
      qty: 7,
    },
    {
      key: 4,
      name: "Chocolate",
      price: 1.5,
      location: "The snack isle",
      qty: 8,
    },
    {
      key: 5,
      name: "Self-raising flour",
      price: 1.5,
      location: "Home backing",
      qty: 0,
    },
    {
      key: 6,
      name: "Ground almonds",
      price: 3,
      location: "Home backing",
      qty: 1,
    },
  ],
  cart: [],
  error: "",
};

export default (state = init, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
      };

    case GET_CART_PRODUCTS:
      return {
        ...state,
      };

    case ADD_TO_CART:
      let val = state.products.map((p) => {
        if (p.key === action.key) {
          p.qty = p.qty - 1;
          let obj = state.cart.length && state.cart.find((c) => c.key === action.key);
          if (obj) {
            let newCart = state.cart.map((c) => {
              return c.key === action.key ? { ...c, qty: c.qty + 1 } : c;
            });
            state.cart = newCart;
          } else {
            let cartItem = { ...p, qty: 1 };
            state.cart.push(cartItem);
          }
        }
        return p;
      });
      return {
        ...state,
        products: val,
      };

    case REMOVE_FROM_CART:
      let newProducts = state.products.map((p) => {
        if (p.key === action.data.key) {
          p.qty = p.qty + action.data.qty;
        }
        return p;
      });
      return {
        ...state,
        products: newProducts,
        cart: state.cart.filter((c) => c.key !== action.data.key),
      };

    case REMOVE_QUANTITY:
      let updatedProducts = state.products.map((p) => {
        if (p.key === action.key) {
          p.qty = p.qty + 1;
          let obj = state.cart.length && state.cart.find((c) => c.key === action.key);
          if (obj.qty > 1) {
            let newCart = state.cart.map((c) => {
              return c.key === action.key ? { ...c, qty: c.qty - 1 } : c;
            });
            state.cart = newCart;
          } else {
            state.cart = state.cart.filter((c) => c.key !== action.key);
          }
        }
        return p;
      });
      return {
        ...state,
        products: updatedProducts,
      };

    default:
      return state;
  }
};
