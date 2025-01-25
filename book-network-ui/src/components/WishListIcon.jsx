import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function WishListIcon({ type: isBookInWishlist }) {
  return (
    <FontAwesomeIcon
      icon={faHeart}
      size="2xl"
      beat={isBookInWishlist}
      style={{
        color: isBookInWishlist ? "#e63d3d" : "#899094",
      }}
    />
  );
}

export default WishListIcon;
