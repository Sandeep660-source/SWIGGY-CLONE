import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-card"
      onClick={() => navigate(`/restaurant/${restaurant._id}`)}
    >
      <img src={restaurant.image} alt={restaurant.name} />

      <div className="restaurant-card-content">
        <div className="restaurant-name">{restaurant.name}</div>
        <div className="restaurant-info">⭐ {restaurant.rating}</div>
        <div className="restaurant-info">{restaurant.cuisine}</div>
      </div>
    </div>
  );
};

export default Card;
