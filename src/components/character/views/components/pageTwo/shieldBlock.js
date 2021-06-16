import React from 'react'

export default function ShieldBlock({ shield, editing }) {
    let { shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbaseencumb, shieldbasebreak,
        shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscencumb,
        returnZeroIfNaN, updateAttribute, shieldsize } = shield

    if (editing) {
        return (
            <div>
                <input className="shieldnameLocation" type="text" defaultValue={shieldname} onChange={event => updateAttribute(event.target.value, "shieldname")} />
                <input className="shielddrLocation" type="text" defaultValue={shielddr} onChange={event => updateAttribute(event.target.value, "shielddr")} />
                <input className="shieldcoverLocation" type="text" defaultValue={shieldcover} onChange={event => updateAttribute(event.target.value, "shieldcover")} />
                <input className="shieldsizeLocation" type="text" defaultValue={shieldsize} onChange={event => updateAttribute(event.target.value, "shieldsize")} />
                <textarea className="shieldbonusLocation shieldbonustextArea" defaultValue={shieldbonus} onChange={event => updateAttribute(event.target.value, "shieldbonus")} maxLength={"60"}></textarea>

                <input className="shieldbasedefLocation" type="number" defaultValue={shieldbasedef} onChange={event => updateAttribute(event.target.value, "shieldbasedef")} />
                <input className="shieldbaseparryLocation" type="number" defaultValue={shieldbaseparry} onChange={event => updateAttribute(event.target.value, "shieldbaseparry")} />
                <input className="shieldbaseencumbLocation" type="number" defaultValue={shieldbaseencumb} onChange={event => updateAttribute(event.target.value, "shieldbaseencumb")} />
                <input className="shieldbasebreakLocation" type="number" defaultValue={shieldbasebreak} onChange={event => updateAttribute(event.target.value, "shieldbasebreak")} />

                <input className="shieldtraindefLocation" type="number" defaultValue={shieldtraindef} onChange={event => updateAttribute(event.target.value, "shieldtraindef")} />
                <input className="shieldtrainparryLocation" type="number" defaultValue={shieldtrainparry} onChange={event => updateAttribute(event.target.value, "shieldtrainparry")} />
                <input className="shieldtrainencumbLocation" type="number" defaultValue={shieldtrainencumb} onChange={event => updateAttribute(event.target.value, "shieldtrainencumb")} />
                <input className="shieldtrainbreakLocation" type="number" defaultValue={shieldtrainbreak} onChange={event => updateAttribute(event.target.value, "shieldtrainbreak")} />

                <input className="shieldmiscdefLocation" type="number" defaultValue={shieldmiscdef} onChange={event => updateAttribute(event.target.value, "shieldmiscdef")} />
                <input className="shieldmiscparryLocation" type="number" defaultValue={shieldmiscparry} onChange={event => updateAttribute(event.target.value, "shieldmiscparry")} />
                <input className="shieldmiscencumbLocation" type="number" defaultValue={shieldmiscencumb} onChange={event => updateAttribute(event.target.value, "shieldmiscencumb")} />
                <input className="shieldmiscbreakLocation" type="number" defaultValue={shieldmiscbreak} onChange={event => updateAttribute(event.target.value, "shieldmiscbreak")} />
            </div>
        )
    }
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

            <p className="shieldtotaldefLocation">{shieldbasedef + shieldtraindef < 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0 + shieldmiscdef}</p>
            <p className="shieldtotalparryLocation">{returnZeroIfNaN(shieldbaseparry + shieldtrainparry + shieldmiscparry)}</p>
            <p className="shieldtotalencumbLocation">{shieldbaseencumb + shieldtrainencumb < 0 ? shieldbaseencumb + shieldtrainencumb + shieldmiscencumb : 0 + shieldmiscencumb}</p>
            <p className="shieldtotalbreakLocation">{shieldbasebreak + shieldtrainbreak < 0 ? shieldbasebreak + shieldtrainbreak + shieldmiscbreak : 0 + shieldmiscbreak}</p>

        </div>
    )
}