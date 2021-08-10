import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  userName:{type: String,required: true},
  address:{type: String,required: true},
  amount:{type: Number, required: true},
  items:{type: String, required: true},
  orderDate:{type: String, required: true},
  status:{type: String,required: true}  
})

const orderModel = mongoose.model("Order", orderSchema)

export default orderModel