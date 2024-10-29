import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL, restaurantMenuAPI } from "../../config";
import Shimmer from "../Shimmer";

import "./index.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/cartSlice";

const RestaurantMenu = () => {
  const param = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRestuarantDetails();
  }, []);

  async function fetchRestuarantDetails() {
    const data = await fetch(restaurantMenuAPI + param.id);
    const json = await data.json();

    setRestaurantDetails(json?.data?.cards[2]?.card?.card?.info);
    setRestaurantMenu(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
  }

  const handleAddItem = (menu) => {
    dispatch(addItem(menu));
  };

  return !restaurantDetails || !restaurantMenu ? (
    <Shimmer />
  ) : (
    <div className='restaurantPage'>
      <div className='resataurantDetails'>
        <h1>{restaurantDetails.name}</h1>
        <p>{restaurantDetails.id}</p>
        <img src={IMAGE_URL + restaurantDetails.cloudinaryImageId} alt={restaurantDetails.name + " image"} />
      </div>
      <div className='resataurantMenu'>
        <ol>
          {restaurantMenu?.map((menu) => {
            return (
              <li key={menu?.card?.info?.id} className='menuItemList'>
                {menu?.card?.info?.name} -{" "}
                <button className='addButton' onClick={() => handleAddItem(menu)}>
                  Add
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default RestaurantMenu;
