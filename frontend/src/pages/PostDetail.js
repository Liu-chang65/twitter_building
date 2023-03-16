
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';
import LeftSidebar from '../components/leftsidebar/LeftSidebar';
import { Store } from '../store/Store';
import axios from 'axios';
import data from '../data';
import PostItem1 from '../components/home/PostItem1';
import SpinBox from '../components/spinner/SpinBox';


export default function PostDetail() {
    const params = useParams();
    const { id } = params;
    const post_id = id.split("_")[0];

    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const {state, dispatch: myDispatch} = useContext(Store);
    const { userInfo } = state;

    const getOnePost = async () => {
        const headers = { 
            headers: {
                "Accept": "application/json",
                "Authorization" : `Bearer ${userInfo.access_token}`
            } 
        };
        try{
            const res = await axios.get(`${data.apiBaseUrl}/post/${post_id}`, headers);
            if(res.data.status == "get_one_post_success"){
                const p = res.data.data;
                setPost(p);
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
        getOnePost();

    }, [userInfo]);

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
            </Col>
        </Row>
    )
}