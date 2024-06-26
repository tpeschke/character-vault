import React, { Component } from 'react';
import axios from "axios"

const sortFunction = function (a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

// export default function ShieldBlock({ shield, editing }) {
export default class ShieldBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props,
            shieldChoices: [],
            shieldOptions: [],
            seed: Math.random()
        }
    }

    componentWillMount() {
        let { shieldChoices, shieldOptions } = this.state
        axios.get(`https://bonfire.stone-fish.com/getShields`).then(({ data }) => {
            shieldChoices = data
            shieldOptions = data.sort(sortFunction).map(choice => {
                return <option value={choice.name} />
            })
            this.setState({ shieldChoices, shieldOptions }, _ => this.changeShieldName(this.state.shield.shieldname))
        })
    }

    changeShieldName = (selectedName) => {
        let { shieldChoices, shield, updateManyAttributes } = this.state
        if (selectedName) {
            for (let i = 0; i < shieldChoices.length; i++) {
                if (selectedName === shieldChoices[i].name) {
                    let { bonus, cover, def, dr, fatigue, flanks, name, parry, size } = shieldChoices[i]
                    let newshield = { shieldname: name, shieldbaseparry: parry, shieldbasefatigue: fatigue, shieldbasedef: def, shielddr: dr, shieldcover: cover, shieldbonus: bonus, shieldsize: size, shieldflanks: flanks }
                    shield = { ...shield, ...newshield }
                    updateManyAttributes(shield)
                    this.setState({ shield }, _ => {
                        this.updateAttribute(true, 'usingshield')
                    })
                    i = shieldChoices.length
                }
            }
        } else {
            let newshield = { shieldname: null, shieldbaseparry: null, shieldbasefatigue: null, shieldbasedef: null, shielddr: null, shieldcover: null, shieldbonus: null, shieldsize: null, shieldflanks: null }
            shield = { ...shield, ...newshield }
            updateManyAttributes(shield)
            this.setState({ shield, seed: Math.random() }, _ => {
                this.updateAttribute(false, 'usingshield')
            })
        }
    }

    updateAttribute = (value, type) => {
        this.setState({ shield: { ...this.state.shield, [type]: value } })
        if (this.state.shield.updateAttribute) {
            this.state.shield.updateAttribute(value, type)
        }
    }

    toggleShield = () => {
        this.state.shield.updateAttribute(!this.state.shield.usingshield, 'usingshield')
        this.setState({ shield: { ...this.state.shield, usingshield: !this.state.shield.usingshield } })
    }

    render() {
        let { shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
            shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscfatigue, shieldflanks,
            returnZeroIfNaN, shieldsize, shieldFatigue, id, usingshield } = this.state.shield
        let { editing, shieldOptions } = this.state

        if (editing) {
            return (
                <div className="shieldBlockShell" key={this.state.seed}>
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
                    <div className="twinShieldStats">
                        <div>
                            <p>Def</p>
                            <input className="shieldsizeLocation" type="text" value={shieldbasedef} onChange={event => this.updateAttribute(event.target.value, "shieldbasedef")} />
                        </div>
                        <div>
                            <p>Size</p>
                            <input className="shieldsizeLocation" type="text" value={shieldsize} onChange={event => this.updateAttribute(event.target.value, "shieldsize")} />
                        </div>
                    </div>
                    <div className="basicStats">
                        <p>Cover</p>
                        <input className="shieldcoverLocation" type="text" value={shieldcover} onChange={event => this.updateAttribute(event.target.value, "shieldcover")} />
                    </div>
                    <div className="armorBonusArea shieldBonusArea">
                        <p>Bonus</p>
                        <textarea className="shieldbonusLocation shieldbonustextArea" value={shieldbonus && shieldbonus !== 'false' ? shieldbonus : ''} onChange={event => this.updateAttribute(event.target.value, "shieldbonus")} maxLength={"60"}></textarea>
                    </div>

                    <div className="calculatedStats shield calculatedStatsHeading">
                        <p>Fat</p>
                        <p>Pry</p>
                        <p>Brk</p>
                        <p> </p>
                    </div>

                    <div className="calculatedStats shield">
                        <input className="shieldbaseencumbLocation" type="number" value={shieldbasefatigue} onChange={event => this.updateAttribute(event.target.value, "shieldbasefatigue")} />
                        <input className="shieldbaseparryLocation" type="number" value={shieldbaseparry} onChange={event => this.updateAttribute(event.target.value, "shieldbaseparry")} />
                        <input className="shieldbasebreakLocation" type="number" value={shieldbasebreak} onChange={event => this.updateAttribute(event.target.value, "shieldbasebreak")} />
                        <p>Base</p>
                    </div>

                    <div className="calculatedStats shield">
                        <input className="shieldtrainencumbLocation" type="number" value={shieldtrainfatigue} onChange={event => this.updateAttribute(event.target.value, "shieldtrainfatigue")} />
                        <input className="shieldtrainparryLocation" type="number" value={shieldtrainparry} onChange={event => this.updateAttribute(event.target.value, "shieldtrainparry")} />
                        <input className="shieldtrainbreakLocation" type="number" value={shieldtrainbreak} onChange={event => this.updateAttribute(event.target.value, "shieldtrainbreak")} />
                        <p>Skills</p>
                    </div>

                    <div className="calculatedStats shield">
                        <input type="number" value={shieldmiscfatigue} onChange={event => this.updateAttribute(event.target.value, "shieldmiscfatigue")} />
                        <input type="number" value={shieldmiscparry} onChange={event => this.updateAttribute(event.target.value, "shieldmiscparry")} />
                        <input type="number" value={shieldmiscbreak} onChange={event => this.updateAttribute(event.target.value, "shieldmiscbreak")} />
                        <p>Misc</p>
                    </div>

                    <div className="calculatedStats shield">
                        <p>{shieldFatigue}</p>
                        <p>{returnZeroIfNaN(+shieldbaseparry + +shieldtrainparry + +shieldmiscparry)}</p>
                        <p>{+shieldbasebreak + Math.ceil(+shieldtrainbreak /2) + +shieldmiscbreak}</p>
                        <p>Total</p>
                    </div>
                </div>
            )
        }

        if (id !== 'blank') {
            return (
                <div className="shieldBlockShell">
                    <h2>Shield Workspace</h2>
                    <button className="shieldnameLocation" onClick={this.toggleShield}><p className={usingshield ? null : 'buttonStrikeThrough'}>{shieldname}</p></button>

                    <div className="basicStats">
                        <p>DR</p>
                        <p className="shielddrLocation">{shielddr}</p>
                    </div>
                    <div className="twinShieldStats">
                        <div>
                            <p>Def</p>
                            <p className="shielddrLocation">{shieldbasedef}</p>
                        </div>
                        <div>
                            <p>Size</p>
                            <p className="shieldsizeLocation">{shieldsize}</p>
                        </div>
                    </div>
                    <div className="basicStats">
                        <p>Cover</p>
                        <p className="shieldcoverLocation">{shieldcover}</p>
                    </div>
                    <div className="armorBonusArea shieldBonusArea">
                        <p>Bonus</p>
                        <p className="shieldbonusLocation">{shieldbonus && shieldbonus !== 'false' ? shieldbonus : ''}</p>
                    </div>

                    <div className="calculatedStats shield calculatedStatsHeading">
                        <p>Fat</p>
                        <p>Pry</p>
                        <p>Brk</p>
                        <p> </p>
                    </div>

                    <div className="calculatedStats shield">
                        <p>{shieldbasefatigue}</p>
                        <p>{shieldbaseparry}</p>
                        <p>{shieldbasebreak}</p>
                        <p>Base</p>
                    </div>

                    <div className="calculatedStats shield">
                        <p>{shieldtrainfatigue}</p>
                        <p>{shieldtrainparry}</p>
                        <p>{shieldtrainbreak}</p>
                        <p>Skills</p>
                    </div>

                    <div className="calculatedStats shield">
                        <input type="number" value={shieldmiscfatigue} onChange={event => this.updateAttribute(event.target.value, "shieldmiscfatigue")} />
                        <input type="number" value={shieldmiscparry} onChange={event => this.updateAttribute(event.target.value, "shieldmiscparry")} />
                        <input type="number" value={shieldmiscbreak} onChange={event => this.updateAttribute(event.target.value, "shieldmiscbreak")} />
                        <p>Misc</p>
                    </div>

                    <div className="calculatedStats shield">
                        <p>{returnZeroIfNaN(shieldFatigue)}</p>
                        <p>{returnZeroIfNaN(+shieldbaseparry + +shieldtrainparry + +shieldmiscparry)}</p>
                        <p>{returnZeroIfNaN(+shieldbasebreak + Math.ceil(+shieldtrainbreak/2) + +shieldmiscbreak)}</p>
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
                    <div className="twinShieldStats">
                        <div>
                            <p>Def</p>
                            <p className="shielddrLocation"> </p>
                        </div>
                        <div>
                            <p>Size</p>
                            <p className="shieldsizeLocation"> </p>
                        </div>
                    </div>
                    <div className="basicStats">
                        <p>Cover</p>
                        <p className="shieldcoverLocation"> </p>
                    </div>
                    <div className="armorBonusArea shieldBonusArea">
                        <p>Bonus</p>
                        <p className="shieldbonusLocation"> </p>
                    </div>

                    <div className="calculatedStats shield calculatedStatsHeading">
                        <p>Fat</p>
                        <p>Pry</p>
                        <p>Brk</p>
                        <p> </p>
                    </div>

                    <div className="calculatedStats shield">
                        <p> </p>
                        <p> </p>
                        <p> </p>
                        <p>Base</p>
                    </div>

                    <div className="calculatedStats shield">
                        <p> </p>
                        <p> </p>
                        <p> </p>
                        <p>Skills</p>
                    </div>

                    <div className="calculatedStats shield">
                        <p> </p>
                        <p> </p>
                        <p> </p>
                        <p>Misc</p>
                    </div>

                    <div className="calculatedStats shield">
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