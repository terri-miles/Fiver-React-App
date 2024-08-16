import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

const CatCard = ({ item }) => {
  return (
    <Link to="/gigs?cat=">
      <div className="catCard">
        <div className="img_div">
          <img src={item.img} alt={item.title} />
          <div className="overlay"></div>
        </div>
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  );
};

export default CatCard;
