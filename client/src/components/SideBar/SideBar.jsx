import './SideBar.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SideBar = () => {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("https://react-blog-api-ng.herokuapp.com/api/categories");

            setCats(res.data);
        };

        getCats();
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img 
                    src="https://images.pexels.com/photos/10469465/pexels-photo-10469465.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                    alt="sidebar" 
                />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit minus veritatis blanditiis veniam, maxime corrupti perferendis similique vel possimus quos animi vero architecto nisi.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((cat) => (
                        <Link key={cat._id} className='link' to={`/?cat=${cat.name}`}>
                            <li className="sidebarListItem">{cat.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}

export default SideBar;
