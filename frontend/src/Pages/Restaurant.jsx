import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import { getAllRestaurants } from "../services/api";
import "./Restaurant.css";

const Restaurant = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllRestaurants();
        setRestaurantList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurantList.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="restaurant-page">
      <h2 className="page-title">Restaurants Near You</h2>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="restaurant-grid">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
