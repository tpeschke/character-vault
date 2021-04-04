import React from 'react'

export default function CharacterViewer (props) {
    let { name, race, primary, secondary, level } = props.character
    let { downloadMode } = props
    return (
        <div id="pdf" className={downloadMode ? '' : 'pdfViewStylings'}>
            <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                <p className="nameLocation">{name}</p>
                <p className="raceLocation">{race}</p>
                <p className="primaryLocation">{primary}</p>
                <p className="secondaryLocation">{secondary}</p>
                <p className="levelLocation">{level}</p>
            </div>
            <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>

            </div>
        </div>
    )
}