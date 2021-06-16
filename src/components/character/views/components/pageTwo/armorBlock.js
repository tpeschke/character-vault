import React from 'react'

export default function ArmorBlock({ armor, editing }) {
    let { armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbaseencumb, armorbaserecovery, armorbaseinit,
        armortrainingdef, armortrainencumb, armortrainrecovery, armortraininit, armormiscdef, updateAttribute, armormiscencumb,
        armormiscrecovery, armormiscinit, armorRecovery } = armor

    if (editing) {
        return (
            <div>
                <input className="armornameLocation" type="text" defaultValue={armorname} onChange={event => updateAttribute(event.target.value, "armorname")} />
                <input className="armordrLocation" type="text" defaultValue={armordr} onChange={event => updateAttribute(event.target.value, "armordr")} />
                <input className="armorskilladjLocation" type="number" defaultValue={armorskilladj} onChange={event => updateAttribute(event.target.value, "armorskilladj")} />
                <textarea className="armorbonusLocation armorbonustextArea" defaultValue={armorbonus} onChange={event => updateAttribute(event.target.value, "armorbonus")} maxLength={"60"}></textarea>

                <input className="armorbasedefLocation" type="number" defaultValue={armorbasedef} onChange={event => updateAttribute(event.target.value, "armorbasedef")} />
                <input className="armorbaseencumbLocation" type="number" defaultValue={armorbaseencumb} onChange={event => updateAttribute(event.target.value, "armorbaseencumb")} />
                <input className="armorbaserecoveryLocation" type="number" defaultValue={armorbaserecovery} onChange={event => updateAttribute(event.target.value, "armorbaserecovery")} />
                <input className="armorbaseinitLocation" type="number" defaultValue={armorbaseinit} onChange={event => updateAttribute(event.target.value, "armorbaseinit")} />

                <input className="armortrainingdefLocation" type="number" defaultValue={armortrainingdef} onChange={event => updateAttribute(event.target.value, "armortrainingdef")} />
                <input className="armortrainencumbLocation" type="number" defaultValue={armortrainencumb} onChange={event => updateAttribute(event.target.value, "armortrainencumb")} />
                <input className="armortrainrecoveryLocation" type="number" defaultValue={armortrainrecovery} onChange={event => updateAttribute(event.target.value, "armortrainrecovery")} />
                <input className="armortraininitLocation" type="number" defaultValue={armortraininit} onChange={event => updateAttribute(event.target.value, "armortraininit")} />

                <input className="armormiscdefLocation" type="number" defaultValue={armormiscdef} onChange={event => updateAttribute(event.target.value, "armormiscdef")} />
                <input className="armormiscencumbLocation" type="number" defaultValue={armormiscencumb} onChange={event => updateAttribute(event.target.value, "armormiscencumb")} />
                <input className="armormiscrecoveryLocation" type="number" defaultValue={armormiscrecovery} onChange={event => updateAttribute(event.target.value, "armormiscrecovery")} />
                <input className="armormiscinitLocation" type="number" defaultValue={armormiscinit} onChange={event => updateAttribute(event.target.value, "armormiscinit")} />
            </div>
        )
    }
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

            <p className="armortotaldefLocation">{armorbasedef + armortrainingdef < 0 ? armorbasedef + armortrainingdef + armormiscdef : 0 +  + armormiscdef}</p>
            <p className="armortotalencumbLocation">{armorbaseencumb + armortrainencumb < 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0 + armormiscencumb}</p>
            <p className="armortotalrecoveryLocation">{armorRecovery}</p>
            <p className="armortotalinitLocation">{armorbaseinit + armortraininit < 0 ? armorbaseinit + armortraininit + armormiscinit : 0 + armormiscinit}</p>
        </div>
    )
}