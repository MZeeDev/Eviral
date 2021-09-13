import React, {useState, useEffect} from 'react'
import { Link, Redirect } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import { useMoralis } from "react-moralis";
import roundLogo from '../img/roundlogo.png';
import eViralLogo from "../img/eViralLogo2.png";
import beViralLogo from "../img/beviral.png";
import avatar from '../img/defaultProfile.png';
import mmLogo from '../img/metamask.png';
import wcLogo from '../img/walletconnect.png';
import './DropdownMenu.css';
import './NavbarConnectMenu.css';
import Alert from './Alert';

function Navbar() {
    const { authenticate, isAuthenticated, user, logout, auth, Moralis} = useMoralis();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const [balance, setBalance] = useState(0);
    const [balanceBSC, setBalanceBSC] = useState(0);
    const [profilePic, setProfilePic] = useState(avatar);
    const [username, setUsername] = useState("Username");
    const [displayConnect, setDisplayConnect] = useState(true);
    

    const [ connectMenu, setOpenConnectMenu ] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const authenticateUserMM = async () =>{ 
        console.log(1);
        if(!isAuthenticated){
            try{
                await authenticate();
            } catch (error) {
                alert(error);
            }
            finally {
                if(isAuthenticated){
                    renderBalance();               
                    setProfilePic(user.attributes?.profilePic?._url);
                    setUsername(user.attributes?.username);  
                }
            }                  
        }
        setOpenConnectMenu(!connectMenu);
    }

    const authenticateUserWC = async () =>{
        if(!isAuthenticated){
            try{
                await authenticate({ provider: "walletconnect" });
            } catch (error) {
                alert(error);
            }
            finally {
                if(isAuthenticated){
                    renderBalance();               
                    setProfilePic(user.attributes?.profilePic?._url);
                    setUsername(user.attributes?.username);  
                }
            }                  
        }
        setOpenConnectMenu(!connectMenu);
    }

    const logoutUser = async () => {
        await logout();
        setDisplayConnect(true);
        setProfilePic(avatar);
        const goHome = () => {window.location.href="/"};
        goHome();
    }
    
    const renderBalance = async () => {
        const eViralBalance = await Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const beViralBalance = await Moralis.Web3.getERC20({chain:'bsc', tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
        const eBalance = eViralBalance.balance/(10**18);
        const bBalance = beViralBalance.balance/(10**18);
        const balance = (eBalance.toFixed(3) + " Bil");
        const bvBalance = (bBalance.toFixed(3) + " Bil");
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
        if (user) {
            setProfilePic(user.attributes?.profilePic?._url);
            setUsername(user.attributes.username);
            renderBalance();
          }
        }, [user]);

    window.addEventListener('resize', showButton);
        

    return (
        <>
            <nav className="navbar">
                <div className="navbar-nav">
                <ul className="navbar-logo">
                    <Link to="/" className="navbar-logo">                         
                        <img className="roundLogo" src={roundLogo} alt="" />                  
                    </Link>                                      
                </ul>

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
                            <Link to='/profiles' className='nav-links' onClick={closeMobileMenu}>
                                <i class="fas fa-people-arrows"></i>
                            </Link>
                        </li>
                        {user &&
                        <li className='nav-item' onClick={closeMobileMenu}>
                            <Link to='/chat' className='nav-links' >
                                <i class="far fa-comments"></i>
                            </Link>
                        </li>
                        }
                        {/* <li className='nav-item'>
                            <Link to='/platform' className='nav-links' onClick={closeMobileMenu}>
                                <i class="fas fa-toolbox"></i>
                            </Link>
                        </li> */}
                    </ul>
                
                    
                <div className="navbar-user">
                    <li className='nav-item'>                        
                        <div className="avatarPic-wrapper">
                            <img className="avatarPic" src={profilePic}/>
                        </div>                                                
                    </li>
                    <li className='nav-item'>
                        { isAuthenticated && 
                        <div className="caret">
                            <i class="fas fa-caret-down" onClick={() => {setDropdown(!dropdown)}}>
                                {dropdown && 
                                <div className="dropdown">
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
                                    <Link to="/myprofile" className="dropdown-item" >
                                        <span className="dropdown-icon">
                                        <i class="far fa-user"></i>
                                        </span>
                                        My Profile
                                    </Link>
                                    
                                    <Link to="/chat" className="dropdown-item">
                                        <span className="dropdown-icon">
                                        <i class="fas fa-comments"></i>
                                        </span>
                                        Messages
                                    </Link>
                                    
                                    <li className="dropdown-logout">
                                        <button className="btn1  logout-btn" onClick={() => {setDropdown(!dropdown)}}>Close</button>                                            
                                            <button className="btn2 logout-btn" onClick={() => logoutUser()}>
                                            Log&nbsp;Out
                                            <i class="fas fa-sign-out-alt"></i>
                                        </button>                                        
                                    </li>
                                </div>                                 
                                }
                            </i>
                        </div>
                        }
                    </li>
                    { !isAuthenticated && <button className='btn1'  onClick={() => setOpenConnectMenu(true)}>
                        Connect
                    </button>  } 
                    { connectMenu &&
                    <div className="connectMenu-background">
                        <div className="connectMenu-container">
                            <div className="connectMenu-wrapper">
                                <div className="connectMenu-title">
                                    <h3>Connect with Web3</h3>
                                </div>
                                <div className="connectMenu-options">
                                    <div className="connectMenu-metamask">
                                        
                                        <button  className="connectMenu-btn"onClick={() => authenticateUserMM()}><img className="metamask-logo" src={mmLogo} /></button>
                                    </div>
                                    <div className="connectMenu-walletConnect">
                                        <button className="connectMenu-btn"  onClick={() => authenticateUserWC()}><img className="walletconnect-logo" src={wcLogo} /></button>
                                    </div>
                                </div>
                                <div className="connectMenu-footer">
                                    <button  onClick={() => setOpenConnectMenu(!connectMenu)}>CLOSE</button>
                                </div>
                            </div>
                        </div>                        
                    </div>
                    }                                     
                </div>                                                 
                </div>
                                          
            </nav>
            
        </>
    )
}

export default Navbar;
