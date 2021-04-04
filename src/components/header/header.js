import React from 'react';
import "./header.css";
import { Link } from 'react-router-dom'

export default function Header(Page) {
    return props =>
        <div>
            <div className="headerShell">
                Bonfire Character Vault (beta)
                <Link to="/"><i className="fas fa-home"></i></Link>
            </div>
            <Page {...props} />
        </div>
}