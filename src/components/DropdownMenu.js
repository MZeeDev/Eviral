import './DropdownMenu.css';

function DropdownMenu(props) {

    function DropdownItem(props) {
        return (
            <a href="#" className="dropdown-item">
                <span className="dropdown-icon">{props.leftIcon}</span>
                {props.children}
                <span className="dropdown-right-icon">{props.rightIcon}</span>
            </a>
        )
    }

    return (
        <div className="dropdown">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>{props.balance}</DropdownItem>
            <DropdownItem>{props.button}</DropdownItem>
        </div>
    )
}

export default DropdownMenu;