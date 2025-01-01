import React from 'react'
import './abilities.css'

export default function Abilities({ abilities, editing }) {
    let { abilitiesone, abilitiestwo, abilitiesthree, removedability, updateAttribute, drawback } = abilities

    function createDivs(number) {
        let divs = []
        for (let i = 0; i < number; i++) {
            divs.push((<div></div>))
        }
        return divs
    }
    
    if (editing) {
        return (
            <div className="abilitiesShell">
                <div className='ability-header'>
                    <h1>Class/Ancestral Abilities & Trainings</h1>
                    <h1>Burdens, Injuries, & Drawbacks</h1>
                </div>
                <div className="abilitiesContentShell">
                    <div className="abilityShell">
                        <div className="contactStriping">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <textarea className="abilitiesoneLocation abilitiesonetextArea" defaultValue={abilitiesone} onChange={event => updateAttribute(event.target.value, "abilitiesone")} maxLength={"300"}></textarea>
                    </div>
                    <div className="abilityShell">
                        <div className="contactStriping">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <textarea className="abilitiestwoLocation abilitiestwotextArea" defaultValue={abilitiestwo} onChange={event => updateAttribute(event.target.value, "abilitiestwo")} maxLength={"310"}></textarea>
                    </div>
                    <div className="abilityShell">
                        <div className="contactStriping">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className="removedAbilityShell">
                                <h2>Removed Ability</h2>
                                <input className="removedabilityLocation" type="text" defaultValue={removedability} onChange={event => updateAttribute(event.target.value, "removedability")} />
                            </div>
                        </div>
                        <textarea className="abilitiesthreeLocation abilitiesthreetextArea" defaultValue={abilitiesthree} onChange={event => updateAttribute(event.target.value, "abilitiesthree")} maxLength={"250"}></textarea>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="abilitiesShell">
            <div className='classShell'>
                <h1>Class/Ancestral Abilities & Trainings</h1>
                <div className='abilitiesContentShell'>
                    <div className="abilityShell">
                        <div className="contactStriping">
                            {createDivs(8)}
                        </div>
                        <p className="abilities">{abilitiesone}</p>
                    </div>
                    <div className="abilityShell">
                        <div className="contactStriping">
                            {createDivs(8)}
                        </div>
                        <p className="abilities">{abilitiestwo}</p>
                    </div>
                </div>
            </div>
            <div className='drawbacksShell'>
                <h1>Burdens, Injuries & Drawbacks</h1>
                <div className="drawbackInnerShell">
                    <div className="contactStriping">
                        {createDivs(8)}
                    </div>
                    <p className="abilities">{abilitiesthree}</p>
                </div>
                <div className="removedAbilityShell">
                    <h2>Removed Ability</h2>
                    <p className="removedabilityLocation">{removedability}</p>
                </div>
            </div>
        </div>
    )
}