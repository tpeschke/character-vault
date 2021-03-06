import React, { Component } from 'react';
import axios from "axios"

export default class ArmorBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props,
            armorChoices: [],
            armorOptions: []
        }
    }

    componentWillMount() {
        let { armorChoices, armorOptions } = this.state
        axios.get(`https://bonfire.dragon-slayer.net/getArmor`).then(({ data }) => {
            armorChoices = data
            armorChoices.push({ def: 0, dr: 0, fatigue: 0, name: "Unarmored", init: 0, rec: 0, skill: 0 })
            armorOptions = data.map(choice => {
                return <option value={choice.name} />
            })
            this.setState({ armorChoices, armorOptions })
        })
    }

    changeArmorName = (event) => {
        let selectedName = event.target.value
        let { armorChoices, armor, updateManyArrributes } = this.state

        for (let i = 0; i < armorChoices.length; i++) {
            if (selectedName === armorChoices[i].name) {
                let { def, dr, fatigue, name, init, rec, skill } = armorChoices[i]
                let newArmor = {armordr: dr, armorbasedef: def, armorname: name, armorbasefatiguemod: fatigue, armorbaseinit: init, armorbaserecovery: rec, armorskilladj: skill}
                armor = { ...armor, ...newArmor }
                updateManyArrributes(armor)
                this.setState({ armor })
                i = armorChoices.length
            }
        }
    }

    render() {
        let { armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbasefatiguemod, armorbaserecovery, armorbaseinit,
            armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, armormiscdef, updateAttribute, armormiscfatigue,
            armormiscrecovery, armormiscinit, armorRecovery, armorFatigue, returnZeroIfNaN, id, calculateArmorDefense, armorbasefatigue } = this.state.armor
        let { editing, armorOptions } = this.state

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

        if (editing) {
            return (
                <div className="armorBlockShell">
                    <h2>Armor Workspace</h2>
                    <input className="armornameLocation" defaultValue={armorname} type="text" list="armorChoices" onBlur={this.changeArmorName} />
                    <datalist id="armorChoices">
                        {armorOptions}
                    </datalist>
                    <div className="basicStats">
                        <p>DR</p>
                        <input type="text" value={armordr} onChange={event => updateAttribute(event.target.value, "armordr")} />
                    </div>
                    <div className="basicStats">
                        <p>Skill Adju.</p>
                        <input type="number" value={armorskilladj} onChange={event => updateAttribute(event.target.value, "armorskilladj")} />
                    </div>
                    <div className="armorBonusArea">
                        <p>Bonus</p>
                        <textarea value={armorbonus} onChange={event => updateAttribute(event.target.value, "armorbonus")} maxLength={"60"}></textarea>
                    </div>

                    <div className="calculatedStats calculatedStatsHeading">
                        <p>Def</p>
                        <p>Fat</p>
                        <p>Rcv</p>
                        <p>Init</p>
                        <p> </p>
                    </div>
                    <div className="calculatedStats">
                        <input type="number" value={armorbasedef} onChange={event => updateAttribute(event.target.value, "armorbasedef")} />
                        <input type="text" value={armorbasefatiguemod} onChange={event => updateAttribute(event.target.value, "armorbasefatiguemod")} />
                        <input type="number" value={armorbaserecovery} onChange={event => updateAttribute(event.target.value, "armorbaserecovery")} />
                        <input type="number" value={armorbaseinit} onChange={event => updateAttribute(event.target.value, "armorbaseinit")} />
                        <p>Base</p>
                    </div>

                    <div className="calculatedStats">
                        <input type="number" value={armortrainingdef} onChange={event => updateAttribute(event.target.value, "armortrainingdef")} />
                        <input type="number" value={armortrainfatigue} onChange={event => updateAttribute(event.target.value, "armortrainfatigue")} />
                        <input type="number" value={armortrainrecovery} onChange={event => updateAttribute(event.target.value, "armortrainrecovery")} />
                        <input type="number" value={armortraininit} onChange={event => updateAttribute(event.target.value, "armortraininit")} />
                        <p>Skills</p>
                    </div>

                    <div className="calculatedStats">
                        <input type="number" value={armormiscdef} onBlur={event => updateAttribute(event.target.value, "armormiscdef")} />
                        <input type="number" value={armormiscfatigue} onBlur={event => updateAttribute(event.target.value, "armormiscfatigue")} />
                        <input type="number" value={armormiscrecovery} onBlur={event => updateAttribute(event.target.value, "armormiscrecovery")} />
                        <input type="number" value={armormiscinit} onChange={event => updateAttribute(event.target.value, "armormiscinit")} />
                        <p>Misc</p>
                    </div>

                    <div className="calculatedStats">
                        <p>{+armorbasedef + +armortrainingdef < 0 ? +armorbasedef + +armortrainingdef + +armormiscdef : 0 + +armormiscdef}</p>
                        <p>{returnZeroIfNaN(+armorbasefatiguemod + +armortrainfatigue + +armormiscfatigue)}</p>
                        <p>{armorRecovery}</p>
                        <p>{+armorbaseinit + +armortraininit > 0 ? +armorbaseinit + +armortraininit + +armormiscinit : 0 + +armormiscinit}</p>
                        <p>Total</p>
                    </div>
                </div>
            )
        }

        let miscInputs = (
            <div className="calculatedStats">
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
                <p>Misc</p>
            </div>
        )
        if (id !== 'blank') {
            miscInputs = (
                <div className="calculatedStats">
                    <input type="number" value={armormiscdef} onBlur={event => updateAttribute(event.target.value, "armormiscdef")} />
                    <input type="number" value={armormiscfatigue} onBlur={event => updateAttribute(event.target.value, "armormiscfatigue")} />
                    <input type="number" value={armormiscrecovery} onBlur={event => updateAttribute(event.target.value, "armormiscrecovery")} />
                    <input type="number" value={armormiscinit} onChange={event => updateAttribute(event.target.value, "armormiscinit")} />
                    <p>Misc</p>
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
                    <p>{armorbasefatiguemod}</p>
                    <p>{armorbaserecovery}</p>
                    <p>{armorbaseinit}</p>
                    <p>Base</p>
                </div>

                <div className="calculatedStats">
                    <p>{armortrainingdef}</p>
                    <p>{armortrainfatigue}</p>
                    <p>{armortrainrecovery}</p>
                    <p>{armortraininit}</p>
                    <p>Skills</p>
                </div>

                {miscInputs}

                <div className="calculatedStats">
                    <p>{returnZeroIfNaN(armorbasedef + armortrainingdef < 0 ? armorbasedef + armortrainingdef + armormiscdef : 0 + + armormiscdef)}</p>
                    <p>{id !== 'blank' ? returnZeroIfNaN(armorbasefatiguemod + armortrainfatigue + armormiscfatigue) : ''}</p>
                    <p>{armorRecovery}</p>
                    <p>{returnZeroIfNaN(armorbaseinit + armortraininit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0 + armormiscinit)}</p>
                    <p>Total</p>
                </div>
            </div>
        )
    }
}