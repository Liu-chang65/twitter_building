import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { serviceGetComments } from "../../service/Service";

export default function Comments(props) {
    const [backendComments, setBackendComments] = useState([]);
    const rootComments = backendComments.filter((item) => item.parent_id === 0);

    const getReplies = (commentId) =>{
        return backendComments.filter((item) => item.parent_id === commentId).sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    }

    const addComment = () => {

    }
    const getComments = async () => {
        const data = await serviceGetComments(props.postId);
        if(data.status === "get_comments_success"){
            setBackendComments([...data.data]);
        }
    }

    useEffect(()=> {
        getComments();
    }, [])
    console.log(backendComments);
    return (
        <div className="comments p-3">
            {/* <div className="comments-title">Comments</div> */}
            <div className="comment-form-title">Write Comment</div>
            <div className="comment-form mb-5">
                <CommentForm postId={props.postId} parent_id="0" handleSubmit={addComment} submitLabel="Write"/>
            </div>
            
            <div className="comments-container ">
                {
                    rootComments.map((rootComment) => (
                        <Comment 
                            key={rootComment.id}
                            postId={props.postId}
                            parent_id={rootComment.id}
                            comment={rootComment}
                            replies={getReplies(rootComment.id)}
                        />
                    ))
                }
            </div>
        </div>
    )
}