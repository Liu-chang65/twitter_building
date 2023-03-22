import axios from 'axios';
import data from '../data';

const userInfo =localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

const headers = { 
    headers: {
        "Accept": "application/json",
        "Authorization" : `Bearer ${userInfo.access_token}`
    } 
};

export const serviceLogin = async (req) => {
    try{
        const res = await axios.post(`${data.apiBaseUrl}/login`, req);
        return res.data;
    }catch(err){
        return false;
    }     
}

export const serviceSignUp = async (req) => {
    try {
        const res = await axios.post(`${data.apiBaseUrl}/signup`, req);
        return res.data;
    } catch (error) {
        return false
    } 
}

export const serviceGetAllPosts = async () => {
    try{
        const res = await axios.get(`${data.apiBaseUrl}/all_posts`, headers);
        return res.data;
    } catch(err){
        return false
    }
}

export const serviceCreatePost = async (req) => {
    try{
        const res = await axios.post(`${data.apiBaseUrl}/create_post`, req, headers);
        return res.data;
    } catch(err){
        return false
    }    
}

export const serviceRePost = async (req) => {
    try {
        const res = await axios.post(`${data.apiBaseUrl}/repost`, req, headers);
        return res.data;
    } catch(err){
        return false;
    }      
}

export const serviceGetOnePost = async (post_id) => {
    try{
        const res = await axios.get(`${data.apiBaseUrl}/post/${post_id}`, headers);
        return res.data;
    } catch(err){
        return false
    }   
}

export const serviceGetMyPosts = async (user_name) => {
    try{
        const res = await axios.get(`${data.apiBaseUrl}/myposts/${user_name}`, headers);
        return res.data;
    } catch(err){
        return false;
    }  
}

export const serviceGetFollowUsers = async (req) => {
    try{
        const res = await axios.post(`${data.apiBaseUrl}/follow_users`, req, headers);
        return res.data;
    } catch(err){
        return false;
    }  
}

export const serviceFollowHandler = async (req) => {
    try{
        const res = await axios.post(`${data.apiBaseUrl}/follow/add_follow_user`, req, headers);
        return res.data;
    } catch(err){
        return false;
    }  
}

export const serviceGetFollowInfo = async (user_id) => {
    try{
        const res = await axios.get(`${data.apiBaseUrl}/follow/get_follow_info/${user_id}`, headers);
        return res.data;
    } catch(err){
        return false;
    }  
}

export const serviceCreateComment = async (req) => {
    try{
        const res = await axios.post(`${data.apiBaseUrl}/create_comment`, req, headers);
        return res.data;
    } catch(err){
        return false;
    }  
}

export const serviceGetComments = async (post_id) => {
    try{
        const res = await axios.get(`${data.apiBaseUrl}/get_comments/${post_id}`, headers);
        return res.data;
    } catch(err){
        return false;
    }  
}
