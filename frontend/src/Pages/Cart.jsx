import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrderAPI } from "../services/api";
import "./Cart.css";

const Cart = () => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const navigate = useNavigate();
  const { cartItems, removeFromCart,updateQuantity,getTotalPrice,getTotalItems,clearCart  } = useCart();

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      alert("Please enter delivery address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const orderData = {
        restaurantId: cartItems[0].restaurantId,
        items: cartItems.map((item) => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: getTotalPrice(),
        deliveryAddress: deliveryAddress,
      };

      // Debug: Check orderData before sending
      console.log("Order data being sent:", orderData);

      const response = await createOrderAPI(orderData);
      alert("Order placed successfully!");
      clearCart();
      setDeliveryAddress("");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      console.error("Error response:", error.response?.data);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };
  

  const [address, setAddress] = useState("");

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryFee = itemTotal > 0 ? 40 : 0;
  const grandTotal = itemTotal + deliveryFee;

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {/* CART ITEMS */}
      <div className="cart-items-section">
        {cartItems.map((item) => (
          <div className="cart-item-full" key={item._id}>
            <div className="cart-item-left">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p className="price">₹{item.price * item.quantity}</p>
            </div>

            <div className="cart-item-right">
              <img src={item.image} alt={item.name} />

              {/* QTY CONTROLS */}
              <div className="qty-box">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>

              <button
                className="remove-button"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
              
            </div>
          </div>
        ))}
      </div>

      {/* ADDRESS FULL ROW */}
      <div className="address-full">
        <h3>Delivery Address</h3>
        <textarea
          placeholder="Enter your full delivery address..."
          rows="3"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        ></textarea>
      </div>

      {/* BILL FULL ROW */}
      <div className="bill-full">
        <h3>Bill Details</h3>

        <div className="bill-row">
          <span>Item Total</span>
          <span>{getTotalItems()}</span>
        </div>

        <div className="bill-row">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>

        <hr />

        <div className="bill-row total">
          <span>Grand Total</span>
          <span>₹{getTotalPrice()}</span>
        </div>
      </div>
      <button className="place-order-btn"
       onClick={handleCheckout}
       disabled={isPlacingOrder}>
       {isPlacingOrder ? "Placing Order..." : "Place Order"}
     </button>  
 </div>    
  );
};

export default Cart;
