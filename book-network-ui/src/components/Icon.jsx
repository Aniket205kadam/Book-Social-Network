import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBook,
  faHeart,
  faRightLeft,
  faArrowRightToBracket,
  faRightToBracket,
  faPlaneDeparture
} from "@fortawesome/free-solid-svg-icons";

function Icon({ type }) {
  if (type === "Home") {
    return (
      <FontAwesomeIcon
        icon={faHouse}
        style={{ color: "#ffffff" }}
        className="pr-2"
      />
    );
  } else if (type === "My books") {
    return (
      <FontAwesomeIcon
        icon={faBook}
        style={{ color: "#ffffff" }}
        className="pr-2"
      />
    );
  } else if (type === "My waiting list") {
    return (
      <FontAwesomeIcon
        icon={faHeart}
        style={{ color: "#ffffff" }}
        className="pr-2"
      />
    );
  } else if (type === "My returned books") {
    return (
      <FontAwesomeIcon
        icon={faRightLeft}
        style={{ color: "#ffffff" }}
        className="pr-2"
      />
    );
  } else if (type === "Sign-Up") {
    return (
      <FontAwesomeIcon
        icon={faRightToBracket}
        style={{ color: "#ffffff" }}
        className="pr-2"
      />
    );
  } else if (type === "Sign-In") {
    return (
      <FontAwesomeIcon
        icon={faArrowRightToBracket}
        style={{ color: "#ffffff" }}
        className="pr-2"
      />
    );
  } else if (type === "My borrowed books") {
    return (
      <FontAwesomeIcon
        icon={faPlaneDeparture}
        style={{ color: "#ffffff" }}
        className="pr-2"
      />
    );
  }
}

export default Icon;
