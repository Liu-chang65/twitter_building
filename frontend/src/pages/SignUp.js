import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import data from '../data';
import { Store } from '../store/Store';

export default function SignUp() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();
    const { state, dispatch:myDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(()=>{
        if(userInfo){
            navigate("/");
        }
    },[]);

    const signUpHandler = async (e) => {
        e.preventDefault();
        if(firstname == "" || lastname=="" || name=="" || email=="" || password=="") {
            toast.error("Please fill inputs")
            return;
        }
        const req = {
            first_name: firstname,
            last_name: lastname,
            name: name,
            email: email,
            password: password
        }
        try {
            const res = await axios.post(`${data.apiBaseUrl}/signup`, req);
            if(res.data.status == "success"){
                navigate('/login');
            } 
        } catch (error) {
            // console.log(error.response.data.errors)
            toast.error("Please try to sign up again.");
        }
    }

    return (
        <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
            <Form className='text-white'>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter First Name"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Last Name"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter User Name"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                </Form.Group>

                <Button variant="primary" type="button" onClick={signUpHandler}>
                    Sign Up
                </Button>
            </Form>
        </Col>
        <Col sm={3}></Col>
    </Row>
    )
}