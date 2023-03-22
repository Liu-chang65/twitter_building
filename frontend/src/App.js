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
import Follow from "./pages/Follow";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
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
                    <Route exact path="/notification" element={<Notification />} />
                    <Route exact path="/profile/:user_name" element={<Profile />} />
                    <Route exact path="/post/detail/:id" element={<PostDetail />} />
                    <Route exact path="/follow" element={<Follow />} />
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
