import React from "react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authenticationSlice";

function Header() {
  const currLocation = useLocation();
  const authStatus = useSelector(
    (state) => state.authentication.authenticationStatus
  );
  const User = useSelector((state) => state.authentication.fullName);
  const dispatch = useDispatch();
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "My books",
      url: "/my-books",
      active: authStatus,
    },
    {
      name: "My borrowed books",
      url: "/my-borrowed-books",
      active: authStatus
    },
    {
      name: "My waiting list",
      url: "/my-waiting-list",
      active: authStatus,
    },
    {
      name: "My returned books",
      url: "/my-returned-books",
      active: authStatus,
    },
    {
      name: "Sign-Up",
      url: "/authentication/signup",
      active: !authStatus,
    },
    {
      name: "Sign-In",
      url: "/authentication/login",
      active: !authStatus,
    },
  ];

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="flex flex-wrap">
        <section className="relative mx-auto">
          <nav className="fixed top-0 left-0 z-50 flex justify-between bg-gray-900 text-white w-full shadow-lg">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <Logo />
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                {navItems.map((navItem) =>
                  navItem.active ? (
                    <li
                      key={navItem.name}
                      className={`${
                        currLocation.pathname === navItem.url
                          ? "text-blue-500 underline"
                          : null
                      }`}
                    >
                      <Icon type={navItem.name} key={navItem.name} />
                      <Link to={navItem.url}>{navItem.name}</Link>
                    </li>
                  ) : null
                )}
              </ul>
              {authStatus && (
                <div>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    style={{ color: "#fcfcfd" }}
                    className="pr-2"
                  />
                  <b className="pr-4">{User}</b>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{ color: "#f5f5f5" }}
                    onClick={logoutHandler}
                  />
                </div>
              )}
            </div>
          </nav>
        </section>
      </div>
    </>
  );
}

export default Header;
