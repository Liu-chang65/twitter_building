import React, { useState } from "react";
import CommentForm from "./CommentForm";
import {  Row, Col, Form, Button } from 'react-bootstrap';

export default function Comment(props) {
    const [isShow, setIsShow] = useState(false);
    const handleReplyShow = () => {
        if(isShow){
            setIsShow(false);
        } else {
            setIsShow(true);
        }
    }
    return (
        <div className="comment border m-4 p-5">
            <div className="comment-container">
                <div className="comment-author">@{props.comment.name}</div>
                <div>{new Date(props.comment.created_at).toLocaleDateString()}</div>
                <div className="comment-text">{props.comment.body}</div>
                <div className="comment-actions">
                    <Button variant="outline-success" className='mt-2 mb-2' onClick={handleReplyShow}>Reply</Button>
                    {
                        isShow && (
                            <CommentForm postId={props.postId} parent_id={props.parent_id}  submitLabel="Reply"/>
                        )
                    }
                    
                </div>
                {props.replies.length >0 && (
                    <div className="replies">
                        {props.replies.map((reply) => (
                            <Comment comment={reply} parent_id={reply.id} postId={props.postId} key={reply.id} replies={[]} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}