import React from 'react'

export default function CharacterEditor ({character}) {
    let { name, race, primarya, secondarya, level } = character
    return (
        <div id="pdf" className='pdfViewStylings'>
            <div className="pageOne pageBase pageViewStylings">
                <input className="nameLocation" type="text" placeholder="Character Name" value={name}/>
                <p className="raceLocation">{race}</p>
                <p className="primaryLocation">{primarya}</p>
                <p className="secondaryLocation">{secondarya}</p>
                <p className="levelLocation">{level}</p>
            </div>
            <div className="pageTwo pageTwoMargin pageBase pageViewStylings">

            </div>
        </div>
    )
}