import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default function PostItem1(props) {

    return (
        <Card className='m-2'>
            <Card.Body>
                <Card.Link href={`/profile/${props.post.name}`}><Card.Title>{props.post.first_name} {props.post.last_name} @{props.post.name}</Card.Title></Card.Link>
                <Card.Text>
                    {props.post.content}
                </Card.Text>
            </Card.Body>
        </Card>      
    )
}