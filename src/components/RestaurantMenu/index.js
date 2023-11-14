import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL, restaurantMenuAPI } from "../../config";
import Shimmer from "../Shimmer";

import "./index.css";

const RestaurantMenu = () => {
  const param = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  useEffect(() => {
    fetchRestuarantDetails();
  }, []);

  async function fetchRestuarantDetails() {
    const data = await fetch(restaurantMenuAPI + param.id);
    const json = await data.json();

    setRestaurantDetails(json?.data?.cards[0]?.card?.card?.info);
    setRestaurantMenu(
      json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card?.itemCards
    );
  }

  return !restaurantDetails || !restaurantMenu ? (
    <Shimmer />
  ) : (
    <div className='restaurantPage'>
      <div className='resataurantDetails'>
        <h1>{restaurantDetails.name}</h1>
        <p>{restaurantDetails.id}</p>
        <img
          src={IMAGE_URL + restaurantDetails.cloudinaryImageId}
          alt={restaurantDetails.name + " image"}
        />
      </div>
      <div className='resataurantMenu'>
        <ol>
          {restaurantMenu?.map((menu) => {
            return <li key={menu?.card?.info?.id}>{menu?.card?.info?.name}</li>;
          })}
        </ol>
      </div>
    </div>
  );
};

export default RestaurantMenu;
