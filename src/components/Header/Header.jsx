import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

export const Header = () => {
  // const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      icon: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Tweet",
      icon: "edit_note",
      path: "/tweets",
      active: authStatus,
    },
    {
      name: "Profile",
      icon: "account_circle",
      path: "/profile",
      active: authStatus,
    },

    {
      name: "Login",
      icon: "login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      icon: "person_add",
      path: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <header className=" sticky z-50 top-0 shadow-lg shadow-gray-900/80">
      <nav className=" bg-black lg:px-10 py-2.5 text-white flex   justify-evenly rounded-md sm:flex-col md:flex-row">
        <div className="flex-none my-auto ml-2 md:pl-4">
          <Link to="/">
            <h1 className="flex sm:text-lg  md:text-3xl   ">
              <p className="bg-[#ec5990] rounded-md text-black px-1 ">Be</p>
              <p className="m-auto">-</p>
              <p className="text-black rounded-lg  bg-white flex px-1">
                N<span className="italic">ow</span>
              </p>
            </h1>
          </Link>
        </div>

        <div className="grow flex justify-center items-center text-sm md:text-lg">
          <ul className="flex gap-6 md:gap-10">
            {console.log(authStatus)}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      ` ${
                        isActive ? "text-[#ec5990]" : "text-white"
                      }  hover:text-[#ec598f8c]`
                    }
                  >
                    <div>
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                      <p className="text-sm">{item.name}</p>
                    </div>
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  ` ${
                    isActive ? "text-[#ec5990]" : "text-white"
                  }  hover:text-[#ec598f8c]`
                }
              >
                <span className="material-symbols-outlined">home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tweets"
                className={({ isActive }) =>
                  ` ${
                    isActive ? "text-[#ec5990]" : "text-white"
                  }  hover:text-[#ec598f8c]`
                }
              >
                <span className="material-symbols-outlined">edit_note</span>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  ` ${
                    isActive ? "text-[#ec5990]" : "text-white"
                  }  hover:text-[#ec598f8c]`
                }
              >
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </NavLink>
            </li> */}
          </ul>
        </div>
        <div className="flex-none flex items-center">
          <a
            href="https://github.com/beenow011/BeeNow-Tweets---React"
            className="md:bg-white hover:bg-gray-500 rounded-md md:text-black  sm:text-sm  p-2 mx-2"
          >
            Github
          </a>
        </div>
      </nav>
    </header>
  );
};
