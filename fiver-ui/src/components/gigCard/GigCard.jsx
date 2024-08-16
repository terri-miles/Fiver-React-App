import React from "react";
import { Link } from "react-router-dom";
import star from "../../assets/star.png";
import heart from "../../assets/heart.png";
import "./GigCard.scss";
import { useQuery } from "@tanstack/react-query";
import img from "../../assets/images.png";
import apiRequest from "../../utils/apiRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      apiRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "Loading"
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="user">
              <img src={data.img || img} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.title}</p>
          <div className="star">
            <img src={star} alt="" />
            <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src={heart} alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
