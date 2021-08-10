import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listOrders } from "../actions/orderActions"
import { Link } from "react-router-dom"

function MyOrdersScreen(props){

    const userSignin = useSelector(state=> state.userSignin)
    const {userInfo} = userSignin

    const orderList = useSelector(state=> state.orderList)
    const {loading, orders, error} = orderList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listOrders(userInfo.name))
        return() => {

        }
    }, [dispatch, userInfo.name])

    return(
        <div className="content content-margined">
            {loading && <div>Loading..</div>}
            {error && <div>{error}</div>}
            <div className="product-header">
                <h3>Your Orders</h3>
            </div>
            {orders.length === 0 ? 
            <div>
                <hr />
                <h3>No Orders Yet</h3>
                <Link to="/">Continue Shopping</Link>
            </div> :
            <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Details</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                    return <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.userName}</td>
                        <td>{order.address}</td>
                        <td>{order.items}</td>
                        <td>Rs. {order.amount}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status}</td>
                    </tr>})}
                </tbody>
            </table>
        </div>
        }   
        </div>
            
    )
}

export default MyOrdersScreen