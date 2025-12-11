import {useState} from "react";
import PFP from "../profilePicture.webp"

const NavBar = ({navLinks = []}) => {
    const [open, setOpen] = useState(false);

    const navItems = navLinks.map((link) =>(
        <li key={link.id}>
            <a href={link.href}>{link.label}</a>
        </li>
    ));

    return(
        <nav>
            <div id="login/Profile">
                <img id="profile" src={PFP} alt="Profile"/>
            </div>

            <button id="menuToggle" className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation menu" aria-expanded={open}>
                Toggle Menu
            </button>

            <ul className={open ? "" : "toggleHidden"}>
                {navItems}
            </ul>
        </nav>
    );
};

export default NavBar;