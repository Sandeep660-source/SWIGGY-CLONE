import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getRestaurantById,getMenuItemsByRestaurantIdAPI } from '../services/api';
import MenuItem from '../Components/MenuItem';
import { useCart } from "../context/CartContext.jsx";
import './RestaurantDetails.css'; 


const RestaurantDetails = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const { id } = useParams();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchRestaurantAndMenuItems = async () => {
            try {
                const restaurant = await getRestaurantById(id);
                setRestaurant(restaurant);
                const  fetchedmenuitems = await getMenuItemsByRestaurantIdAPI(id);
                setMenuItems(fetchedmenuitems)
                console.log(menuItems)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRestaurantAndMenuItems();
    }, [id]);

    // Prevent crashing if data is loading
    if (!restaurant) return <div className="loading">Loading...</div>;

    return (
        <div className="restaurant-page">
            
            {/* Header Section (The Black Box) */}
            <div className="res-header-container">
                <div className="res-img-wrapper">
                    {/* CLASSNAME ADDED HERE - This fixes the image size */}
                    <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="res-header-img" 
                    />
                </div>

                <div className="res-info">
                    <h1>{restaurant.name}</h1>
                    <p className="res-cuisine">{restaurant.cuisine}</p>
                    <p className="res-address">{restaurant.address}</p>
                    
                    <div className="res-ratings-row">
                        <span className="rating-badge">★ {restaurant.rating}</span>
                        <span className="delivery-time">30-35 mins</span>
                        <span className="cost-for-two">{restaurant.foodType}</span>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="menu-container">
                <h2 className="menu-heading">Menu</h2>
                <MenuItem menuItems={menuItems} />
            </div>

        </div>
    );
}

export default RestaurantDetails;