import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCartCount = localStorage.getItem('count');

   
    setCartCount(storedCartCount ? parseInt(storedCartCount) : 0);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
          
        </div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark px-2" href="https://www.facebook.com/" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="text-dark px-2" href="https://x.com/" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="text-dark px-2" href="https://www.linkedin.com/" target="_blank">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="text-dark px-2" href="https://www.instagram.com/" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="text-dark pl-2" href="https://www.youtube.com/" target="_blank">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a href="" className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
            </h1>
          </a>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form action="">
            <div className="input-group">
              <div className="input-group-append">
               
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <Link to="/cart">
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge">{cartCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
