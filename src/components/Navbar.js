import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button';
import { useMoralis } from "react-moralis";
/*
const _eViralBalance = await Moralis.Web3.getERC20({tokenAddress: '0x7CeC018CEEF82339ee583Fd95446334f2685d24f'});
const eBalance = _eViralBalance.balance/(10**18);
const container = document.getElementById("eViralBalance");
const container = document.getElementById("eViralBalance");
container.innerHTML = (eBalance.toFixed(3) + " Bil " + " ");
*/


function Navbar() {
    const { authenticate, isAuthenticated, user, logout} = useMoralis();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <=960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton() 
    }, []);

    window.addEventListener('resize', showButton);


    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">                         
                    <i className="fas fa-dna"></i>
                    &#160;EVIRAL                   
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/news' className='nav-links' onClick={closeMobileMenu}>
                                News
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/partners' className='nav-links' onClick={closeMobileMenu}>
                                Partners
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li> 
                        <li className='nav-item'>
                            <div className='eviralBalance'>
                            </div>
                        </li>                                       
                    </ul>
                    {button && <Button buttonStyle='btn--outline' onClick={() => logout()}>Log Out</Button>}
                </div> 
            </nav>
        </>

    )
}

export default Navbar;
