import React from 'react'

export default function Abilities({ abilities }) {
    let { abilitiesone, abilitiestwo, abilitiesthree, removedability } = abilities
    return (
        <div>
            <p className="abilitiesoneLocation abilitiesoneAdjustment">{abilitiesone}</p>
            <p className="abilitiestwoLocation abilitiestwoAdjustment">{abilitiestwo}</p>
            <p className="abilitiesthreeLocation abilitiesthreeAdjustment">{abilitiesthree}</p>
            <p className="removedabilityLocation">{removedability}</p>
        </div>
    )
}