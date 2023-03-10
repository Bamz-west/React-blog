import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import './Settings.css';
import SideBar from '../../components/SideBar/SideBar';

const Settings = () => {

    const { user, dispatch } = useContext(Context);

    const PF = "https://react-blog-api-ng.herokuapp.com/images/";

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        dispatch({ type: "UPDATE_START" });

        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);

            updatedUser.profilePic = filename;

            try {
                await axios.post("https://react-blog-api-ng.herokuapp.com/api/upload", data);
            } catch (error) {
                
            }
        }
        try {
            const res = await axios.put(`https://react-blog-api-ng.herokuapp.com/api/users/${user._id}`, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    const handleDelete = async (e) => {

        try {
            const res = await axios.delete(`https://react-blog-api-ng.herokuapp.com/api/users/${user._id}`, {
                data: { userId: user._id }
            });

            dispatch({ type: "LOGOUT" });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <button className="settingsDeleteTitle" onClick={handleDelete}>Delete account</button>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        {!user.profilePic ? 
                            <img src={PF + "profile.jpg"} alt="profile" />
                            :
                            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="profile" />
                        }
                        <label htmlFor="fileInput">
                            <i className='settingsPPIcon far fa-user-circle'></i>
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{ display: 'none' }}
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} required />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile has been updated...</span>}
                </form>
            </div>
            <SideBar />
        </div>
    )
}

export default Settings;
