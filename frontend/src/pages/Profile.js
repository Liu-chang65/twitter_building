
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


export default function Profile() {
    const params = useParams();
    const { user_name } = params;
    const [posts, setPosts] = useState({});
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const {state, dispatch: myDispatch} = useContext(Store);
    const { userInfo } = state;

    const getMyPosts = async () => {
        const headers = { 
            headers: {
                "Accept": "application/json",
                "Authorization" : `Bearer ${userInfo.access_token}`
            } 
        };
        try{
            const res = await axios.get(`${data.apiBaseUrl}/myposts/${user_name}`, headers);
            if(res.data.status == "get_my_posts_success"){
                setPosts([...res.data.data]);
                setUser(res.data.user);
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
        getMyPosts();

    }, [userInfo]);

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
    )
}