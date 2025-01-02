import React from 'react'
import './abilities.css'

export default function Abilities({ abilities, editing }) {
    let { abilitiesone, abilitiestwo, abilitiesthree, removedability, updateAttribute } = abilities

    function createDivs(number) {
        let divs = []
        for (let i = 0; i < number; i++) {
            divs.push((<div key={`abilitiesdivs${i}`}></div>))
        }
        return divs
    }

    function formatAbility(abilities, updateName, limit) {
        if (editing && updateName) {
            return (
                <textarea className="abilities" defaultValue={abilities} onChange={event => updateAttribute(event.target.value, updateName)} maxLength={limit}></textarea>
            )
        }
        return (
            <p className="abilities">{abilities}</p>
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
                        {formatAbility(abilitiesone, 'abilitiesone', "300")}
                    </div>
                    <div className="abilityShell">
                        <div className="contactStriping">
                            {createDivs(8)}
                        </div>
                        {formatAbility(abilitiestwo, 'abilitiestwo', "300")}
                    </div>
                </div>
            </div>
            <div className='drawbacksShell'>
                <h1>Burdens, Injuries & Drawbacks</h1>
                <div className="drawbackInnerShell">
                    <div className="contactStriping">
                        {createDivs(8)}
                    </div>
                    {formatAbility(abilitiesthree, 'abilitiesthree', "300")}
                </div>
                <div className="removedAbilityShell">
                    <h2>Removed Ability</h2>
                    {editing ? (
                        <input className="removedabilityLocation" type="text" defaultValue={removedability} onChange={event => updateAttribute(event.target.value, "removedability")} />
                    ) : (
                        <p className="removedabilityLocation">{removedability}</p>
                    )}
                </div>
            </div>
        </div>
    )
}