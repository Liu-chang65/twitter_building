import React, { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
  } from 'react-router-dom';

export default function Login() {

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-purple-300">
                <form className="m-5 w-10/12" >  
                    <h1 className="w-full text-4xl tracking-widget text-center my-6">Login</h1>
                    <div className="w-full my-6">
                        <input type="email" name="email" className="p-2 rounded shadow w-full text-black" placeholder="Email or Username"/>
                    </div>
                    <div className="w-full my-6">
                        <input type="password" name="password" className="p-2 rounded shadow w-full text-black" placeholder="password"/>
                    </div>
                    <div className="w-full my0-10">
                        <button type="submit" className="p-2 rounded shadow w-full bg-yellow-400 text-black">
                        Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}