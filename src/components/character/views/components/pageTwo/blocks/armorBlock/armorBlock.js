import React, { Component } from 'react';
import './armorBlock.css'
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

export default class ArmorBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props,
            armorChoices: [],
            armorOptions: [],
            seed: Math.random()
        }
    }

    componentWillMount() {
        let { armorChoices, armorOptions } = this.state
        axios.get(`https://bonfire.stone-fish.com/getArmor`).then(({ data }) => {
            armorChoices = data
            armorChoices.push({ def: 0, dr: 0, fatigue: 0, name: "Unarmored", init: 0, rec: 0, skill: 0 })
            armorOptions = data.sort(sortFunction).map(choice => {
                return <option value={choice.name} />
            })
            this.setState({ armorChoices, armorOptions })
        })
    }

    changeArmorName = (event) => {
        let selectedName = event.target.value
        let { armorChoices, armor, updateManyAttributes } = this.state

        if (selectedName) {
            for (let i = 0; i < armorChoices.length; i++) {
                if (selectedName === armorChoices[i].name) {
                    let { def, dr, fatigue, name, init, rec, skill } = armorChoices[i]
                    let newArmor = { armordr: dr, armorbasedef: def, armorname: name, armorbasefatiguemod: fatigue, armorbaseinit: init, armorbaserecovery: rec, armorskilladj: skill }
                    armor = { ...armor, ...newArmor }
                    updateManyAttributes(armor)
                    this.setState({ armor })
                    i = armorChoices.length
                }
            }
        } else {
            let newArmor = { armordr: null, armorbasedef: null, armorname: null, armorbasefatiguemod: null, armorbaseinit: null, armorbaserecovery: null, armorskilladj: null }
            armor = { ...armor, ...newArmor }
            updateManyAttributes(armor)
            this.setState({ armor, seed: Math.random() })
        }
    }

    toggleArmor = () => {
        this.state.armor.toggleArmor()
        this.setState({ armor: { ...this.state.armor, showArmor: !this.state.armor.showArmor }, seed: Math.random() })
    }

    calculateArmorDefense = (base, ranks, misc) => {
        let baseAndRanks = +base + +ranks
        let addToDefense = 0

        if (baseAndRanks > 0) {
            addToDefense = Math.floor(baseAndRanks / 3)
            baseAndRanks = 0
        }

        if (this.state.armor.id !== 'blank' && isNaN(baseAndRanks + addToDefense + +misc)) {
            return 0
        } else if (this.state.armor.id === 'blank') {
            return ''
        }
        return baseAndRanks + addToDefense + +misc
    }

    updateAttribute = (value, type) => {
        this.setState({ armor: { ...this.state.armor, [type]: value } })
        this.state.armor.updateAttribute(value, type)
    }

    render() {
        let { armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbasefatiguemod, armorbaserecovery, armorbaseinit,
            armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, armormiscdef, armormiscfatigue,
            armormiscrecovery, armormiscinit, armorFatigue, returnZeroIfNaN, id, armorbasefatigue, showArmor } = this.state.armor
        let { editing, armorOptions } = this.state

        function creatPairs(label, value, classes, updateName) {
            if (editing && updateName) {
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

        function createStatCalculation(label, classes, updateValues) {
            if (editing && updateValues) {
                return (
                    <div className={classes}>
                        <input type="number" value={label[0]} onChange={event => this.updateAttribute(event.target.value, label[0])} />
                        <input type="number" value={label[1]} onChange={event => this.updateAttribute(event.target.value, label[1])} />
                        <input type="number" value={label[2]} onChange={event => this.updateAttribute(event.target.value, label[2])} />
                        <input type="number" value={label[3]} onChange={event => this.updateAttribute(event.target.value, label[3])} />
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

        if (!armorbasefatiguemod && armorbasefatigue) {
            switch (armorbasefatigue) {
                case 'A':
                    armorbasefatiguemod = -4;
                    break;
                case 'H':
                    armorbasefatiguemod = -3;
                    break;
                case 'B':
                    armorbasefatiguemod = -2;
                    break;
                case 'W':
                    armorbasefatiguemod = -1;
                    break;
                case 'C':
                    armorbasefatiguemod = 0;
                    break;
            }
        }

        return (
            <div className="armorBlockShell" key={this.state.seed}>
                <h2>Armor Workspace</h2>
                {editing ? (
                    <>
                        <input className="armornameLocation" defaultValue={armorname} type="text" list="armorChoices" onChange={this.changeArmorName} />
                        <datalist id="armorChoices">
                            {armorOptions}
                        </datalist>
                    </>
                ) : (
                    <button className="armornameLocation" onClick={this.toggleArmor}><p className={showArmor ? null : 'buttonStrikeThrough'}>{armorname}</p></button>
                )}
                {creatPairs('DR', armordr, 'basicStats', 'armordr')}
                {creatPairs('Skill Adju.', armorskilladj, 'basicStats', 'armorskilladj')}
                <div className='armorBonusArea'>
                    <p>'Bonus'</p>
                    {editing ? (
                        <textarea value={armorbonus} onChange={event => this.updateAttribute(event.target.value, "armorbonus")} maxLength={"60"}></textarea>
                    ) : (
                        <p>{armorbonus}</p>
                    )}
                </div>

                <div className='calculatedStatsShell'>
                    {createStatCalculation(['Def', 'Fat', 'Rcv', 'Init', ''], 'calculatedStats calculatedStatsHeading')}
                    {createStatCalculation([armorbasedef, armorbasefatiguemod, armorbaserecovery, armorbaseinit, "Base"], 'calculatedStats', ["armorbasedef", "armorbasefatiguemod", "armorbaserecovery", "armorbaseinit"])}
                    {createStatCalculation([armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, 'Skill'], 'calculatedStats', ["armortrainingdef", "armortrainfatigue", "armortrainrecovery", "armortraininit"])}
                    <div className="calculatedStats">
                        <input type="number" value={armormiscdef} onChange={event => this.updateAttribute(event.target.value, "armormiscdef")} />
                        <input type="number" value={armormiscfatigue} onChange={event => this.updateAttribute(event.target.value, "armormiscfatigue")} />
                        <input type="number" value={armormiscrecovery} onChange={event => this.updateAttribute(event.target.value, "armormiscrecovery")} />
                        <input type="number" value={armormiscinit} onChange={event => this.updateAttribute(event.target.value, "armormiscinit")} />
                        <p>Misc</p>
                    </div>
                    {createStatCalculation([this.calculateArmorDefense(+armorbasedef, +armortrainingdef, +armormiscdef),
                    id !== 'blank' ? returnZeroIfNaN(armorbasefatiguemod + Math.floor(armortrainfatigue / 2) + armormiscfatigue) : '',
                    id !== 'blank' ? armorbaserecovery + (armortrainrecovery * -1) + armormiscrecovery > 0 ? armorbaserecovery + (armortrainrecovery * -1) + armormiscrecovery : 0 : '',
                    returnZeroIfNaN(armorbaseinit + (+armortraininit * -1) > 0 ? armorbaseinit + (+armortraininit * -1) + armormiscinit : 0 + armormiscinit),
                        'Total'], 'calculatedStats')}
                </div>
            </div>
        )
    }
}

