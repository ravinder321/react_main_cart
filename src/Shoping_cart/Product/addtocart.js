import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

function ProductItem({ product }) {
    const [loading, setLoading] = useState(false);
    const { productId, email } = useParams();
    console.log(productId)
    useEffect(() => {
        if (!productId) {
            console.error('Product ID is missing:', {productId});
            return;
        }

        const addToCart = async () => {
            console.log('Adding to cart...');
            
            const token = localStorage.getItem("token");
            console.log(token);
        
            const quantities = JSON.parse(localStorage.getItem('quantity')) || {};
            const quantity = quantities[productId] || 1;
        
            if (!token) {
                Swal.fire({
                    title: "Error",
                    text: "You need to be logged in to add items to your cart.",
                    icon: "error",
                });
                return;
            }
        
            try {
                const response = await axios.post(
                    `https://ravinder.freelogomaker.in/api/cart/${productId}`,
                    { email, quantity },  // Send correct quantity
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
        
                console.log('Response:', response);
                if (response.data.success) {
                    setLoading(true);
                    Swal.fire({
                        title: "Success",
                        text: response.data.message || "Item added to cart successfully!",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.data.message || "Something went wrong.",
                        icon: "error",
                    });
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        };
        
        addToCart();
    }, [productId]); 

    return (
        <div className="product-item">
            {loading ? (
                <Navigate to="/shop" />
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
}

export default ProductItem;
