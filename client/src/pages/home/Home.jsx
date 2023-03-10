import { useState, useEffect } from "react";
import axios from "axios"
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import SideBar from "../../components/SideBar/SideBar";
import "./Home.css";
import { useLocation } from "react-router-dom";

const Home = () => {

    const [posts, setPosts] = useState([]);

    const { search } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`https://react-blog-api-ng.herokuapp.com/api/posts/${search}`);
            setPosts(res.data);
        }

        fetchPosts();
    },[])

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <SideBar />
            </div>
        </>
    )
}

export default Home;
