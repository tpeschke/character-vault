import React, { Component } from 'react';
import './character-viewer.css'
import Character from './character.js'

const downloadCharacter = async () => {
    let link = document.createElement('a')
        , fileName = 'character.pdf'
    // , adventureTitle = this.adventure.title.replace(/ /g, "+")
    link.href = "http://localhost:4000/characterName.pdf";
    link.download = fileName;
    link.click();
}

export default function CharacterViewer () {
    return (<div>
        <div>
            <p>Character Viewer</p>
            {/* ADD LOADING INDICATOR */}
            <button onClick={downloadCharacter}>download</button>
        </div>
        <div className="pdfBackground">
            <Character />
        </div>
    </div>)
}