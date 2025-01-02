import React, { Component } from 'react';
import './shieldBlock.css'
import '../blocks.css'
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

    creatPairs(label, value, classes, updateName) {
        if (this.state.editing && updateName) {
            return (
                <div className={classes}>
                    <p>{label}</p>
                    <input type="text" value={value} onChange={event => this.updateAttribute(event.target.value, updateName)} />
                </div>
            )
        }
        return (
            <div className={classes}>
                <p>{label}</p>
                <p>{value}</p>
            </div>
        )
    }

    createStatCalculation(label, classes, updateValues) {
        if (this.state.editing && updateValues) {
            return (
                <div className={classes}>
                    <input type="number" value={label[0]} onChange={event => this.updateAttribute(event.target.value, label[0])} />
                    <input type="number" value={label[1]} onChange={event => this.updateAttribute(event.target.value, label[1])} />
                    <input type="number" value={label[2]} onChange={event => this.updateAttribute(event.target.value, label[2])} />
                    <p>{label[3]}</p>
                </div>
            )
        }
        return (
            <div className={classes}>
                <p>{label[0]}</p>
                <p>{label[1]}</p>
                <p>{label[2]}</p>
                <p>{label[3]}</p>
            </div>
        )
    }

    render() {
        let { shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
            shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscfatigue, shieldflanks,
            returnZeroIfNaN, shieldsize, shieldFatigue, id, usingshield } = this.state.shield
        let { editing, shieldOptions } = this.state

        return (
            <div className="shieldBlockShell">
                <h2>Shield Workspace</h2>
                {id === 'blank' ? (
                    <p className="shieldnameLocation"> </p>
                ) : editing ? (
                    <>
                        <input className="armornameLocation" defaultValue={shieldname} type="text" list="shieldChoices" onBlur={e => this.changeShieldName(e.target.value)} />
                        <datalist id="shieldChoices">
                            {shieldOptions}
                        </datalist>
                    </>
                ) : (
                    <button className="shieldnameLocation" onClick={this.toggleShield}><p className={usingshield ? null : 'buttonStrikeThrough'}>{shieldname}</p></button>
                )}
                {this.creatPairs('DR', shielddr, 'basicStats', 'shielddr')}
                <div className="twinShieldStats">
                    {this.creatPairs('Def', shieldbasedef, 'basicStats', 'shieldbasedef')}
                    {this.creatPairs('Size', shieldsize, 'basicStats', 'shieldsize')}
                </div>
                {this.creatPairs('Cover', shieldcover, 'basicStats', 'shieldcover')}

                <div className="armorBonusArea shieldBonusArea">
                    <p>Bonus</p>
                    {editing ? (
                        <textarea className="shieldbonusLocation shieldbonustextArea" value={shieldbonus && shieldbonus !== 'false' ? shieldbonus : ''} onChange={event => this.updateAttribute(event.target.value, "shieldbonus")} maxLength={"60"}></textarea>
                    ) : (
                        <p className="shieldbonusLocation">{shieldbonus && shieldbonus !== 'false' ? shieldbonus : ''}</p>
                    )}
                </div>

                <div className='calculatedStatsShellShield'>
                    {this.createStatCalculation(['Fat', 'Pry', 'Brk', ''], 'calculatedStats shield calculatedStatsHeading')}
                    {this.createStatCalculation([shieldbasefatigue, shieldbaseparry, shieldbasebreak, 'Base'], 'calculatedStats shield', ['shieldbasefatigue', 'shieldbaseparry', 'shieldbasebreak'])}
                    {this.createStatCalculation([shieldtrainfatigue, shieldtrainparry, shieldtrainbreak, 'Skill'], 'calculatedStats shield', ['shieldtrainfatigue', 'shieldtrainparry', 'shieldtrainbreak'])}
                    {id === 'blank' ? (
                        <>
                            {this.createStatCalculation([' ', ' ', ' ', 'Misc'], 'calculatedStats shield')}
                            {this.createStatCalculation([' ', ' ', ' ', 'Total'], 'calculatedStats shield')}
                        </>
                    ) : (
                        <>
                            <div className="calculatedStats shield">
                                <input type="number" value={shieldmiscfatigue} onChange={event => this.updateAttribute(event.target.value, "shieldmiscfatigue")} />
                                <input type="number" value={shieldmiscparry} onChange={event => this.updateAttribute(event.target.value, "shieldmiscparry")} />
                                <input type="number" value={shieldmiscbreak} onChange={event => this.updateAttribute(event.target.value, "shieldmiscbreak")} />
                                <p>Misc</p>
                            </div>
                            {this.createStatCalculation([returnZeroIfNaN(shieldFatigue),
                            returnZeroIfNaN(+shieldbaseparry + +shieldtrainparry + +shieldmiscparry),
                            returnZeroIfNaN(+shieldbasebreak + Math.ceil(+shieldtrainbreak / 2) + +shieldmiscbreak),
                                'Total'], 'calculatedStats shield')}
                        </>
                    )}

                </div>
            </div>
        )
    }
}