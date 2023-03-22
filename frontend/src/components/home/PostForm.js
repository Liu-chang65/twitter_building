import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { serviceCreatePost } from '../../service/Service';


export default function PostForm() {
    const [content, setContent]=useState("");
    const navigate = useNavigate();
    const userInfo = localStorage.getItem('userInfo');
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

        const data = await serviceCreatePost(req)
        if(data.status == "create_post_success"){
            window.location.reload(false);
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