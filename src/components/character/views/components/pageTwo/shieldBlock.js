import React from 'react'

export default function ShieldBlock({ shield, editing }) {
    let { shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
        shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscfatigue,
        returnZeroIfNaN, updateAttribute, shieldsize, shieldFatigue, id } = shield

    if (editing) {
        return (
            <div className="shieldBlockShell">
                <h2>Shield Workspace</h2>
                <input className="shieldnameLocation" type="text" defaultValue={shieldname} onChange={event => updateAttribute(event.target.value, "shieldname")} />
                <div className="basicStats">
                    <p>DR</p>
                    <input className="shielddrLocation" type="text" defaultValue={shielddr} onChange={event => updateAttribute(event.target.value, "shielddr")} />
                </div>
                <div className="basicStats">
                    <p>Size</p>
                    <input className="shieldsizeLocation" type="text" defaultValue={shieldsize} onChange={event => updateAttribute(event.target.value, "shieldsize")} />
                </div>
                <div className="basicStats">
                    <p>Cover</p>
                    <input className="shieldcoverLocation" type="text" defaultValue={shieldcover} onChange={event => updateAttribute(event.target.value, "shieldcover")} />
                </div>
                <div className="armorBonusArea shieldBonusArea">
                    <p>Bonus</p>
                    <textarea className="shieldbonusLocation shieldbonustextArea" defaultValue={shieldbonus} onChange={event => updateAttribute(event.target.value, "shieldbonus")} maxLength={"60"}></textarea>
                </div>

                <div className="calculatedStats calculatedStatsHeading">
                    <p>Def</p>
                    <p>Fat</p>
                    <p>Pry</p>
                    <p>Brk</p>
                    <p> </p>
                </div>

                <div className="calculatedStats">
                    <input className="shieldbasedefLocation" type="number" defaultValue={shieldbasedef} onChange={event => updateAttribute(event.target.value, "shieldbasedef")} />
                    <input className="shieldbaseencumbLocation" type="number" defaultValue={shieldbasefatigue} onChange={event => updateAttribute(event.target.value, "shieldbasefatigue")} />
                    <input className="shieldbaseparryLocation" type="number" defaultValue={shieldbaseparry} onChange={event => updateAttribute(event.target.value, "shieldbaseparry")} />
                    <input className="shieldbasebreakLocation" type="number" defaultValue={shieldbasebreak} onChange={event => updateAttribute(event.target.value, "shieldbasebreak")} />
                    <p>Base</p>
                </div>

                <div className="calculatedStats">
                    <input className="shieldtraindefLocation" type="number" defaultValue={shieldtraindef} onChange={event => updateAttribute(event.target.value, "shieldtraindef")} />
                    <input className="shieldtrainencumbLocation" type="number" defaultValue={shieldtrainfatigue} onChange={event => updateAttribute(event.target.value, "shieldtrainfatigue")} />
                    <input className="shieldtrainparryLocation" type="number" defaultValue={shieldtrainparry} onChange={event => updateAttribute(event.target.value, "shieldtrainparry")} />
                    <input className="shieldtrainbreakLocation" type="number" defaultValue={shieldtrainbreak} onChange={event => updateAttribute(event.target.value, "shieldtrainbreak")} />
                    <p>Skills</p>
                </div>

                <div className="calculatedStats">
                    <input type="number" defaultValue={shieldmiscdef} onBlur={event => updateAttribute(event.target.value, "shieldmiscdef")} />
                    <input type="number" defaultValue={shieldmiscfatigue} onBlur={event => updateAttribute(event.target.value, "shieldmiscfatigue")} />
                    <input type="number" defaultValue={shieldmiscparry} onBlur={event => updateAttribute(event.target.value, "shieldmiscparry")} />
                    <input type="number" defaultValue={shieldmiscbreak} onBlur={event => updateAttribute(event.target.value, "shieldmiscbreak")} />
                    <p>Misc</p>
                </div>

                <div className="calculatedStats">
                    <p>{shieldbasedef + shieldtraindef < 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0 + shieldmiscdef}</p>
                    <p>{shieldFatigue}</p>
                    <p>{returnZeroIfNaN(shieldbaseparry + shieldtrainparry + shieldmiscparry)}</p>
                    <p>{shieldbasebreak + shieldtrainbreak + shieldmiscbreak}</p>
                    <p>Total</p>
                </div>
            </div>
        )
    }

    if (id !== 'blank') {
        return (
            <div className="shieldBlockShell">
                <h2>Shield Workspace</h2>
                <p className="shieldnameLocation">{shieldname}</p>

                <div className="basicStats">
                    <p>DR</p>
                    <p className="shielddrLocation">{shielddr}</p>
                </div>
                <div className="basicStats">
                    <p>Size</p>
                    <p className="shieldsizeLocation">{shieldsize}</p>
                </div>
                <div className="basicStats">
                    <p>Cover</p>
                    <p className="shieldcoverLocation">{shieldcover}</p>
                </div>
                <div className="armorBonusArea shieldBonusArea">
                    <p>Bonus</p>
                    <p className="shieldbonusLocation">{shieldbonus}</p>
                </div>

                <div className="calculatedStats calculatedStatsHeading">
                    <p>Def</p>
                    <p>Fat</p>
                    <p>Pry</p>
                    <p>Brk</p>
                    <p> </p>
                </div>

                <div className="calculatedStats">
                    <p>{shieldbasedef}</p>
                    <p>{shieldbasefatigue}</p>
                    <p>{shieldbaseparry}</p>
                    <p>{shieldbasebreak}</p>
                    <p>Base</p>
                </div>

                <div className="calculatedStats">
                    <p>{shieldtraindef}</p>
                    <p>{shieldtrainfatigue}</p>
                    <p>{shieldtrainparry}</p>
                    <p>{shieldtrainbreak}</p>
                    <p>Skills</p>
                </div>

                <div className="calculatedStats">
                    <input type="number" defaultValue={shieldmiscdef} onBlur={event => updateAttribute(event.target.value, "shieldmiscdef")} />
                    <input type="number" defaultValue={shieldmiscfatigue} onBlur={event => updateAttribute(event.target.value, "shieldmiscfatigue")} />
                    <input type="number" defaultValue={shieldmiscparry} onBlur={event => updateAttribute(event.target.value, "shieldmiscparry")} />
                    <input type="number" defaultValue={shieldmiscbreak} onBlur={event => updateAttribute(event.target.value, "shieldmiscbreak")} />
                    <p>Misc</p>
                </div>

                <div className="calculatedStats">
                    <p>{shieldbasedef + shieldtraindef < 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0 + shieldmiscdef}</p>
                    <p>{shieldFatigue}</p>
                    <p>{returnZeroIfNaN(shieldbaseparry + shieldtrainparry + shieldmiscparry)}</p>
                    <p>{shieldbasebreak + shieldtrainbreak + shieldmiscbreak}</p>
                    <p>Total</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="shieldBlockShell">
                <h2>Shield Workspace</h2>
                <p className="shieldnameLocation"> </p>

                <div className="basicStats">
                    <p>DR</p>
                    <p className="shielddrLocation"> </p>
                </div>
                <div className="basicStats">
                    <p>Size</p>
                    <p className="shieldsizeLocation"> </p>
                </div>
                <div className="basicStats">
                    <p>Cover</p>
                    <p className="shieldcoverLocation"> </p>
                </div>
                <div className="armorBonusArea shieldBonusArea">
                    <p>Bonus</p>
                    <p className="shieldbonusLocation"> </p>
                </div>

                <div className="calculatedStats calculatedStatsHeading">
                    <p>Def</p>
                    <p>Fat</p>
                    <p>Pry</p>
                    <p>Brk</p>
                    <p> </p>
                </div>

                <div className="calculatedStats">
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p>Base</p>
                </div>

                <div className="calculatedStats">
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p>Skills</p>
                </div>

                <div className="calculatedStats">
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p>Misc</p>
                </div>

                <div className="calculatedStats">
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p> </p>
                    <p>Total</p>
                </div>
            </div>
        )
    }
}