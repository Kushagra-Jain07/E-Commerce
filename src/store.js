import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from "./reducers/productReducers"
import thunk from "redux-thunk"
import { cartReducer } from "./reducers/cartReducers"
import Cookie from "js-cookie"
import { userSigninReducer, userRegisterReducer } from "./reducers/userReducers"
import { orderSaveReducer, orderListReducer } from "./reducers/orderReducers"


const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null

const initialState = {cart: {cartItems, shipping: {}, payment: {}}, userSignin: {userInfo}, userRegister: {userInfo}}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderSave: orderSaveReducer,
    orderList: orderListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store