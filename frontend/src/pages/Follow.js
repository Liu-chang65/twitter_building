import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftSidebar from '../components/leftsidebar/LeftSidebar';
import { serviceGetFollowUsers } from '../service/Service';
import AlertBox from '../components/spinner/AlertBox';
import SpinBox from '../components/spinner/SpinBox';
import FollowUserBox from '../components/follow/FollowUserBox';
import { serviceGetFollowInfo } from '../service/Service';

export default function Follow() {
    const [followUsers, setFollowUsers] = useState([]);
    const [dataStatus, setDataStatus] = useState("");
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const followInfo = JSON.parse(localStorage.getItem('followInfo'));
    const getFollowUsers = async () => {
        const ids = userInfo.user_id;
        let str = ids;
        if(followInfo.followings_count){
            followInfo.followings.map((item) => {
                str += ","+item.follow_user_id;
            })
        }
        console.log(str)
        const req = {
            'following_users': str
        }
        const data = await serviceGetFollowUsers(req);
        console.log(data);
        if(data.status === "get_follow_users_success"){
            setFollowUsers([...data.data]);
            setDataStatus(data.status);
        }
    }


    useEffect(()=>{
        getFollowUsers();
    }, []);

    return (
        <Row>
            <Col sm={3} className="bg-dark py-3">
                <LeftSidebar />
            </Col>
            <Col sm={9} className="content-contain text-white p-3">
                {
                    dataStatus === "get_follow_users_success" ? 
                    (
                        followUsers.length?(
                            followUsers.map((user, index) => (
                                <FollowUserBox user={user} key={index} />
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