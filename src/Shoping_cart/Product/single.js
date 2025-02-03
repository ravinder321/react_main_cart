import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductList() {
    const { productId } = useParams();
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const url = productId
            ? `https://ravinder.freelogomaker.in/api/single_products/${productId}`
            : 'https://ravinder.freelogomaker.in/api/single_products';
    
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.products) {
                    setProducts(data.products);
    
                    // Load previous quantities from localStorage, or set default
                    const storedQuantities = JSON.parse(localStorage.getItem('quantity')) || {};
                    const initialQuantities = data.products.reduce((acc, product) => {
                        acc[product.id] = storedQuantities[product.id] || 1;
                        return acc;
                    }, {});
                    setQuantities(initialQuantities);
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, [productId]);
    

    const increaseQuantity = (id) => {
        setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    };

    const decreaseQuantity = (id) => {
        setQuantities((prev) => ({ ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 1 }));
    };

    useEffect(() => {
        localStorage.setItem('quantity', JSON.stringify(quantities));
    }, [quantities]);  // Update when quantities change
    

    const shareProduct = (platform, product) => {
        const url = window.location.href;
        const message = `Check out this product: ${product.pname} for $${product.pprice}. `;
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message + url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
                break;
            default:
                return;
        }
        window.open(shareUrl, '_blank');
    };

    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        {products.map((product) => (
                            <div key={product.id} className="col-lg-12 pb-3">
                                <div className="card product-item border-0 mb-4 d-flex flex-row p-3">
                                    <img className="img-fluid" src={`/${product.images}`} alt={product.pname} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column justify-content-between" style={{ marginLeft: '20px' }}>
                                        <h5 className="mb-2">{product.pname}</h5>
                                        <p>{product.pdescription}</p>
                                        <h6 className="text-danger">${product.pprice}</h6>
                                        <div className="d-flex align-items-center my-2">
                                            <button className="btn btn-sm btn-secondary" onClick={() => decreaseQuantity(product.id)}>-</button>
                                            <span className="mx-2">{quantities[product.id]}</span>
                                            <button className="btn btn-sm btn-secondary" onClick={() => increaseQuantity(product.id)}>+</button>
                                        </div>
                                        <div className="d-flex my-2">
                                            <button className="btn btn-sm btn-success mr-2" onClick={() => shareProduct('whatsapp', product)}>WhatsApp</button>
                                            <button className="btn btn-sm btn-primary mr-2" onClick={() => shareProduct('facebook', product)}>Facebook</button>
                                            <button className="btn btn-sm btn-info" onClick={() => shareProduct('twitter', product)}>Twitter</button>
                                        </div>
                                        <div className="d-flex justify-content-between mt-3">
                                            <form action={`/cart/${product.id}`} className="mr-2">
                                                <button type="submit" className="btn btn-sm btn-warning">
                                                    <i className="fas fa-shopping-cart text-light mr-1"></i>Add To Cart
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
