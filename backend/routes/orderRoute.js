import express from "express"
import Order from "../models/orderModel"

const router = express.Router()

router.get("/:name",async (req,res)=> {
    const orders = await Order.find({userName: req.params.name})
    if(orders){
        res.send(orders)
    }else{
        res.status(404).send({msg: "No Orders"})
    }
})

router.post("/", async (req,res)=>{
    const order = new Order({
        userName: req.body.userName,
        address: req.body.address,
        amount: req.body.amount,
        items: req.body.items,
        orderDate: req.body.orderDate,
        status: req.body.status
    })

    const newOrder = await order.save()
    if(newOrder){
        return res.status(201).send({message: "Order Saved", data: newOrder})
    }
    return res.status(500).send({message: "Error in Saving Order"})
})

export default router