import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { serviceRePost } from '../../service/Service';

export default function PostItem(props) {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const rePost = async () => {
        const req = {
            'user_id':userInfo.user_id,
            'first_name':userInfo.user_first_name,
            'last_name':userInfo.user_last_name,
            'name':userInfo.user_name,
            'parent_id':props.post.user_id,
            'content':props.post.content
        }
        const data = await serviceRePost(req);
        if(data){
            window.location.reload(false);
        }      
    }

    return (
        <Card className='m-2'>
            <Card.Body>
                <Card.Link href={`/profile/${props.post.name}`}><Card.Title>{props.post.first_name} {props.post.last_name} @{props.post.name}</Card.Title></Card.Link>
                <Card.Link href={`/post/detail/${props.post.id}_${props.post.slug}`}>
                    <Card.Text>
                        {props.post.content}
                    </Card.Text>
                </Card.Link>
                <Button variant="outline-info" className='m-2' onClick={rePost}>Repost</Button>
                <Button variant="outline-success" className='m-2'>Comment</Button>
            </Card.Body>
        </Card>      
    )
}