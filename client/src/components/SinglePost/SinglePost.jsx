import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context/Context';
import './SinglePost.css';

const SinglePost = () => {
    const location = useLocation(); // react router hook that gets the pathname
    const path = location.pathname.split("/")[2]; // spliting the post Id from the pathname

    const [post, setPost] = useState({});

    const { user } = useContext(Context);

    const PF = "https://react-blog-api-ng.herokuapp.com/images/";

    const [title, setTitle] = useState("");

    const [desc, setDesc] = useState("");

    const [updateMode, setUpdateMode] = useState(false);
    
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`https://react-blog-api-ng.herokuapp.com/api/posts/${path}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }

        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://react-blog-api-ng.herokuapp.com/api/posts/${path}`, {
                data: { username: user.username }
            });

            window.location.replace("/");
        } catch (error) {
            
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`https://react-blog-api-ng.herokuapp.com/api/posts/${path}`, {
                username: user.username,
                title,
                desc
            });

            //window.location.reload();
            setUpdateMode(false);
        } catch (error) {
            
        }
    }

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo ? (
                    <img src={PF + post.photo} alt="Single-Post" className="singlePostImg" />
                ) : (
                    <img className='singlePostImg' src={PF + "default.jpg" } alt="post" />
                )}
                {
                    updateMode ? <input 
                        className="singlePostTitleInput" 
                        type="text" 
                        value={title} 
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    /> : (

                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && 
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                                </div>
                            }
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>
                        Author:  
                        <Link className='link' to={`/?user=${post.username}`}>
                            <b> {post.username}</b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ? (
                        <textarea 
                            className='singlePostDescInput' 
                            value={desc} 
                            onChange={(e) => setDesc(e.target.value)} 
                        />
                    ) : (
                        <p className='singlePostDesc'>{desc}</p>
                    )
                }
                {updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
}

export default SinglePost;
