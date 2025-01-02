import React, { Component } from 'react';
import './weaponBlock.css'
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
            axios.get(`https://bonfire.stone-fish.com/getWeapons/ranged`).then(({ data }) => {
                weaponChoices = data
                weaponOptions = data.sort(sortFunction).map(choice => {
                    return <option value={`${choice.name} (${choice.type})`} />
                })
                this.setState({ weaponChoices, weaponOptions, weaponChoiceType: 'ranged' })
            })
        } else {
            axios.get(`https://bonfire.stone-fish.com/getWeapons/melee`).then(({ data }) => {
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

    rowPairs(label, value, className, updateName) {
        if (this.state.editing && updateName) {
            return (
                <div className={className}>
                    <p>{label}</p>
                    <input type="text" value={value} onChange={event => this.updateValue(event.target.value, updateName)} />
                </div>
            )
        }
        return (
            <div className={className}>
                <p>{label}</p>
                <p>{value}</p>
            </div>
        )
    }

    createStatCalculation(label, classes, position, updateNames) {
        if (position === 'four') {
            if (this.state.editing && updateNames) {
                return (
                    <div className={classes}>
                        <input type="number" value={label[0]} onChange={event => this.updateValue(event.target.value, label[0])} />
                        <input type="number" value={label[1]} onChange={event => this.updateValue(event.target.value, label[1])} />
                        <input type="number" value={label[2]} onChange={event => this.updateValue(event.target.value, label[2])} />
                        <p>{label[4]}</p>
                    </div>
                )
            }
            return (
                <div className={classes}>
                    <p>{label[0]}</p>
                    <p>{label[1]}</p>
                    <p>{label[2]}</p>
                    <p>{label[4]}</p>
                </div>
            )
        }
        if (this.state.editing && updateNames) {
            return (
                <div className={classes}>
                    <input type="number" value={label[0]} onChange={event => this.updateValue(event.target.value, label[0])} />
                    <input type="number" value={label[1]} onChange={event => this.updateValue(event.target.value, label[1])} />
                    <input type="number" value={label[2]} onChange={event => this.updateValue(event.target.value, label[2])} />
                    <input type="number" value={label[3]} onChange={event => this.updateValue(event.target.value, label[3])} />
                    <p>{label[4]}</p>
                </div>
            )
        }
        return (
            <div className={classes}>
                <p>{label[0]}</p>
                <p>{label[1]}</p>
                <p>{label[2]}</p>
                <p>{label[3]}</p>
                <p>{label[4]}</p>
            </div>
        )
    }

    render() {
        let { position, name, basemeasure, basedamage, baseparry, baserecovery, size, type, bonus, traits, trainrecovery, trainattack, traindamage, trainparry,
            miscattack, miscdamage, miscparry, miscrecovery, id } = this.state.weapon
        let { returnZeroIfNaN, editing, weaponOptions, weaponChoiceType } = this.state

        return (
            <div className={`weaponProfileShell`}>
                {editing ? (
                    <>
                        <input className="weaponnameLocation" defaultValue={name} type="text" list={weaponChoiceType} onBlur={e => this.changeWeaponName(e.target.value, type)} />
                        <datalist id={weaponChoiceType}>
                            {weaponOptions}
                        </datalist>
                    </>
                ) : (
                    <p className='nameClass'>{name}</p>
                )}
                {this.rowPairs('Damage', basedamage, 'armorBaseStats', 'basedamage')}
                <div className="weaponPair">
                    {this.rowPairs('Rec', baserecovery, 'armorBaseStats', 'baserecovery')}
                    {this.rowPairs('Size', size, 'armorBaseStats', 'size', 'baseparry')}
                </div>
                {position === 'four' ? (
                    <></>
                ) : (
                    <div className={"weaponPair"}>
                        {this.rowPairs('Meas.', basemeasure, 'armorBaseStats', 'basemeasure')}
                        {this.rowPairs('Parry', baseparry, 'armorBaseStats', 'baseparry')}
                    </div>
                )}
                {this.rowPairs('Type', type, 'armorBaseStats', 'type')}
                <div className="weaponBonusArea">
                    <p>Bonus</p>
                    {editing ? (
                        <textarea value={bonus ? bonus : ''} onChange={event => this.updateValue(event.target.value, "bonus")} maxLength={"75"}></textarea>
                    ) : (
                        <p>{bonus}</p>
                    )}
                </div>
                <div className={position === 'four' ? 'weaponTraitArea weaponTraitAreaFour' : "weaponTraitArea"}>
                    <p>Traits</p>
                    {editing ? (
                        <textarea value={traits} onChange={event => this.updateValue(event.target.value, "traits")} maxLength={"35"}></textarea>
                    ) : (
                        <p>{traits}</p>

                    )}
                </div>

                <div className={position === 'four' ? 'calculatedStatsShell ranged' : 'calculatedStatsShell'}>
                    {this.createStatCalculation(['Atk', 'Rcv', 'Pry', 'Dam', ''], 'calculatedStats calculatedStatsHeading', position)}
                    {this.createStatCalculation([trainattack, trainrecovery, trainparry, traindamage, 'Skill'], 'calculatedStats', position, ['trainattack', 'trainrecovery', 'trainparry', 'traindamage'])}
                    {id === 'blank' ? (
                        this.createStatCalculation([' ', ' ', ' ', ' ', 'Misc'], 'calculatedStats', position)
                    ) : (
                        <div className="calculatedStats">
                            <input type="number" value={miscattack} onChange={event => this.updateValue(event.target.value, "miscattack")} />
                            <input type="number" value={miscrecovery} onChange={event => this.updateValue(event.target.value, "miscrecovery")} />
                            <input className={position === 'four' ? 'displayNone' : ''} type="number" value={miscparry} onChange={event => this.updateValue(event.target.value, "miscparry")} />
                            <input type="number" value={miscdamage} onChange={event => this.updateValue(event.target.value, "miscdamage")} />
                            <p>Misc</p>
                        </div>
                    )}
                    {this.createStatCalculation([returnZeroIfNaN(trainattack + +miscattack),
                    returnZeroIfNaN((Math.ceil(trainrecovery / 2) * -1) + +miscrecovery),
                    returnZeroIfNaN(+trainparry + +miscparry),
                    returnZeroIfNaN(Math.ceil(+traindamage / 2) + +miscdamage),
                        'Total'], 'calculatedStats', position)}
                </div>
            </div >
        )
    }
}
