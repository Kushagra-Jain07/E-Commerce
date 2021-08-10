import axios from "axios"
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
     PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } = require("../constants/productConstants")

const listProducts = () => async (dispatch) =>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get("/api/products")
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }   
}

const saveProduct = (id,name,price,image,brand,category,countInStock,description) => async (dispatch, getState) =>{
    try{
        const product = {name,price,image,brand,category,countInStock,description}
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product})
        const {userSignin:{userInfo}} = getState()
        if(!id){
            const {data} = await axios({
                method: 'POST',
                url: '/api/products',
                headers: {
                    'Authorization': "Bearer " + userInfo.token
                },
                data: {name,price,image,brand,category,countInStock,description}
            })
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data})
        }else{
            const {data} = await axios({
                method: 'PUT',
                url: '/api/products/'+ id,
                headers: {
                    'Authorization': "Bearer " + userInfo.token
                },
                data: {name,price,image,brand,category,countInStock,description}
            })
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data})
        }
    }catch(error){
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message})
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
        const {data} = await axios.get("/api/products/"+ productId)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: PRODUCT_DETAILS_FAIL,payload: error.message})
    }
} 

const deleteProduct = (productId) => async (dispatch, getState) => {
    try{
        const {userSignin:{userInfo}} = getState()
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId})
        const {data} = await axios.delete("/api/products/"+ productId,{headers: { Authorization: 'Bearer '+ userInfo.token}})
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true})
    }catch(error){
        dispatch({type: PRODUCT_DELETE_FAIL,payload: error.message})
    }
} 

export {listProducts, detailsProduct, saveProduct, deleteProduct}