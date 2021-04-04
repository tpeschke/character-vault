import React from 'react'

export default function CharacterViewer (props) {
    let { name, race, primarya, secondarya, level } = props.character
    let { downloadMode } = props
    return (
        <div id="pdf" className={downloadMode ? '' : 'pdfViewStylings'}>
            <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                <p className="nameLocation">{name}</p>
                <p className="raceLocation">{race}</p>
                <p className="primaryLocation">{primarya}</p>
                <p className="secondaryLocation">{secondarya}</p>
                <p className="levelLocation">{level}</p>
            </div>
            <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>

            </div>
        </div>
    )
}