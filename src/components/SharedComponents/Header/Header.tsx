import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        Morya Suppier
        <div className="ml-auto d-flex align-items-center">
          <Link to="/" className="btn btn-primary  me-4">
            Home
          </Link>
          <Link to="/add" className="btn btn-secondary">
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
