import React, { useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"
import { saveOrder } from "../actions/orderActions"
import Cookie from "js-cookie"
import PaypalButton from "../components/PaypalButton"

function PlaceOrderScreen(props){

    const cart = useSelector(state=> state.cart)
    const {cartItems, shipping} = cart
    if(!shipping.address){
        props.history.push('/shipping')
    }

    const [showPaypal, setShowPaypal] = useState(false)

    const itemsPrice = cartItems.reduce((a,c) => a + c.price*c.qty, 0)
    const shippingPrice = itemsPrice > 5000 ? 0 : 30
    const taxPrice = 0.09 * itemsPrice
    const totalPrice = itemsPrice + shippingPrice + taxPrice

    const userSignin = useSelector(state=> state.userSignin)
    const {userInfo} = userSignin

    const userName = userInfo.name
    const address = cart.shipping.address +","+ cart.shipping.city + "," + cart.shipping.postalCode +","+cart.shipping.country
    const amount = totalPrice
    const orderDate = new Date().toISOString().substr(0,10)
    const status = "Order placed"

    const itemArr = cartItems.map(item => item.qty +" "+ item.name)
    var items = itemArr.toString()

    const orderSave = useSelector(state=> state.orderSave)
    const {loading, success, error} = orderSave

    const dispatch = useDispatch()

    const placeOrderHandler = () =>{
        Cookie.remove('cartItems')
        setShowPaypal(true)
        dispatch(saveOrder(userName,address,amount,items,orderDate,status))
    }

    return(
        <div>
            {loading && <div>Loading..</div>}
            {error && <div>{error}</div>}
            {showPaypal ? 
            <PaypalButton success={success} items={items} amount={amount} /> 
            :
            <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Shipping</h3>
                    <div>
                        {cart.shipping.address},{cart.shipping.city},
                        {cart.shipping.postalCode},{cart.shipping.country}
                    </div>
                </div>
                <div>
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        cartItems.length === 0 ?
                        <div>
                            Cart is empty
                        </div>
                        :
                        cartItems.map(item => 
                                <li>
                                    <div className="cart-image">
                                        <img src={item.image} alt="product" />
                                    </div>
                                    <div className="cart-name">
                                        <div>
                                            <Link to={"/products/" + item.product}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        Qty: {item.qty}
                                    </div>
                                
                                <div className="cart-price">
                                     Rs. {item.price}
                                </div>
                            </li>
                            )
                     }
                 </ul>
                </div> 
            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button className="button full-width" onClick={placeOrderHandler}>Place Order</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>Rs. {itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>Rs. {shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>Rs. {taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div><b>Rs. {totalPrice}</b></div>
                    </li>
                </ul>
            </div>
          </div>
        </div>
            }    
    </div>
        
    )
}

export default PlaceOrderScreen