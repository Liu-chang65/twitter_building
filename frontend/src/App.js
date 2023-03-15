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
              {!userInfo ? 
                (
                  <>
                    <Route exact={true} path="/login" element={<Login />} />
                    <Route exact={true} path="/signup" element={<SignUp />} />
                    <Route exact={false} path="*" element={<Navigate to='/login' />} />
                  </>                  
                ): 
                (
                  <>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/following" element={<Following />} />
                    <Route exact path="/notification" element={<Notification />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact={false} path="*" element={<Navigate to='/' />} />
                  </>                 
                )
              }
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
