import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import trash from "../../assets/delete.png";
import getCurrentUser from "../../utils/getCurrentUser";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MyGigs = () => {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      apiRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return apiRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="img" src={gig.cover} alt="" />
                </td>
                <td>{gig.titlt}</td>
                <td>$ {gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src={trash}
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
