import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import { useMoralis } from "react-moralis";
import roundLogo from '../img/roundlogo.png';
import eViralLogo from "../img/eViralLogo2.png";
import beViralLogo from "../img/beviral.png";
import avatar from '../img/defaultProfile.png';
import './DropdownMenu.css';

function Navbar() {
    const { authenticate, isAuthenticated, user, logout, Moralis} = useMoralis();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const [balance, setBalance] = useState(0);
    const [balanceBSC, setBalanceBSC] = useState(0);
    const [profilePic, setProfilePic] = useState(avatar);
    const [username, setUsername] = useState("Username");
    const [displayConnect, setDisplayConnect] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const authenticateUser = async () =>{
        setDisplayConnect(!displayConnect);
        if(!isAuthenticated){
        await authenticate();
        renderBalance();
        }
    }
    const logoutUser = async () => {
        await logout();
        setDisplayConnect(!displayConnect);
        setProfilePic(avatar);
    }
    
    const renderBalance = async () => {
        const eViralBalance = await Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const beViralBalance = await Moralis.Web3.getERC20({chain:'bsc', tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const eBalance = eViralBalance.balance/(10**18);
        const bBalance = beViralBalance.balance/(10**18);
        const balance = (eBalance.toFixed(3) + " Bil " + " ");
        const bvBalance = (bBalance.toFixed(3) + " Bil " + " ");
        setBalance(balance);
        setBalanceBSC(bvBalance);
    }

    const showButton = () => {
        if(window.innerWidth <=960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };           

    useEffect(() => {
        showButton();
        renderBalance();
        if (user) {
            setProfilePic(user.attributes?.profilePic?._url);
            setUsername(user.attributes.username);
          }
        }, [user]);

    window.addEventListener('resize', showButton);
        

    return (
        <>
            <nav className="navbar">
                <ul className="navbar-logo">
                    <Link to="/" className="navbar-logo">                         
                        <img className="roundLogo" src={roundLogo} alt="" />                  
                    </Link>                                      
                </ul>

                <ul className="navbar-nav">
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>                        
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                <i class="fas fa-home"></i>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                                <i class="fas fa-tasks"></i>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/partners' className='nav-links' onClick={closeMobileMenu}>
                                <i class="fas fa-people-arrows"></i>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/partners' className='nav-links' onClick={closeMobileMenu}>
                                <i class="fas fa-toolbox"></i>
                            </Link>
                        </li>
                    </ul>
                </ul>
                    
                <ul className="navbar-user">
                    <li className='nav-item'>                        
                        <div className="avatarPic-wrapper">
                            <img className="avatarPic" src={profilePic}/>
                        </div>                                                
                    </li>
                    <li className='nav-item'>
                        { !displayConnect && <div className="caret">
                            <i class="fas fa-caret-down" onClick={() => {setDropdown(!dropdown)}}>
                                {dropdown && 
                                <ul className="dropdown">
                                    <li className="dropdown-item-user">
                                        <span className="dropdown-icon"></span>
                                        <img className="avatarPic" src={profilePic}/>
                                        <span className="dropdown-username"> {username}</span>
                                        <span className="dropdown-right-icon"></span>
                                    </li>
                                    <li className="dropdown-item">
                                        <div className="wallet-balances">
                                            <div className="showBalance">
                                            {balance}
                                            <img className="eViralLogo-Dropdown" src={eViralLogo} alt="" ></img>
                                            </div>
                                            <div className="showBalanceBSC">
                                            {balanceBSC}
                                            <img className="eViralLogo-Dropdown" src={beViralLogo} alt="" ></img>
                                            </div>
                                        </div>                                     
                                    </li>                                
                                    <Link className="dropdown-item">
                                        <span className="dropdown-icon">
                                        <i class="fas fa-tools"></i>
                                        </span>
                                        My Projects
                                    </Link>
                                    <Link to="/myprofile" className="dropdown-item">
                                        <span className="dropdown-icon">
                                        <i class="far fa-user"></i>
                                        </span>
                                        My Profile
                                    </Link>
                                    <li className="dropdown-logout">
                                        <button className="btn2" onClick={() => logoutUser()}>Log Out<i class="fas fa-sign-out-alt"></i></button>
                                    </li>
                                </ul>                                 
                                }
                            </i>
                        </div>
                    }
                    </li>                                                 
                    { displayConnect && <button className='btn1'  onClick={() => authenticateUser()}>
                        Connect
                    </button>  }                                      
                </ul>
                                          
            </nav>
        </>
    )
}

export default Navbar;
