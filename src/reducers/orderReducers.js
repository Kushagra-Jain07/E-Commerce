const { ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_SAVE_FAIL, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST } = require("../constants/orderConstants")

function orderSaveReducer(state = {order:{}}, action) {
    switch(action.type){
        case ORDER_SAVE_REQUEST:
            return {loading: true}
        case ORDER_SAVE_SUCCESS:
            return {loading: false,success: true, product: action.payload}
        case ORDER_SAVE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function orderListReducer(state = {orders:[]}, action) {
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading: true, orders: []}
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload}
        case ORDER_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export {orderSaveReducer, orderListReducer}