import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import user_img from "../../assets/images.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOPen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && (
            <Link className="link" to="/login">
              <span>Sign in</span>
            </Link>
          )}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <Link to="/register">
              <button>Join</button>
            </Link>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOPen(!open)}>
              <img src={currentUser.image || user_img} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add new Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              Graphics & Design
            </Link>
            <Link className="link" to="/">
              Video & Animation
            </Link>
            <Link className="link" to="/">
              Writing & Translation
            </Link>
            <Link className="link" to="/">
              Ai Services
            </Link>
            <Link className="link" to="/">
              Digital Marketing
            </Link>
            <Link className="link" to="/">
              Music & Audio
            </Link>
            <Link className="link" to="/">
              Programming & Tech
            </Link>
            <Link className="link" to="/">
              Business
            </Link>
            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
