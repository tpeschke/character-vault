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
        <div>
            <p className="abilitiesoneLocation abilitiesoneAdjustment">{abilitiesone}</p>
            <p className="abilitiestwoLocation abilitiestwoAdjustment">{abilitiestwo}</p>
            <p className="abilitiesthreeLocation abilitiesthreeAdjustment">{abilitiesthree}</p>
            <p className="removedabilityLocation">{removedability}</p>
        </div>
    )
}