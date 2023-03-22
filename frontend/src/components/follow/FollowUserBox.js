import React,  {useEffect, useState} from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import {Calendar} from 'react-bootstrap-icons';
import { serviceFollowHandler } from '../../service/Service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { serviceGetFollowInfo } from '../../service/Service';

export default function FollowUserBox(props) {
    const joinDate = dateFormat(props.user.created_at, "dddd, mmmm dS, yyyy");
    const [isShow, setIsShow] = useState(true);
    const navigate = useNavigate();
    const followHandler = async () => {
        const req = {
            user_id:JSON.parse(localStorage.getItem('userInfo')).user_id,
            follow_user_id: props.user.id
        }
        const data = await serviceFollowHandler(req);
        if(data.status === "add_follow_user_success"){
            setIsShow(false);
            const data1 = await serviceGetFollowInfo(JSON.parse(localStorage.getItem('userInfo')).user_id)
            if(data1.status === "get_follow_info_success"){
                localStorage.setItem('followInfo', JSON.stringify(data1.data));
            }
            
        }
    }

    return (
        <>
            {isShow ? (
                    <Row className='m-2 border p-3'>
                        <Col sm={9} className="text-left">
                            <h5>{props.user.first_name} {props.user.last_name}</h5>
                            <h6>@{props.user.name}</h6>
                            <Calendar/> Joined {joinDate}
                        </Col>
                        <Col sm={3} className="d-flex justify-content-end align-items-center">
                            <Button variant="outline-info" className='m-2' onClick={followHandler}>Follow</Button>
                        </Col>
                    </Row>
                ) : (
                    <div className='d-none'></div>
                )
            }
        </>
    )
}