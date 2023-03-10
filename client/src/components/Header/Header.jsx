import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className='headerTitleSm'>React &amp; Node</span>
                <span className='headerTitleLg'>Blog</span>
            </div>
            <img 
                className='headerImg' 
                src="https://images.pexels.com/photos/10489554/pexels-photo-10489554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="header" 
            />
        </div>
    )
}

export default Header;
