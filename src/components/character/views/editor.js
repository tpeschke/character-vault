import React from 'react'
import EditList from './components/editList'
import EditPairList from './components/editPairList'
let characterCopy

function updateAttribute(value, type) {
    characterCopy[type] = value
}

export default function CharacterEditor({ character, updateCharacter, downloadMode }) {
    characterCopy = { ...character }
    let { name, race, primarya, secondarya, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, primarylevel, secondarylevel, temperament, goals, devotions } = characterCopy
    return (
        <div>
            <div id="pdf" className='pdfViewStylings'>
                <div className="pageOne pageBase pageViewStylings">
                    <input className="nameLocation" type="text" defaultValue={name} onChange={event => updateAttribute(event.target.value, "name")} />
                    <input className="raceLocation" type="text" defaultValue={race} onChange={event => updateAttribute(event.target.value, "race")} />
                    <input className="primaryLocation" type="text" defaultValue={primarya} onChange={event => updateAttribute(event.target.value, "primarya")} />
                    <input className="primarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={primarylevel} onChange={event => updateAttribute(event.target.value, "primarylevel")} />
                    <input className="secondaryLocation" type="text" defaultValue={secondarya} onChange={event => updateAttribute(event.target.value, "secondarya")} />
                    <input className="secondarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={secondarylevel} onChange={event => updateAttribute(event.target.value, "secondarylevel")} />
                    <input className="levelLocation" type="number" min="1" defaultValue={level} onChange={event => updateAttribute(event.target.value, "level")} />
                    <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => updateAttribute(event.target.value, "crp")} />
                    <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onChange={event => updateAttribute(event.target.value, "excurrent")} />
                    <textarea className="drawbackLocation textArea" defaultValue={drawback} onChange={event => updateAttribute(event.target.value, "drawback")} maxLength="165"></textarea>

                    <input className="strLocation" type="number" max="20" min="1" defaultValue={str} onChange={event => updateAttribute(event.target.value, "str")} />
                    <input className="dexLocation" type="number" max="20" min="1" defaultValue={dex} onChange={event => updateAttribute(event.target.value, "dex")} />
                    <input className="conLocation" type="number" max="20" min="1" defaultValue={con} onChange={event => updateAttribute(event.target.value, "con")} />
                    <input className="intLocation" type="number" max="20" min="1" defaultValue={int} onChange={event => updateAttribute(event.target.value, "int")} />
                    <input className="wisLocation" type="number" max="20" min="1" defaultValue={wis} onChange={event => updateAttribute(event.target.value, "wis")} />
                    <input className="chaLocation" type="number" max="20" min="1" defaultValue={cha} onChange={event => updateAttribute(event.target.value, "cha")} />

                    <input className="honorLocation" type="number" max="25" min="0" defaultValue={honor} onChange={event => updateAttribute(event.target.value, "honor")} />
                    <input className="temperamentLocation" type="text" defaultValue={temperament} onChange={event => updateAttribute(event.target.value, "temperament")} />
                    <EditList stylings={{top: '358px', left: '20px', width: '224px'}} listArray={goals} limit={3} updateFunction={updateAttribute} type={"goals"}/>
                    <EditPairList stylings={{top: '442px', left: '20px', width: '224px'}} listArray={devotions} limit={3} updateFunction={updateAttribute} type={"devotions"} twoValues={true}/>

                    <input className="stressthresholdLocation" type="number" min="0" defaultValue={stressthreshold} onChange={event => updateAttribute(event.target.value, "stressthreshold")} />
                    <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => updateAttribute(event.target.value, "favormax")} />

                    <input className="criticalLocation" type="number" defaultValue={vitality} onChange={event => updateAttribute(event.target.value, "vitality")} />
                    <input className="sizemodLocation" type="number" min="0" defaultValue={sizemod} onChange={event => updateAttribute(event.target.value, "sizemod")} />
                    <input className="vitalityrollLocation" type="number" min="0" defaultValue={vitalityroll} onChange={event => updateAttribute(event.target.value, "vitalityroll")} />
                    <input className="vitalitydiceLocation" type="text" defaultValue={vitalitydice} onChange={event => updateAttribute(event.target.value, "vitalitydice")} />
                </div>
                <div className="pageTwo pageTwoMargin pageBase pageViewStylings">

                </div>

            </div>
            <div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                <div></div>
                <div className="right-corner-button corner-button">
                    <i onClick={_ => updateCharacter(characterCopy)} className="fas fa-save"></i>
                </div>
            </div>
        </div>
    )
}