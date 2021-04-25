import React from 'react'
import axios from 'axios'

export default function modal () {

    return (
        <div id="overlay">
            <div className="modelBody">
                <h5>Sure You Want to Delete This Character?</h5>
                <p>You'll still be able to access it through the Vault.</p>
                <p>However, it'll be a pain to find and you won't be able to edit it.</p>
                <div className="modelButtons">
                    <button className="yes">Go For It</button>
                    <button className="no">Wait, Nevermind</button>
                </div>
            </div>
        </div>
    )
}