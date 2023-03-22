
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';
import LeftSidebar from '../components/leftsidebar/LeftSidebar';
import { Store } from '../store/Store';
import axios from 'axios';
import data from '../data';
import PostItem from '../components/home/PostItem';
import SpinBox from '../components/spinner/SpinBox';
import UserBox from '../components/profile/UserBox';
import { serviceGetMyPosts } from '../service/Service';
import AlertBox from '../components/spinner/AlertBox';

export default function Profile() {
    const params = useParams();
    const { user_name } = params;
    const [dataStatus, setDataStatus] = useState("")
    const [posts, setPosts] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    const getMyPosts = async () => {
        const data = await serviceGetMyPosts(user_name)

        if(data.status === "get_my_posts_success"){
            setDataStatus(data.status)
            setPosts([...data.data]);
            setUser(data.user);
        }

    };

    useEffect(()=>{
        getMyPosts();

    }, []);

    return (
        <Row>
            <Col sm={3} className="bg-dark py-3">
                <LeftSidebar />
            </Col>
            <Col sm={9} className="content-contain text-white p-3">
                <Link to="/"><ArrowLeft size={56} /></Link>
                <hr/>
                <h2 className='m-2'>Profile Info</h2>
                <UserBox user={user}/>     
                <h2 className='m-2 mt-5'>Your Posts</h2>   
                { dataStatus === "get_my_posts_success" ? 
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
    )
}