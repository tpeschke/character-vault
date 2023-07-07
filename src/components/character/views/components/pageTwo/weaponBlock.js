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

export default class WeaponBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props,
            weaponChoices: [],
            weaponOptions: [],
            weaponChoiceType: '',
            seed: Math.random()
        }
    }

    componentWillMount() {
        let { weapon, weaponChoices, weaponOptions } = this.state
        if (weapon.position === 'four') {
            axios.get(`https://bonfire.dragon-slayer.net/getWeapons/ranged`).then(({ data }) => {
                weaponChoices = data
                weaponOptions = data.sort(sortFunction).map(choice => {
                    return <option value={`${choice.name} (${choice.type})`} />
                })
                this.setState({ weaponChoices, weaponOptions, weaponChoiceType: 'ranged' })
            })
        } else {
            axios.get(`https://bonfire.dragon-slayer.net/getWeapons/melee`).then(({ data }) => {
                weaponChoices = data
                weaponOptions = data.sort(sortFunction).map(choice => {
                    return <option value={`${choice.name} (${choice.type})`}></option>
                })
                this.setState({ weaponChoices, weaponOptions, weaponChoiceType: 'melee' })
            })
        }
    }

    updateValue = (value, key) => {
        if (!value) {
            value = null
        }
        let weapon = { ...this.state.weapon }
        weapon[key] = value
        this.setState({ weapon })
        this.state.updateObject(`weapon${this.state.weapon.position}`, key, value)
    }

    changeWeaponName = (selectedName, damageType) => {
        let { weaponChoices, weapon, updateEntireObject } = this.state

        if (selectedName) {
            console.log(selectedName)
            console.log(weaponChoices)
            for (let i = 0; i < weaponChoices.length; i++) {
                if (selectedName === `${weaponChoices[i].name} (${weaponChoices[i].type})` || `${selectedName} (${damageType})` === `${weaponChoices[i].name} (${weaponChoices[i].type})` || selectedName === weaponChoices[i].name) {
                    let { bonus, dam, measure, name, parry, rec, size, type } = weaponChoices[i]
                    let newWeapon = { bonus, basedamage: dam, basemeasure: measure, name, baseparry: parry, baserecovery: rec, size, type, thrownweapon: this.updateThrownStatus(name, weapon.position) }
                    weapon = { ...weapon, ...newWeapon }
                    updateEntireObject(`weapon${weapon.position}`, weapon)
                    this.setState({ weapon }, _ => this.updateThrownStatus())
                    i = weaponChoices.length
                }
            }
        } else {
            let newWeapon = { bonus: null, basedamage: null, basemeasure: null, name: null, baseparry: null, baserecovery: null, size: null, type: null, thrownweapon: null }
            weapon = { ...weapon, ...newWeapon }
            updateEntireObject(`weapon${weapon.position}`, weapon)
            this.setState({ weapon, seed: Math.random() }, _ => this.updateThrownStatus())
        }
    }

    updateThrownStatus(name, position) {
        if (position === 'four') {
            return name.toUpperCase() === 'JAVELIN' || name.toUpperCase() === 'THROWING AXE' || name.toUpperCase() === 'THROWING KNIFE'
        }
        return false
    }

    render() {
        let { position, name, basemeasure, basedamage, baseparry, baserecovery, size, type, bonus, traits, trainrecovery, trainattack, traindamage, trainparry,
            miscattack, miscdamage, miscinit, miscparry, miscrecovery, id } = this.state.weapon
        let { returnZeroIfNaN, editing, weaponOptions, weaponChoiceType } = this.state

        if (editing) {
            let measureAndParry = (<div className="armorBaseStats">
                <div>
                    <p>Meas.</p>
                    <input type="text" value={basemeasure} onChange={event => this.updateValue(event.target.value, "basemeasure")} />
                </div>
                <div>
                    <p>Parry</p>
                    <input type="number" value={baseparry} onChange={event => this.updateValue(event.target.value, "baseparry")} />
                </div>
            </div>)
            if (position === "four") {
                measureAndParry = (null)
            }

            return (
                <div className={`weaponProfile${position} weaponProfileShell`} key={this.state.seed}>
                    <h2>Weapon Workspace</h2>
                    <input className="weaponnameLocation" defaultValue={name} type="text" list={weaponChoiceType} onBlur={e => this.changeWeaponName(e.target.value, type)} />
                    <datalist id={weaponChoiceType}>
                        {weaponOptions}
                    </datalist>
                    <div className="armorBaseStats">
                        <p>Damage</p>
                        <input className="basedamageLocation" type="text" value={basedamage} onChange={event => this.updateValue(event.target.value, "basedamage")} />
                    </div>
                    <div className="armorBaseStats">
                        <div>
                            <p>Recov.</p>
                            <input className="baserecoveryLocation" type="number" value={baserecovery} onChange={event => this.updateValue(event.target.value, "baserecovery")} />
                        </div>
                        <div>
                            <p>Size</p>
                            <input type="text" value={size} onChange={event => this.updateValue(event.target.value, "size")} />
                        </div>
                    </div>
                    {measureAndParry}
                    <div className="armorBaseStats">
                        <p>Type</p>
                        <input className="basedamageLocation" type="text" value={type} onChange={event => this.updateValue(event.target.value, "type")} />
                    </div>
                    <div className={position !== "four" ? "weaponBonusArea" : "weaponBonusArea bonusfour"}>
                        <p>Bonus</p>
                        <textarea value={bonus ? bonus : ''} onChange={event => this.updateValue(event.target.value, "bonus")} maxLength={"75"}></textarea>
                    </div>
                    <div className="weaponTraitArea">
                        <p>Traits</p>
                        <textarea className={position !== "four" ? "traitsLocation" : "traitsLocation traitsfour"} value={traits} onChange={event => this.updateValue(event.target.value, "traits")} maxLength={"35"}></textarea>
                    </div>

                    <div className="weaponCalculatedStats weaponCalculatedStatsHeader">
                        <p>Atk</p>
                        <p>Rcv</p>
                        <p>Pry</p>
                        <p>Dam</p>
                        <p>Init</p>
                        <p> </p>
                    </div>

                    <div className="weaponCalculatedStats">
                        <input type="number" value={trainattack} onChange={event => this.updateValue(event.target.value, "trainattack")} />
                        <input type="number" value={trainrecovery} onChange={event => this.updateValue(event.target.value, "trainrecovery")} />
                        <input type="number" value={trainparry} onChange={event => this.updateValue(event.target.value, "trainparry")} />
                        <input type="number" value={traindamage} onChange={event => this.updateValue(event.target.value, "traindamage")} />
                        <p> </p>
                        <p>Ski</p>
                    </div>

                    <div className="weaponCalculatedStats">
                        <input type="number" value={miscattack} onChange={event => this.updateValue(event.target.value, "miscattack")} />
                        <input type="number" value={miscrecovery} onChange={event => this.updateValue(event.target.value, "miscrecovery")} />
                        <input type="number" value={miscparry} onChange={event => this.updateValue(event.target.value, "miscparry")} />
                        <input type="number" value={miscdamage} onChange={event => this.updateValue(event.target.value, "miscdamage")} />
                        <input className={position !== "four" ? "" : "initfour"} type="number" value={miscinit} onChange={event => this.updateValue(event.target.value, "miscinit")} />
                        <p>Mi</p>
                    </div>

                    <div className="weaponCalculatedStats">
                        <p>{returnZeroIfNaN(+trainattack + +miscattack)}</p>
                        <p>{returnZeroIfNaN((Math.floor(trainrecovery / 2) * -1) + +miscrecovery)}</p>
                        <p>{returnZeroIfNaN(+trainparry + +miscparry)}</p>
                        <p>{returnZeroIfNaN(Math.floor(+traindamage / 2) + +miscdamage)}</p>
                        <p className={position !== "four" ? "" : "initfour"}>{miscinit}</p>
                        <p>To</p>
                    </div>
                </div>
            )
        }

        let measureAndParry = (<div className="armorBaseStats">
            <div>
                <p>Meas.</p>
                <p>{basemeasure}</p>
            </div>
            <div>
                <p>Parry</p>
                <p>{baseparry}</p>
            </div>
        </div>)
        if (position === "four") {
            measureAndParry = (null)
        }

        let miscInputs = (
            <div className="weaponCalculatedStats">
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <p className={position !== "four" ? "" : "initfour"}> </p>
                <p>Mi</p>
            </div>
        )
        if (id !== 'blank') {
            miscInputs = (
                <div className="weaponCalculatedStats">
                    <input type="number" value={miscattack} onChange={event => this.updateValue(event.target.value, "miscattack")} />
                    <input type="number" value={miscrecovery} onChange={event => this.updateValue(event.target.value, "miscrecovery")} />
                    <input type="number" value={miscparry} onChange={event => this.updateValue(event.target.value, "miscparry")} />
                    <input type="number" value={miscdamage} onChange={event => this.updateValue(event.target.value, "miscdamage")} />
                    <input className={position !== "four" ? "" : "initfour"} type="number" value={miscinit} onChange={event => this.updateValue(event.target.value, "miscinit")} />
                    <p>Mi</p>
                </div>
            )
        }

        return (
            <div className={`weaponProfile${position} weaponProfileShell`}>
                <h2>Weapon Workspace</h2>
                <p className="weaponnameLocation">{name}</p>
                <div className="armorBaseStats">
                    <p>Damage</p>
                    <p className="basedamageLocation">{basedamage}</p>
                </div>
                <div className="armorBaseStats">
                    <div>
                        <p>Recov.</p>
                        <p>{baserecovery}</p>
                    </div>
                    <div>
                        <p>Size</p>
                        <p>{size}</p>
                    </div>
                </div>
                {measureAndParry}
                <div className="armorBaseStats">
                    <p>Type</p>
                    <p className="basedamageLocation">{type}</p>
                </div>
                <div className={position !== "four" ? "weaponBonusArea" : "weaponBonusArea bonusfour"}>
                    <p>Bonus</p>
                    <p>{bonus}</p>
                </div>
                <div className="weaponTraitArea">
                    <p>Traits</p>
                    <p className={position !== "four" ? "traitsLocation" : "traitsLocation traitsfour"}>{traits}</p>
                </div>

                <div className="weaponCalculatedStats weaponCalculatedStatsHeader">
                    <p>Atk</p>
                    <p>Rcv</p>
                    <p>Pry</p>
                    <p>Dam</p>
                    <p>Init</p>
                    <p> </p>
                </div>

                <div className="weaponCalculatedStats">
                    <p>{trainattack}</p>
                    <p>{trainrecovery}</p>
                    <p>{trainparry}</p>
                    <p>{traindamage}</p>
                    <p> </p>
                    <p>Ski</p>
                </div>

                {miscInputs}

                <div className="weaponCalculatedStats">
                    <p>{returnZeroIfNaN(trainattack + +miscattack)}</p>
                    <p>{returnZeroIfNaN((Math.floor(trainrecovery / 2) * -1) + +miscrecovery)}</p>
                    <p>{returnZeroIfNaN(+trainparry + +miscparry)}</p>
                    <p>{returnZeroIfNaN(Math.floor(+traindamage / 2) + +miscdamage)}</p>
                    <p className={position !== "four" ? "" : "initfour"}>{miscinit}</p>
                    <p>To</p>
                </div>
            </div>
        )
    }
}