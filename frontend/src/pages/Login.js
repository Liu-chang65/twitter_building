import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Store } from '../store/Store';
import { serviceLogin } from '../service/Service';

export default function Login() {
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

    const loginHandler = async (e) => {
        e.preventDefault();
        if(email=="" || password=="") {
            toast.error("Please fill inputs")
            return;
        }
        const req = {
            email:email,
            password:password
        }
        const data = await serviceLogin(req);
        if(data.status === "success"){
            myDispatch({type: 'USER_LOGIN', payload: data.content});
            localStorage.setItem('userInfo', JSON.stringify(data.content))
            navigate("/");
        } else if (data.status === "login_failed"){
            toast.error(data.msg)
        }  
    }

    return (
        <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
                <Form className='text-white'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={loginHandler}>
                        Login
                    </Button>
                </Form>
            </Col>
            <Col sm={3}></Col>
        </Row>
        
    )
}