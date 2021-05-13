import React from 'react'

export default function ShieldBlock({ shield }) {
    let { shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbaseencumb, shieldbasebreak,
        shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscencumb,
        returnZeroIfNaN, updateAttribute, shieldsize} = shield
    return (
        <div>
            <p className="shieldnameLocation">{shieldname}</p>
            <p className="shielddrLocation">{shielddr}</p>
            <p className="shieldsizeLocation">{shieldsize}</p>
            <p className="shieldcoverLocation">{shieldcover}</p>
            <p className="shieldbonusLocation">{shieldbonus}</p>

            <p className="shieldbasedefLocation">{shieldbasedef}</p>
            <p className="shieldbaseparryLocation">{shieldbaseparry}</p>
            <p className="shieldbaseencumbLocation">{shieldbaseencumb}</p>
            <p className="shieldbasebreakLocation">{shieldbasebreak}</p>

            <p className="shieldtraindefLocation">{shieldtraindef}</p>
            <p className="shieldtrainparryLocation">{shieldtrainparry}</p>
            <p className="shieldtrainencumbLocation">{shieldtrainencumb}</p>
            <p className="shieldtrainbreakLocation">{shieldtrainbreak}</p>

            <input className="shieldmiscdefLocation" type="number" defaultValue={shieldmiscdef} onBlur={event => updateAttribute(event.target.value, "shieldmiscdef")} />
            <input className="shieldmiscparryLocation" type="number" defaultValue={shieldmiscparry} onBlur={event => updateAttribute(event.target.value, "shieldmiscparry")} />
            <input className="shieldmiscencumbLocation" type="number" defaultValue={shieldmiscencumb} onBlur={event => updateAttribute(event.target.value, "shieldmiscencumb")} />
            <input className="shieldmiscbreakLocation" type="number" defaultValue={shieldmiscbreak} onBlur={event => updateAttribute(event.target.value, "shieldmiscbreak")} />

            <p className="shieldtotaldefLocation">{shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0}</p>
            <p className="shieldtotalparryLocation">{returnZeroIfNaN(shieldbaseparry + shieldtrainparry + shieldmiscparry)}</p>
            <p className="shieldtotalencumbLocation">{shieldbaseencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldbaseencumb + shieldtrainencumb + shieldmiscencumb : 0}</p>
            <p className="shieldtotalbreakLocation">{shieldbasebreak + shieldtrainbreak + shieldmiscbreak > 0 ? shieldbasebreak + shieldtrainbreak + shieldmiscbreak : 0}</p>

        </div>
    )
}