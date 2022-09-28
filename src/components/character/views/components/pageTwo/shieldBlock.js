import React, { Component } from 'react';
import axios from "axios"


// export default function ShieldBlock({ shield, editing }) {
export default class ShieldBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props,
            shieldChoices: [],
            shieldOptions: []
        }
    }

    componentWillMount() {
        let { shieldChoices, shieldOptions } = this.state
        axios.get(`https://bonfire.dragon-slayer.net/getShields`).then(({ data }) => {
            shieldChoices = data
            shieldOptions = data.map(choice => {
                return <option value={choice.name} />
            })
            this.setState({ shieldChoices, shieldOptions }, _ => this.changeShieldName(this.state.shield.name))
        })
    }

    changeShieldName = (selectedName) => {
        let { shieldChoices, shield, updateManyArrributes } = this.state

        for (let i = 0; i < shieldChoices.length; i++) {
            if (selectedName === shieldChoices[i].name) {
                let { bonus, cover, def, dr, fatigue, flanks, name, parry, size } = shieldChoices[i]
                let newshield = {shieldname: name, shieldbaseparry: parry, shieldbasefatigue: fatigue, shieldbasedef: def, shielddr: dr, shieldcover: cover, shieldbonus: bonus, shieldsize: size}
                shield = { ...shield, ...newshield }
                updateManyArrributes(shield)
                this.setState({ shield })
                i = shieldChoices.length
            }
        }
    }

    updateAttribute = (value, type) => {
        this.setState({ shield: { ...this.state.shield, [type]: value } })
        this.state.shield.updateAttribute(value, type)
    }

    render() {
        let { shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
            shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscfatigue,
            returnZeroIfNaN, shieldsize, shieldFatigue, id } = this.state.shield
        let { editing, shieldOptions } = this.state

        if (editing) {
            return (
                <div className="shieldBlockShell">
                    <h2>Shield Workspace</h2>
                    {/* <input className="shieldnameLocation" type="text" value={shieldname} onChange={event => this.updateAttribute(event.target.value, "shieldname")} /> */}
                    <input className="armornameLocation" defaultValue={shieldname} type="text" list="shieldChoices" onBlur={e => this.changeShieldName(e.target.value)} />
                    <datalist id="shieldChoices">
                        {shieldOptions}
                    </datalist>
                    <div className="basicStats">
                        <p>DR</p>
                        <input className="shielddrLocation" type="text" value={shielddr} onChange={event => this.updateAttribute(event.target.value, "shielddr")} />
                    </div>
                    <div className="basicStats">
                        <p>Size</p>
                        <input className="shieldsizeLocation" type="text" value={shieldsize} onChange={event => this.updateAttribute(event.target.value, "shieldsize")} />
                    </div>
                    <div className="basicStats">
                        <p>Cover</p>
                        <input className="shieldcoverLocation" type="text" value={shieldcover} onChange={event => this.updateAttribute(event.target.value, "shieldcover")} />
                    </div>
                    <div className="armorBonusArea shieldBonusArea">
                        <p>Bonus</p>
                        <textarea className="shieldbonusLocation shieldbonustextArea" value={shieldbonus && shieldbonus !== 'false' ? shieldbonus : ''} onChange={event => this.updateAttribute(event.target.value, "shieldbonus")} maxLength={"60"}></textarea>
                    </div>

                    <div className="calculatedStats calculatedStatsHeading">
                        <p>Def</p>
                        <p>Fat</p>
                        <p>Pry</p>
                        <p>Brk</p>
                        <p> </p>
                    </div>

                    <div className="calculatedStats">
                        <input className="shieldbasedefLocation" type="number" value={shieldbasedef} onChange={event => this.updateAttribute(event.target.value, "shieldbasedef")} />
                        <input className="shieldbaseencumbLocation" type="number" value={shieldbasefatigue} onChange={event => this.updateAttribute(event.target.value, "shieldbasefatigue")} />
                        <input className="shieldbaseparryLocation" type="number" value={shieldbaseparry} onChange={event => this.updateAttribute(event.target.value, "shieldbaseparry")} />
                        <input className="shieldbasebreakLocation" type="number" value={shieldbasebreak} onChange={event => this.updateAttribute(event.target.value, "shieldbasebreak")} />
                        <p>Base</p>
                    </div>

                    <div className="calculatedStats">
                        <input className="shieldtraindefLocation" type="number" value={shieldtraindef} onChange={event => this.updateAttribute(event.target.value, "shieldtraindef")} />
                        <input className="shieldtrainencumbLocation" type="number" value={shieldtrainfatigue} onChange={event => this.updateAttribute(event.target.value, "shieldtrainfatigue")} />
                        <input className="shieldtrainparryLocation" type="number" value={shieldtrainparry} onChange={event => this.updateAttribute(event.target.value, "shieldtrainparry")} />
                        <input className="shieldtrainbreakLocation" type="number" value={shieldtrainbreak} onChange={event => this.updateAttribute(event.target.value, "shieldtrainbreak")} />
                        <p>Skills</p>
                    </div>

                    <div className="calculatedStats">
                        <input type="number" value={shieldmiscdef} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscdef")} />
                        <input type="number" value={shieldmiscfatigue} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscfatigue")} />
                        <input type="number" value={shieldmiscparry} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscparry")} />
                        <input type="number" value={shieldmiscbreak} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscbreak")} />
                        <p>Misc</p>
                    </div>

                    <div className="calculatedStats">
                        <p>{+shieldbasedef + +shieldtraindef < 0 ? +shieldbasedef + +shieldtraindef + +shieldmiscdef : 0 + +shieldmiscdef}</p>
                        <p>{shieldFatigue}</p>
                        <p>{returnZeroIfNaN(+shieldbaseparry + +shieldtrainparry + +shieldmiscparry)}</p>
                        <p>{+shieldbasebreak + +shieldtrainbreak + +shieldmiscbreak}</p>
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
                        <p className="shieldbonusLocation">{shieldbonus && shieldbonus !== 'false' ? shieldbonus : ''}</p>
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
                        <input type="number" value={shieldmiscdef} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscdef")} />
                        <input type="number" value={shieldmiscfatigue} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscfatigue")} />
                        <input type="number" value={shieldmiscparry} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscparry")} />
                        <input type="number" value={shieldmiscbreak} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscbreak")} />
                        <p>Misc</p>
                    </div>

                    <div className="calculatedStats">
                        <p>{returnZeroIfNaN(+shieldbasedef + +shieldtraindef < 0 ? +shieldbasedef + +shieldtraindef + +shieldmiscdef : 0 + +shieldmiscdef)}</p>
                        <p>{returnZeroIfNaN(shieldFatigue)}</p>
                        <p>{returnZeroIfNaN(+shieldbaseparry + +shieldtrainparry + +shieldmiscparry)}</p>
                        <p>{returnZeroIfNaN(+shieldbasebreak + +shieldtrainbreak + +shieldmiscbreak)}</p>
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
}