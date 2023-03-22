import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import LeftSidebar from '../components/leftsidebar/LeftSidebar';
import PostForm from '../components/home/PostForm';
import { Store } from '../store/Store';
import PostItem from '../components/home/PostItem';
import SpinBox from '../components/spinner/SpinBox';
import { serviceGetAllPosts } from '../service/Service';
import AlertBox from '../components/spinner/AlertBox';
import { serviceGetFollowInfo } from '../service/Service';

export default function Home() {

    useEffect(()=>{
        // getAllPosts();
        // getFollowInfo();
        console.log('useEffect');
    },[]);

    const [posts, setPosts] = useState([]);
    const [dataStatus, setDataStatus] = useState("");
    const navigate = useNavigate();
    const {state, dispatch:myDispatch} = useContext(Store);

    const getAllPosts = async () => {

        const data = await serviceGetAllPosts();
        if(data.status === "get_all_posts_success"){
            setPosts([...data.data]);
            setDataStatus(data.status)
        }
    };

    const getFollowInfo = async () =>{
        const user_id = JSON.parse(localStorage.getItem('userInfo')).user_id;
        const data = await serviceGetFollowInfo(user_id);
        console.log(data);
        if(data.status === "get_follow_info_success"){
            localStorage.setItem('followInfo', JSON.stringify(data.data));
        }
    }
    

    return (
        <Row>
            <Col sm={3} className="bg-dark py-3">
                <LeftSidebar />
            </Col>
            <Col sm={9} className="content-contain text-white p-3">
                <PostForm />
                <hr />
                <Row className="all_post_container m-2 pt-3">
                    <Col>
                        {
                            dataStatus === "get_all_posts_success" ? 
                            (
                                posts.length?(
                                    posts.map((post, index) => (
                                        <PostItem post={post} key={index} />
                                    ))
                                    ) : (
                                        <AlertBox />        
                                    )    
                            ) : (
                                
                                <div className='text-center mt-5'>
                                    <SpinBox/>
                                </div> 
                            )
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
        
    )
}