import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfStroke,
  faStar as faEmptyStar,
} from "@fortawesome/free-solid-svg-icons";

function Rating({ rating }) {
  if (rating > 5) rating = 5;
  const fullStar = Math.floor(rating);
  const halfStar = Number(rating % 1 >= 0.5);
  const emptyStar = 5 - fullStar - halfStar;

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: fullStar }).map((_, index) => (
        <FontAwesomeIcon
          key={`full-${index}`}
          icon={faStar}
          style={{ color: "#FFD700" }}
        />
      ))}
      {halfStar === 1 && (
        <FontAwesomeIcon
          key="half-star"
          icon={faStarHalfStroke}
          style={{ color: "#FFD700" }}
        />
      )}
      {Array.from({ length: emptyStar }).map((_, index) => (
        <FontAwesomeIcon
          key={`empty-${index}`}
          icon={faEmptyStar}
          style={{ color: "#E4E5E9" }}
        />
      ))}
      <div className="p-1">
        <b>{rating}</b>
      </div>
    </div>
  );
}

export default Rating;
