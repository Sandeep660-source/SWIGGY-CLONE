import React from "react";
import Card from "../Components/Card";

const Restaurant = () => {
  const restaurantList = [
    {
      name: "Global Tastes",
      image: "https://example.com/global-tastes.jpg",
      address: {
        street: "45 Food Street",
        city: "Bangalore",
        state: "KA",
        zipcode: "560001"
      },
      phone: "9876543210",
      cuisines: [
        { name: "Indian", description: "North & South Indian dishes", spiceLevel: "Hot" },
        { name: "Chinese", description: "Authentic Chinese street food", spiceLevel: "Medium" }
      ],
      rating: 4.2
    },
    {
      name: "Pizza Palace",
      image: "https://example.com/pizza-palace.jpg",
      address: {
        street: "12 MG Road",
        city: "Bangalore",
        state: "KA",
        zipcode: "560002"
      },
      phone: "9123456789",
      cuisines: [
        { name: "Italian", description: "Wood-fired pizzas and pasta", spiceLevel: "Mild" },
        { name: "Mexican", description: "Tacos, burritos, nachos", spiceLevel: "Medium" }
      ],
      rating: 4.7
    }
  ];

  return (
    <div className="card-container">
      {restaurantList.map((restaurant, index) => (
        <Card key={index} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default Restaurant;