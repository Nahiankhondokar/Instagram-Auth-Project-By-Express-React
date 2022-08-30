import React, { useContext } from 'react';
import { FiSearch } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { FaGg, FaSafari } from "react-icons/fa";
import './TopBar.scss';
import AuthContext from '../../context/AuthContext';

const TopBar = () => {

    // constext
    const { user } = useContext(AuthContext);
    
  return (
    <div className='top-bar-container shadow-sm'>
        <div className="top-bar-wrapper">
            <div className="logo">
                <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
            </div>

            <div className="top-bar-search">
                <button><FiSearch /></button>
                <input type="text" placeholder='Search'/>
            </div>

            <div className="top-bar-menu">
                <ul>
                    <li><a href=""><AiFillHome /></a></li>
                    <li><a href=""><AiOutlineHeart /></a></li>
                    <li><a href=""><FaGg /></a></li>
                    <li><a href=""><FaSafari /></a></li>
                    <li><a href=""><GrAddCircle /></a></li>
                    <li><a href=""><img src={ user.photo ? user.photo : 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'} alt="" width={100}/></a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default TopBar;