import React, { useState } from "react";
import "./navbar.scss"
import { MdInsertEmoticon, MdMenuOpen, MdClose } from "react-icons/md";
import { SliderData } from "./sliderData";
import { Link } from "react-router-dom";
import logo from '../../Images/Logo.png'


export default function Navbar({ fontColor = "white" }) {


    const [sidebar, setSidebar] = useState(false);


    const toggleSidebar = () => setSidebar(() => !sidebar)


    return (
        <>
            <header className="navBar-container">
                {/* <i className ="icon-info"></i> */}
                <div className='header-inner'>
                    <div className='logo'>
                        <Link to='/home'>
                            <img src={logo} alt="Logo" className="iconLogo" width="50" height="50" style={{ marginLeft: '10px' }} />
                            <div className="Logo_txt"> Lumi </div> </Link>
                        <p className="headerText" style={{ color: fontColor, fontSize: "12px", }}  >Enabling Young Minds To Change The World</p>
                    </div>
                    <div className="Lumi-Mobile-txt" style={{ display: 'none' }}>LUMI</div>
                    {/* <div className={sidebar ? `navMenuOpen` : `fill`} > */}
                    <nav className={sidebar ? `fill active` : `fill`} >
                        <ul className="listContainer">
                            {/* <li>
                            <a href='/'>ABOUT ME</a>
                        </li> */}
                            <li className="navLink list">
                                <Link to='/about' style={{ color: fontColor }}>About</Link>
                            </li>
                            <li className="navLink list">
                                <Link to='/inovations' style={{ color: fontColor }}>Inovations</Link>
                            </li>
                            <li className='navLink list'>
                                <Link to='/login' style={{ color: fontColor }}>Login</Link>
                            </li>



                            <li className="menu list">
                                <Link to=""> <MdMenuOpen className="menuIcon" color={fontColor} size={30} onClick={toggleSidebar} /> </Link>
                            </li>


                        </ul>
                        <div className="nav-menu" style={sidebar ? { left: '90vw' } : { left: '100vw' }}  >
                            <MdClose className="exitMenu menuIcon" color="#000000" size={40} onClick={toggleSidebar} />
                            <ul className="navbar-toggle">
                                <div className="navbar-container">
                                    {SliderData.map((item, index) => {
                                        return (
                                            <li key={index} className={item.cName}>
                                                <Link to={item.path} >
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </div>
                            </ul>
                        </div>
                    </nav>
                    {/* </div> */}

                </div>
            </header>


        </>
    );
}
