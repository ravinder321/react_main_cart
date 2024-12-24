import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductList() {
    const { productId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const url = productId
            ? `http://localhost/laravel-shoping-cart/public/api/single_products/${productId}`
            : 'http://localhost/laravel-shoping-cart/public/api/single_products';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data.products);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, [productId]);
    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        {products.map((product) => (
                            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                        <img className="img-fluid" src={`/${product.images}`} alt={product.images} style={{ width: '900px', height: '300px' }} />
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3">{product.pname}</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>${product.pprice}</h6>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between bg-light border">
                                        <form action={`/cart/${product.id}`} className="mr-2">
                                            <button type="submit" className="btn btn-sm text-dark p-0">
                                                <i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                                            </button>
                                        </form>
                                        <form action="/product/buy" method="POST">
                                            <button type="submit" className="btn btn-sm btn-primary">
                                                <i className="fas fa-credit-card text-light mr-1"></i>Buy Now
                                            </button>
                                        </form>
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
