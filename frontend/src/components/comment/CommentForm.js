import React, { useState } from "react";
import {  Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import { serviceCreateComment } from "../../service/Service";

export default function CommentForm(props) {
    const [content, setContent] = useState("");
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const createComment = async () => {
        if(!content) {
            toast.error('Please input Comment Content.');
            return;
        }
        const req = {
            post_id: props.postId,
            user_id: userInfo.user_id,
            parent_id: props.parent_id,
            name: userInfo.user_name,
            body: content
        }
        const data  = await serviceCreateComment(req);
        if(data.status === "creat_comment_success"){
            console.log(data);
            window.location.reload(false);
        }
    }

    return (
        <Form className='text-white mt-2'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={3} value={content} onChange={(e)=>{setContent(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="button"  className="float-end" onClick={createComment}>
                {props.submitLabel}
            </Button>
        </Form>
    )
}