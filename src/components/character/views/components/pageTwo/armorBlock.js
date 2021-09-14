import React from 'react'

export default function ArmorBlock({ armor, editing }) {
    let { armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbasefatigue, armorbaserecovery, armorbaseinit,
        armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, armormiscdef, updateAttribute, armormiscfatigue,
        armormiscrecovery, armormiscinit, armorRecovery, armorfatigue } = armor

    if (editing) {
        return (
            <div>
                <input className="armornameLocation" type="text" defaultValue={armorname} onChange={event => updateAttribute(event.target.value, "armorname")} />
                <input className="armordrLocation" type="text" defaultValue={armordr} onChange={event => updateAttribute(event.target.value, "armordr")} />
                <input className="armorskilladjLocation" type="number" defaultValue={armorskilladj} onChange={event => updateAttribute(event.target.value, "armorskilladj")} />
                <textarea className="armorbonusLocation armorbonustextArea" defaultValue={armorbonus} onChange={event => updateAttribute(event.target.value, "armorbonus")} maxLength={"60"}></textarea>

                <input className="armorbasedefLocation" type="number" defaultValue={armorbasedef} onChange={event => updateAttribute(event.target.value, "armorbasedef")} />
                <input className="armorbasefatigueLocation" type="text" defaultValue={armorbasefatigue} onChange={event => updateAttribute(event.target.value, "armorbasefatigue")} />
                <input className="armorbaserecoveryLocation" type="number" defaultValue={armorbaserecovery} onChange={event => updateAttribute(event.target.value, "armorbaserecovery")} />
                <input className="armorbaseinitLocation" type="number" defaultValue={armorbaseinit} onChange={event => updateAttribute(event.target.value, "armorbaseinit")} />

                <input className="armortrainingdefLocation" type="number" defaultValue={armortrainingdef} onChange={event => updateAttribute(event.target.value, "armortrainingdef")} />
                <input className="armortrainfatigueLocation" type="number" defaultValue={armortrainfatigue} onChange={event => updateAttribute(event.target.value, "armortrainfatigue")} />
                <input className="armortrainrecoveryLocation" type="number" defaultValue={armortrainrecovery} onChange={event => updateAttribute(event.target.value, "armortrainrecovery")} />
                <input className="armortraininitLocation" type="number" defaultValue={armortraininit} onChange={event => updateAttribute(event.target.value, "armortraininit")} />

                <input className="armormiscdefLocation" type="number" defaultValue={armormiscdef} onChange={event => updateAttribute(event.target.value, "armormiscdef")} />
                <input className="armormiscfatigueLocation" type="number" defaultValue={armormiscfatigue} onChange={event => updateAttribute(event.target.value, "armormiscfatigue")} />
                <input className="armormiscrecoveryLocation" type="number" defaultValue={armormiscrecovery} onChange={event => updateAttribute(event.target.value, "armormiscrecovery")} />
                <input className="armormiscinitLocation" type="number" defaultValue={armormiscinit} onChange={event => updateAttribute(event.target.value, "armormiscinit")} />

                <p className="armortotaldefLocation">{armorbasedef + armortrainingdef < 0 ? armorbasedef + armortrainingdef + armormiscdef : 0 + + armormiscdef}</p>
                <p className="armortotalfatigueLocation">{armorfatigue}</p>
                <p className="armortotalrecoveryLocation">{armorRecovery}</p>
                <p className="armortotalinitLocation">{armorbaseinit + armortraininit < 0 ? armorbaseinit + armortraininit + armormiscinit : 0 + armormiscinit}</p>
            </div>
        )
    }
    return (
        <div className="armorBlockShell">
            <h2>Armor Workspace</h2>
            <p className="armornameLocation">{armorname}</p>
            <div className="basicStats">
                <p>DR</p>
                <p>{armordr}</p>
            </div>
            <div className="basicStats">
                <p>Skill Adju.</p>
                <p>{armorskilladj}</p>
            </div>
            <div className="armorBonusArea">
                <p>Bonus</p>
                <p>{armorbonus}</p>
            </div>

            <div className="calculatedStats calculatedStatsHeading">
                <p>Def</p>
                <p>Fat</p>
                <p>Rcv</p>
                <p>Init</p>
                <p> </p>
            </div>
            <div className="calculatedStats">
                <p>{armorbasedef}</p>
                <p>{armorbasefatigue}</p>
                <p>{armorbaserecovery}</p>
                <p>{armorbaseinit}</p>
                <p>Base</p>
            </div>

            <div className="calculatedStats">
                <p>{armortrainingdef}</p>
                <p>{armortrainfatigue}</p>
                <p>{armortrainrecovery}</p>
                <p>{armortraininit}</p>
                <p>Train</p>
            </div>

            <div className="calculatedStats">
                <input type="number" defaultValue={armormiscdef} onBlur={event => updateAttribute(event.target.value, "armormiscdef")} />
                <input type="number" defaultValue={armormiscfatigue} onBlur={event => updateAttribute(event.target.value, "armormiscfatigue")} />
                <input type="number" defaultValue={armormiscrecovery} onBlur={event => updateAttribute(event.target.value, "armormiscrecovery")} />
                <input type="number" defaultValue={armormiscinit} onChange={event => updateAttribute(event.target.value, "armormiscinit")} />
                <p>Misc</p>
            </div>

            <div className="calculatedStats">
                <p>{armorbasedef + armortrainingdef < 0 ? armorbasedef + armortrainingdef + armormiscdef : 0 + + armormiscdef}</p>
                <p>{armorfatigue}</p>
                <p>{armorRecovery}</p>
                <p>{armorbaseinit + armortraininit < 0 ? armorbaseinit + armortraininit + armormiscinit : 0 + armormiscinit}</p>
                <p>Total</p>
            </div>
        </div>
    )
}