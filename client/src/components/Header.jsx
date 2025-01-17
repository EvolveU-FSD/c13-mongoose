import TractorIcon from "./Tractor"

import "./Header.css"
import LoginBar from "./LoginBar"
import { useUser } from "../LoginContext"
import { Link } from "react-router"

export default function Header() {
    const user = useUser()
    
    return (
        <header>
            <div className="header-icon"><TractorIcon size={40}/>Tractorify</div>
            <nav className="header-nav">
                <Link to="/">Home</Link>
                <Link to="/tractors">Tractors</Link>
                { user && user.conversionId && <Link to="/my-project">My Project</Link> }
            </nav>
            <LoginBar/>
        </header>
    )
}