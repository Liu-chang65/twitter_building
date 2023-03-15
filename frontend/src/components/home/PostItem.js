import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function PostItem(props) {
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.post.first_name} {props.post.last_name} @{props.post.name}</Card.Title>
                <Card.Text>
                    {props.post.content}
                </Card.Text>
            </Card.Body>
        </Card>      
    )
}