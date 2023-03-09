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
            <ListGroup.Item action href="/profile">
                Profile
            </ListGroup.Item>
            <ListGroup.Item action href="/twitter">
                Twitter
            </ListGroup.Item>
        </ListGroup>
        // <Nav defaultActiveKey="/" className="flex-column">
        //     <Nav.Link href="/">Home</Nav.Link>
        //     <Nav.Link href="/notification">Notifications</Nav.Link>
        //     <Nav.Link href="/profile">Profile</Nav.Link>
        //     <Nav.Link href="/twitter">Twitter</Nav.Link>
        //   </Nav>
    )
}