import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import data from '../../data';
import { Store } from '../../store/Store';

export default function PostForm() {
    const [content, setContent]=useState("");
    const navigate = useNavigate();

    const {state, dispatch: myDispatch} = useContext(Store);
    const { userInfo } = state;

    const createPost = async (e) => {
        e.preventDefault();
        
        if(content == "") {
            toast.error('Empty Input');
            return;
        }

        const req = {
            'user_id':userInfo.user_id,
            'first_name':userInfo.user_first_name,
            'last_name':userInfo.user_last_name,
            'name':userInfo.user_name,
            'content':content
        }
        const headers = { 
            headers: {
                "Accept": "application/json",
                "Authorization" : `Bearer ${userInfo.access_token}`
            } 
        }

        try{
            const res = await axios.post(`${data.apiBaseUrl}/create_post`, req, headers);

            if(res.data.status == "create_post_success"){
                setContent("");
                navigate('/');
            }
        } catch(err){
            if(err.response.data.message === "Unauthenticated."){
                localStorage.removeItem('userInfo');
                myDispatch({type: 'USER_SIGNOUT'});
                navigate('/login');
            }
        }
        
    }

    return (
        <Row>
            <Col>
                <Form className='text-white'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>What's happen?</Form.Label>
                        <Form.Control as="textarea" rows={3} value={content} onChange={(e)=>{setContent(e.target.value)}}/>
                    </Form.Group>

                    <Button variant="primary" type="button"  className="float-end" onClick={createPost}>
                        Post
                    </Button>
                </Form>
            </Col>
        </Row>
        
    )
}