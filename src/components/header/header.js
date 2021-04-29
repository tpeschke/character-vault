import React from 'react';
import "./header.css";
import { Link } from 'react-router-dom'

export default function Header(Page) {
    return props =>
        <div>
            <div className="headerShell">
                <Link to="/"><h1>Bonfire Character Vault</h1><p className="beta">(beta)</p></Link>
                <Link to="/"><i className="fas fa-home"></i></Link>
            </div>
            <Page {...props} />
        </div>
}