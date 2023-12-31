import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import github from "../../assets/github.png";
import logo from "../../assets/logo2.png";

export const SideBar = () => {
  // const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const [menu, setMenu] = useState(false);
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
    <>
      <div className="  w-16 p-3 flex justify-between gap-8 md:hidden ">
        {" "}
        <div className="flex-none my-auto ml-2 md:pl-4 ">
          <Link to="/">
            {/* <h1 className="flex sm:text-lg  md:text-3xl   ">
              <p className="bg-[#ec5990] rounded-md text-black px-1 ">Be</p>
              <p className="m-auto">-</p>
              <p className="text-black rounded-lg  bg-white flex px-1">
                N<span className="italic">ow</span>
              </p>
            </h1> */}
            <img src={logo} alt="logo" width={100} />
          </Link>
        </div>
        <div
          className={`${
            menu ? "bg-black" : "bg-black/0"
          } duration-500 p-2 rounded-xl z-20 menu-container gap-5 absolute right-5 top-5 `}
        >
          <div
            className="text-white cursor-pointer "
            onClick={() => setMenu((val) => !val)}
          >
            {" "}
            <span className="material-symbols-outlined">
              {menu ? "remove" : "add"}
            </span>
            <p className="text-sm"> {menu ? "remove" : "menu"}</p>
          </div>
          {
            <div
              className={` ${
                menu
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-500`}
            >
              <div className="grow flex justify-center items-center text-sm md:text-lg ">
                <ul className=" gap-7 md:gap-10">
                  {console.log(authStatus)}
                  {navItems.map((item) =>
                    item.active ? (
                      <li key={item.name} className="mt-2">
                        <NavLink
                          onClick={() => setMenu((val) => !val)}
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
                    <li className="mt-2" onClick={() => setMenu((val) => !val)}>
                      <LogoutBtn />
                    </li>
                  )}
                  <li
                    className="mt-3 hover:bg-[#ec5990] rounded-md p-1"
                    onClick={() => setMenu((val) => !val)}
                  >
                    <a
                      href="https://github.com/beenow011/BeNow-tweets"
                      className={({ isActive }) =>
                        ` ${
                          isActive ? "bg-[#ec5990]" : "text-white"
                        }  hover:bg-[#ec598f8c]`
                      }
                    >
                      <img
                        src={github}
                        alt=""
                        width={30}
                        className="m-auto mb-2"
                      />
                      <p className="text-sm text-white ">Github</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};
