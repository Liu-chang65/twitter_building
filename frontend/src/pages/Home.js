import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import LeftSidebar from '../components/leftsidebar/LeftSidebar';
import PostForm from '../components/home/PostForm';
import axios from 'axios';
import data from '../data';
import { Store } from '../store/Store';
import PostItem from '../components/home/PostItem';
import SpinBox from '../components/spinner/SpinBox';

export default function Home() {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const {state, dispatch: myDispatch} = useContext(Store);
    const { userInfo } = state;

    const getAllPosts = async () => {
        const headers = { 
            headers: {
                "Accept": "application/json",
                "Authorization" : `Bearer ${userInfo.access_token}`
            } 
        };
        try{
            const res = await axios.get(`${data.apiBaseUrl}/all_posts`, headers);
            if(res.data.status == "get_all_posts_success"){
                const p = res.data.data;
                setPosts([...p]);
            }
        } catch(err){
            if(err.response.data.message === "Unauthenticated."){
                localStorage.removeItem('userInfo');
                myDispatch({type: 'USER_SIGNOUT'});
                navigate('/login');
            }
        }
    };

    useEffect(()=>{
        getAllPosts();

    }, [userInfo]);

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
                        {posts.length?(
                            posts.map((post, index) => (
                                <PostItem post={post} key={index} />
                            ))
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