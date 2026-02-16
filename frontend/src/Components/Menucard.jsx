import React, { useState } from "react";
import "./Menu.css";
import { useCart } from "../context/CartContext";

const MenuCard = ({ menuItem }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...menuItem });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const isVeg = menuItem.foodType === "veg";

  return (
    <div className="menu-card">

      
      <div className="menu-card-details">

        <div className={`food-type-icon ${isVeg ? "veg" : "non-veg"}`}>
          <span></span>
        </div>

        <h3 className="menu-item-name">{menuItem.name}</h3>

        <p className="menu-item-price">₹{menuItem.price}</p>

        <p className="menu-item-desc">{menuItem.description}</p>

        <div className="menu-item-category">{menuItem.category}</div>
      </div>

      
      <div className="menu-card-image-section">
        {menuItem.image && (
          <img
            src={menuItem.image}
            alt={menuItem.name}
            className="menu-item-img"
          />
        )}

        <button onClick={handleAddToCart} className="add-btn">
          {isAdded ? "ADDED ✓" : "ADD"}
        </button>
      </div>

    </div>
  );
};

export default MenuCard;
