import React from 'react';
import './character-viewer.css'
import Character from '../character/character.js'

export default function CharacterViewer () {
    return (<div>
        <div className="pdfBackground">
            <Character />
        </div>
    </div>)
}