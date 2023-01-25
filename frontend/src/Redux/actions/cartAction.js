import { ADD_TO_CART, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import Axios from "axios";
export const addToCart = (productId, quantity) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        name: data.name,
        img: data.img,
        price: data.price,
        countInStock: data.countInStock,
        //product: data.id,
        product: data._id,
        quantity,
      },
    });
    // save items in localStorage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };


  export const removeFromCart= (productId) => (dispatch,getState)=>{
dispatch({type:CART_REMOVE_ITEM,payload:productId});
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
  };

  export const saveShippingAddress=(data)=>(dispatch)=>{
    dispatch ({type:CART_SAVE_SHIPPING_ADDRESS,payload:data});
    localStorage.setItem("shippingAddress",JSON.stringify(data));
  }