import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import ProductsScreen from "./Screens/ProductsScreen"
import CartScreen from './Screens/CartScreen'
import SigninScreen from './Screens/SigninScreen'
import { useSelector } from 'react-redux'
import RegisterScreen from './Screens/RegisterScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import ProfileScreen from './Screens/ProfileScreen'
import MyOrdersScreen from "./Screens/MyOrdersScreen"
import Cookie from "js-cookie"

function App(props) {

    const userSignin = useSelector(state=> state.userSignin)
    const {userInfo} = userSignin

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  }

  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  const logoutHandler = () =>{
      Cookie.remove('userInfo')
      Cookie.remove('cartItems')
      window.location = "/"
  }

  return (
      <Router>
        <div className="grid-container">
                <header className="header">
                    <div className="brand">
                        <button onClick={openMenu}>
                            &#9776;
                        </button>
                        <Link to="/">Amazona</Link>
                    </div>
                    <div className="header-links">
                        <Link to="/cart">Cart</Link>
                        {userInfo && userInfo.isAdmin === true ? <Link to="/products">Manage Products</Link> : ''}
                        { userInfo ? 
                        <div className="dropdown">
                        <Link className="dropbtn">{userInfo.name}</Link>
                        <div className="dropdown-content">
                          <div><Link to="/profile">Profile</Link></div>
                          <div><Link to="/orders">My Orders</Link></div>
                          <div><button className="logoutbtn" onClick={logoutHandler}>Logout</button></div>
                        </div>
                      </div> : 
                      <Link to="/signin">Sign In</Link> }
                    </div>
                </header>
                <aside className="sidebar">
                    <h3>Shopping Categories</h3>
                    <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                    <ul>
                        <li>
                            <a href="index.html">Pants</a>
                        </li>
                        <li>
                            <a href="index.html">Shirts</a>
                        </li>
                    </ul>
                </aside>
                <main className="main">
                    <div className="content">

                        <Switch>
                            <Route path="/profile" component={ProfileScreen} />
                            <Route path="/products" component={ProductsScreen} />
                            <Route path="/shipping" component={ShippingScreen} />
                            <Route path="/placeorder" component={PlaceOrderScreen} />
                            <Route path="/orders" component={MyOrdersScreen} />
                            <Route path="/signin" exact component={SigninScreen} />
                            <Route path="/register" exact component={RegisterScreen} />
                            <Route path="/product/:id" component={ProductScreen} />
                            <Route path="/cart/:id?" component={CartScreen} />
                            <Route path="/" exact component={HomeScreen} />
                        </Switch>

                        
                    </div>
                </main>
                <footer className="footer">
                    All Rights Reserved.
                </footer>
            </div>
        </Router>
  );
}

export default App;
