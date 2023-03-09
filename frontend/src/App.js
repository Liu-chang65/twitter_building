import React, { useState, useEffect, useRef, useContext } from "react";
import "./assets/css/style.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LeftSidebar from "./components/leftsidebar/LeftSidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Following from "./pages/Following";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import { Store } from "./store/Store";

function App() {
  const {state, dispatch:myDispatch} = useContext(Store);
  const { userInfo } = state;

  return (
    <BrowserRouter>
      <ToastContainer position='top-right' limit={1}/>
      <Header />
      <Container className="body-contain mt-5 mb-5">
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={userInfo ? (<Home />) : (<Navigate to='/login' />)} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/following" element={userInfo ? (<Following />) : (<Navigate to='/login' />)} />
              <Route path="/notification" element={userInfo ? (<Notification />) : (<Navigate to='/login' />)} />
              <Route path="/profile" element={userInfo ? (<Profile />) : (<Navigate to='/login' />)} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
