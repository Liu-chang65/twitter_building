import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import dateFormat from 'dateformat';
import {Calendar} from 'react-bootstrap-icons';

export default function UserBox(props) {
    const joinDate = dateFormat(props.user.created_at, "dddd, mmmm dS, yyyy");
    return (
        <Card className='m-2'>
            <Card.Body>
                <Card.Title>{props.user.first_name} {props.user.last_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">@{props.user.name}</Card.Subtitle>
                <Card.Text>
                    <Calendar/> Joined {joinDate}
                </Card.Text>
                <Card.Link href="#">0 Following</Card.Link>
                <Card.Link href="#">0 Followers</Card.Link>
            </Card.Body>
        </Card>      
    )
}