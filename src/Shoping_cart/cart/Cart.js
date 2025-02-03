import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../css/Cart.module.css"; // Import CSS Module
import { useNavigate } from "react-router-dom"; // Initialize navigation function
  
function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("User is not logged in.");
                return;
            }

            const response = await axios.get("https://ravinder.freelogomaker.in/api/cart/show", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCartItems(response.data.cartItems);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setLoading(false);
        }
    };

    const cartItemCount = cartItems.length;
    localStorage.setItem('count', cartItemCount)
    // Calculate total price for each product and overall total amount
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.pprice, 0);
    };

    const removeFromCart = async (id) => {
        try {
            const token = localStorage.getItem("token");
    
            if (!token) {
                console.error("User is not logged in.");
                return;
            }
    
            const response = await axios.delete(`https://ravinder.freelogomaker.in/api/cart/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200 && response.data.success) {
                fetchCartItems(); 
                alert("Product removed from cart!");
            }
        } catch (error) {
            console.error("Error removing product from cart:", error);
        }
    };
    
    return (
        <>
        {/* Back to Home Button */}
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Back to Home
      </button>
        <div className={styles.cartContainer}>
            <h2 className={styles.cartTitle}>Your Cart</h2>
            {loading ? (
                <p>Loading...</p>
            ) : cartItems.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
                <table className={styles.cartTable}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.pname}</td>
                                <td>
                                    <img
                                        src={`/${item.pimage}`}
                                        alt={item.pname}
                                        className={styles.cartItemImage}
                                    />
                                </td>
                                <td>{item.ptitle}</td>
                                <td>{item.quantity}</td>
                                <td>{item.pprice}</td>
                                <td>{(item.quantity * item.pprice).toFixed(2)}</td> {/* Total for each product */}
                                <td>
                                    <button className={styles.removeButton} onClick={() => removeFromCart(item.product_id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {cartItems.length > 0 && (
                <div className={styles.totalAmount}>
                    <h4>Total Amount: ${calculateTotalAmount().toFixed(2)}</h4> {/* Cart's total */}
                </div>
            )}
        </div>
        </>
    );
}

export default Cart;
