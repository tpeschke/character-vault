import React from 'react'
let characterCopy

function updateAttribute(value, type) {
    characterCopy[type] = value
}

export default function CharacterEditor({ character, updateCharacter, downloadMode }) {
    characterCopy = { ...character }
    let { name, race, primarya, secondarya, level } = characterCopy
    return (
        <div>
            <div id="pdf" className='pdfViewStylings'>
                <div className="pageOne pageBase pageViewStylings">
                    <input className="nameLocation" type="text" placeholder="Character Name" defaultValue={name} onChange={event => updateAttribute(event.target.value, "name")} />
                    <input className="raceLocation" type="text" placeholder="Race" defaultValue={race} />
                    <input className="primaryLocation" type="text" placeholder="Primary Archetype" defaultValue={primarya} />
                    <input className="secondaryLocation" type="text" placeholder="Secondary Archetype" defaultValue={secondarya} />
                    <input className="levelLocation" type="text" placeholder="Level" defaultValue={level} />
                </div>
                <div className="pageTwo pageTwoMargin pageBase pageViewStylings">

                </div>

            </div>
            <div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                <div></div>
                <i onClick={_=>updateCharacter(characterCopy)} className="fas fa-save"></i>
            </div>
        </div>
    )
}