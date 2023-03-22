import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import dateFormat from 'dateformat';
import {Calendar} from 'react-bootstrap-icons';
import { serviceGetFollowInfo } from '../../service/Service';

export default function UserBox(props) {
    const joinDate = dateFormat(props.user.created_at, "dddd, mmmm dS, yyyy");
    const [following, setFollowing] = useState("");
    const [follower, setFollower] = useState("");
    console.log(props.user)
    const getFollowInfo = async () => {
        const data = await serviceGetFollowInfo(props.user.id);
        console.log("AAA")
        console.log(data);
        console.log("BBB")
        if(data.status === "get_follow_info_success"){
            setFollowing(data.data.followings_count);
            setFollower(data.data.followers_count);
        }
        
    }

    useEffect(()=> {
        getFollowInfo()
    } ,[])
    return (
        <Card className='m-2'>
            <Card.Body>
                <Card.Title>{props.user.first_name} {props.user.last_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">@{props.user.name}</Card.Subtitle>
                <Card.Text>
                    <Calendar/> Joined {joinDate}
                </Card.Text>
                <Card.Link href="#">{JSON.parse(localStorage.getItem('followInfo')).followings_count} Following</Card.Link>
                <Card.Link href="#">{JSON.parse(localStorage.getItem('followInfo')).followers_count} Followers</Card.Link>
            </Card.Body>
        </Card>      
    )
}