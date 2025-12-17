/*
    my teacher said to put something before the useState import but i forgot what it was lol
    ignore the above line

    Also there's a lot of general comments
*/
import {useState, useEffect} from "react";
import PFP from "../profilePicture.webp"

const NavBar = ({navLinks = []}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() =>{
        return localStorage.getItem("isLoggedIn") === "true" // This initializes the isLoggedIn state from local storage (extra credit #1)
    }); 
    // Checks local storage for login status
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false)
    const [activeLink, setActiveLink] = useState("Home") // The default active link is "Home" (extra credit #2)

    useEffect(() =>{
        localStorage.setItem("isLoggedIn", isLoggedIn); // Updates local storage when login status changes
    }, [isLoggedIn])

    useEffect(() =>{
        const hash = window.location.hash || "#home"; // Gets the current URL hash. EX: #about
        const match = navLinks.find(link => link.href === hash);

        if(match){
            setActiveLink(match.label);
        }
    }, [navLinks]);

    useEffect(() => {
        const handleKeyDown = (e) =>{
            if(e.key === "Escape"){ // If you press the escape key,
                setMenuOpen(false); // Close the mobile menu
                setProfileOpen(false); // Close the profile dropdown
                console.log("Escape key pressed") // Console log for testing
            }
        }

        document.addEventListener("keydown", handleKeyDown); // Adds an event listener for keydown events
        return () => document.removeEventListener("keydown", handleKeyDown); // Cleans up after itself
    }, [])

    useEffect(() => {
        const handleResize = () =>{
            if(window.innerWidth > 768){ // If the window is resized to be larger than 768px,
                setMenuOpen(false); 
                setProfileOpen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    // This is meant to fix issues with resizing the window while menus are open

    const handleLogout = () =>{
        console.log("User logged out"); // Logs out the user
        setIsLoggedIn(false);
        setProfileOpen(false);
    }

    const handleAccountSettings = () =>{ // This is a placeholder function
        console.log("Account settings clicked");
        setProfileOpen(false);
    }
    const navItems = navLinks.map((link) =>(
        <li key={link.id}>
            <a 
                href={link.href}
                className={activeLink === link.label ? "active" : ""}
                onClick={() =>{
                    setActiveLink(link.label); 
                    setMenuOpen(false);
                }}
            > {/* This adds the active class if the link is selected */}
                {link.label}
            </a>
        </li>
    ));

    return(
        <nav>
            <div className="logo">My App</div>

            <button 
                className="menu-toggle" 
                aria-label="Toggle nav menu" 
                aria-expanded={menuOpen} 
                aria-controls="main-navigation" 
                onClick={() => setMenuOpen(!menuOpen)}
            > {/* This button is for mobile only */}
                ☰
            </button>

            <div id="main-navigation" className={`nav-panel ${menuOpen ? "open" : ""}`}> 
            {/* This div contains the nav items and is hidden/shown based on menuOpen state (only applies for mobile) */}

                <ul>{navItems}</ul>

                {!isLoggedIn &&( // Logged out view
                    <div className="auth-btns">
                        <button onClick={() => setIsLoggedIn(true)}>Login</button> {/* Button for logging in */}
                        <button className="signUp">Sign Up</button> {/* This is a placeholder button and does absolutely nothing */}
                    </div>
                )}

                {isLoggedIn &&( // Logged in view
                    <div className="profile-menu">
                        <button className="profile-btn" 
                            aria-label="Profile menu" 
                            aria-expanded={profileOpen} 
                            aria-controls="profile-dropdown" 
                            onClick={() => setProfileOpen(!profileOpen)}
                        >
                            <img src={PFP} alt="User profile"/>
                        </button>

                    {profileOpen && ( // PFP dropdown menu
                        <ul id="profile-dropdown" role="menu">
                            <li role="menuitem">
                                <button onClick={handleAccountSettings}>Account Settings</button> {/* This is a placeholder button and only does a console.log */}
                            </li>
                            <li role="menuitem">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;