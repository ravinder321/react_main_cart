import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductList() {
    const { categoryId } = useParams(); // Get categoryId from route parameters
    const [products, setProducts] = useState([]);

    // Fetch products from API based on categoryId
    useEffect(() => {
        const url = categoryId 
            ? `https://ravinder.freelogomaker.in/products/${categoryId}`
            : 'https://ravinder.freelogomaker.in/products';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data.products);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, [categoryId]);

    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <div className="dropdown ml-4">
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                        <button className="dropdown-item" onClick={() => {}}>
                                            Latest
                                        </button>
                                        <button className="dropdown-item" onClick={() => {}}>
                                            Popularity
                                        </button>
                                        <button className="dropdown-item" onClick={() => {}}>
                                            Best Rating
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {products.map((product) => (
                            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 pb-1">
                                <div className="card product-item border-0 mb-4">
                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <Link to={`/product/${product.id}`}>
                                            <img
                                                className="img-fluid w-100"
                                                src={`/${product.images}`} 
                                                alt={product.images}
                                                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                            />
                                        </Link>
                                    </div>
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
