import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i._id === item._id);

    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    console.log("Cart Items:", cartItems);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

   const updateQuantity = (itemId,quantity)=>{
    console.log();
    if (quantity <=0){
      removeFromCart(itemId);
    }else{
      setCartItems(
        cartItems.map((i) => (i._id ===  itemId ?{...i,quantity}: i))
      )
    }
   }
   const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get total number of items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

   


  
  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart, updateQuantity,getTotalPrice,getTotalItems,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;