import { Link } from "react-router-dom";
import './Post.css';

const Post = ({ post }) => {

    const PF = "https://react-blog-api-ng.herokuapp.com/images/";

    return (
        <div className='post'>
            {post.photo ? (
                <img className='postImg' src={PF + post.photo } alt="post" />
            ) : 
                <img className='postImg' src={PF + "default.jpg" } alt="post" />
            }
           <div className="postInfo">
               <div className="postCats">
                    {post.categories.map((cat) => (
                        <span className="postCat">{cat.name}</span>
                    ))}
               </div>
               <Link className="link" to={`/post/${post._id}`}>
                    <span className="postTitle">{post.title}</span>
               </Link>
               <hr/>
               <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
           </div>
           <p className='postDesc'>{post.desc}</p>
        </div>
    )
}

export default Post;
