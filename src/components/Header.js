import React from "react"
import { Link } from "react-router-dom";

function Header () {
    return (
        <>
            <header>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>Capturing Humanity: Self Portraits in Context</h1>
                </Link>
                <div className="menu">
                    <Link to="/#about" style={{ textDecoration: 'none' }}>
                        <p onClick={() => window.location.replace("/#about")}>About</p>
                    </Link>
                <Link to="/gallery" style={{ textDecoration: 'none' }}>
                        <p>Gallery</p>
                    </Link>
                </div>
            </header>
        </>
    )
}
export default Header;
