import React from 'react'

export default function Abilities({ abilities, editing }) {
    let { abilitiesone, abilitiestwo, abilitiesthree, removedability, updateAttribute } = abilities
    if (editing) {
        return (
            <div>
                <textarea className="abilitiesoneLocation abilitiesonetextArea" defaultValue={abilitiesone} onChange={event => updateAttribute(event.target.value, "abilitiesone")} maxLength={"300"}></textarea>
                <textarea className="abilitiestwoLocation abilitiestwotextArea" defaultValue={abilitiestwo} onChange={event => updateAttribute(event.target.value, "abilitiestwo")} maxLength={"310"}></textarea>
                <textarea className="abilitiesthreeLocation abilitiesthreetextArea" defaultValue={abilitiesthree} onChange={event => updateAttribute(event.target.value, "abilitiesthree")} maxLength={"250"}></textarea>
                <input className="removedabilityLocation" type="text" defaultValue={removedability} onChange={event => updateAttribute(event.target.value, "removedability")} />
            </div>
        )
    }
    return (
        <div className="abilitiesShell">
            <h1>Archetype Abilities & Trainings</h1>
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
                    <p className="abilitiesoneLocation abilitiesoneAdjustment">{abilitiesone}</p>
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
                    <p className="abilitiestwoLocation abilitiestwoAdjustment">{abilitiestwo}</p>
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
                            <p className="removedabilityLocation">{removedability}</p>
                        </div>
                    </div>
                    <p className="abilitiesthreeLocation abilitiesthreeAdjustment">{abilitiesthree}</p>
                </div>
            </div>
        </div>
    )
}