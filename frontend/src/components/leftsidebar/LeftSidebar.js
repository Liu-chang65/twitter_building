import React from 'react';
import { ListGroup, Nav } from 'react-bootstrap';

export default function LeftSidebar() {
    return (
        <ListGroup>
            <ListGroup.Item action href="/">
                Home
            </ListGroup.Item>
            <ListGroup.Item action href="/notification">
                Notifications
            </ListGroup.Item>
            <ListGroup.Item action href={`/profile/${JSON.parse(localStorage.getItem('userInfo')).user_name}`}>
                My Profile
            </ListGroup.Item>

        </ListGroup>

    )
}