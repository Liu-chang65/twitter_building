
import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import {  Row, Col, Form, Button } from 'react-bootstrap';
import LeftSidebar from '../components/leftsidebar/LeftSidebar';
import { Store } from '../store/Store';
import { serviceGetOnePost } from '../service/Service';
import PostItem1 from '../components/home/PostItem1';
import SpinBox from '../components/spinner/SpinBox';
import Comments from '../components/comment/Comments';

export default function PostDetail() {

    const params = useParams();
    const { id } = params;
    const post_id = id.split("_")[0];

    const [post, setPost] = useState({});

    const getOnePost = async () => {

        const data = await serviceGetOnePost(post_id);
        if(data.status === "get_one_post_success"){
            setPost(data.data);
        }
    };

    useEffect(()=>{
        getOnePost();
    }, []);

    return (
        <Row>
            <Col sm={3} className="bg-dark py-3">
                <LeftSidebar />
            </Col>
            <Col sm={9} className="content-contain text-white p-3">
                <Link to="/"><ArrowLeft size={56} /></Link>
                <hr/>        
                {post ? (
                        <PostItem1 post={post}/>
                    ) : (
                        <div className='text-center mt-5'>
                            <SpinBox/>
                        </div>               
                    )                                
                }
                <hr />         
                <Row className='mb-5'>
                    <Col>
                        <Comments postId={post_id}/>
                    </Col>
                </Row> 
            </Col>
        </Row>
    )
}