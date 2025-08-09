import React from 'react';
import "./header.css";
import { Link } from 'react-router-dom'
import Footer from './footer/footer'

export default function Header(Page) {
    return props =>
        <div>
            <div className="headerShell">
                <Link to="/">
                    <img src="https://reliquary.stone-fish.com/static/media/WhiteFire.cc1e2e2c66d67f1b576f.png" alt="Bonfire TTRPG Logo" width="50" height="50" />
                    <h1>Bonfire Character Vault</h1>
                    <p className="beta">(beta)</p>
                </Link>
                <Link to="/"><i className="fas fa-home"></i></Link>
            </div>
            <Page {...props} />
            <Footer/>
        </div>
}