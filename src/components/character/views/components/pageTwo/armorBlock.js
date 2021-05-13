import React from 'react'

export default function ArmorBlock({ armor }) {
    let { armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbaseencumb, armorbaserecovery, armorbaseinit, 
        armortrainingdef, armortrainencumb, armortrainrecovery, armortraininit, armormiscdef, updateAttribute, armormiscencumb,
        armormiscrecovery, armormiscinit, armorRecovery } = armor
    return (
        <div>
            <p className="armornameLocation">{armorname}</p>
            <p className="armordrLocation">{armordr}</p>
            <p className="armorskilladjLocation">{armorskilladj}</p>
            <p className="armorbonusLocation">{armorbonus}</p>

            <p className="armorbasedefLocation">{armorbasedef}</p>
            <p className="armorbaseencumbLocation">{armorbaseencumb}</p>
            <p className="armorbaserecoveryLocation">{armorbaserecovery}</p>
            <p className="armorbaseinitLocation">{armorbaseinit}</p>

            <p className="armortrainingdefLocation">{armortrainingdef}</p>
            <p className="armortrainencumbLocation">{armortrainencumb}</p>
            <p className="armortrainrecoveryLocation">{armortrainrecovery}</p>
            <p className="armortraininitLocation">{armortraininit}</p>

            <input className="armormiscdefLocation" type="number" defaultValue={armormiscdef} onBlur={event => updateAttribute(event.target.value, "armormiscdef")} />
            <input className="armormiscencumbLocation" type="number" defaultValue={armormiscencumb} onBlur={event => updateAttribute(event.target.value, "armormiscencumb")} />
            <input className="armormiscrecoveryLocation" type="number" defaultValue={armormiscrecovery} onBlur={event => updateAttribute(event.target.value, "armormiscrecovery")} />
            <input className="armormiscinitLocation" type="number" defaultValue={armormiscinit} onChange={event => updateAttribute(event.target.value, "armormiscinit")} />

            <p className="armortotaldefLocation">{armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0}</p>
            <p className="armortotalencumbLocation">{armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0}</p>
            <p className="armortotalrecoveryLocation">{armorRecovery}</p>
            <p className="armortotalinitLocation">{armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0}</p>
        </div>
    )
}