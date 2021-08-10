import axios from "axios"
import { ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_SAVE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from "../constants/orderConstants"

const saveOrder = (userName,address,amount,items,orderDate,status) => async (dispatch) =>{
    try{
        const order = {userName,address,amount,items,orderDate,status}
        dispatch({ type: ORDER_SAVE_REQUEST, payload: order})
            const {data} = await axios({
                method: 'POST',
                url: '/api/orders',
                data: {userName,address,amount,items,orderDate,status}
            })
            dispatch({ type: ORDER_SAVE_SUCCESS, payload: data})
    }catch(error){
        dispatch({ type: ORDER_SAVE_FAIL, payload: error.message})
    }
}

const listOrders = (userName) => async (dispatch) =>{
    try{
        dispatch({type: ORDER_LIST_REQUEST})
        const {data} = await axios.get("/api/orders/"+ userName)
        dispatch({type: ORDER_LIST_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: ORDER_LIST_FAIL, payload: error.message})
    }   
}

export {saveOrder, listOrders}