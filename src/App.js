import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Registration from "./components/User/registration";
import Login from "./components/User/login";
import Cart from "./components/Cart";
import Product from "./components/Product";
class App extends React.Component {
  render() {
    return (
      <div className="main">
        <Router>
          <Route exact path="/signup" component={Registration} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/products" component={Product} />
        </Router>
      </div>
    );
  }
}

export default App;
