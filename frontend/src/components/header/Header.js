import React, {useContext, useEffect, useState} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    NavLink,
    useNavigate,
  } from "react-router-dom";

export default function Header() {

    return (
      <nav className="dark:bg-neutral-700 text-white flex justify-between">
        <ul className="flex justify-between">
          <span className="flex">
          <li className="p-5">
            <NavLink to="/">Twitter</NavLink>
          </li>
          </span>
        </ul>
        <ul className="flex">
          <li className="p-5">
            <NavLink to="/login">Login</NavLink>     
          </li>
          <li className="p-5">
            <NavLink to="/signup">Sign Up</NavLink>       
          </li>
        </ul>
      </nav>
    )
}