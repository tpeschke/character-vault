import React, { Component } from 'react'
import Abilities from './components/pageOne/abilities'
import CharacterInfo from './components/pageOne/characterInfo'
import MiscVitals from './components/pageOne/miscVitals'
import Movement from './components/pageOne/movement'
import Ranges from './components/pageOne/ranges'
import Social from './components/pageOne/social'
import Stats from './components/pageOne/stats'
import Vitality from './components/pageOne/vitality'
import WeaponBlock from './components/pageTwo/weaponBlock'
import EditList from './components/pairComponents/editList'
import EditPairList from './components/pairComponents/editPairList'
import EditSkillList from './components/pairComponents/editSkillList'

export default class CharacterEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: { ...props.character },
            updateCharacter: props.updateCharacter,
            downloadMode: props.downloadMode,
            cancelUpdate: props.cancelUpdate
        }
    }

    updateAttribute = (value, type) => {
        let character = { ...this.state.character }
        character[type] = value
        this.setState({ character })
    }

    updateObject = (object, key, value) => {
        let character = { ...this.state.character }
        character[object][key] = value
        this.setState({ character })
    }

    updateSkillsuites = (value, index) => {
        let skillsuites = []
        let character = { ...this.state.character }
        character.skillsuites.forEach(skillsuite => { skillsuites.push({ ...skillsuite }) })
        skillsuites[index].rank = +value
        character = { ...character, skillsuites }
        this.setState({ character })
    }

    updateNativeLanguage = (value, type) => {
        let updatedValue
        if (type !== 'language') {
            updatedValue = { [type]: +value }
        } else {
            updatedValue = { [type]: value }
        }
        let character = { ...this.state.character, nativelanguage: { ...this.state.character.nativelanguage, ...updatedValue } }
        this.setState({ character })
    }

    render() {
        let { name, race, primarya, secondarya, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality: vitalityTotal, vitalitydice, vitalityroll, wis, int, primarylevel, secondarylevel, 
            temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, skills, skilladept,
            armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef, armorbaserecovery, 
            armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus,
            shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, skillsuites, 
            nativelanguage, weaponone, weapontwo, weaponthree, weaponfour } = this.state.character
        let { updateCharacter, cancelUpdate } = this.state
            , { isUpdating } = this.props

        let editButton = (<i onClick={_ => updateCharacter(this.state.character)} className="fas fa-save"></i>)
        if (isUpdating) {
            editButton = (<i className="fas fa-spinner spinner-tiny"></i>)
        }

        let characterInfo = { name, race, primarylevel, primarya, secondarylevel, secondarya, level, crp, excurrent, drawback, updateAttribute: this.updateAttribute }
            , stats = { str, dex, con, int, wis, cha, updateAttribute: this.updateAttribute }
            , movement = { crawl, walk, jog, run, sprint, updateAttribute: this.updateAttribute }
            , social = { updateAttribute: this.updateAttribute, temperament, goals, devotions, flaws, traits, reputation, contacts, honor }
            , miscVitals = { con, updateAttribute: this.updateAttribute, favormax, stressthreshold, wis }
            , vitality = { updateAttribute: this.updateAttribute, sizemod, vitalitydice, vitalityroll, vitalityTotal }
            , abilities = { abilitiesone, abilitiestwo, abilitiesthree, removedability, updateAttribute: this.updateAttribute }
            , skillsObject = { skillsuites, nativelanguage, skills, skilladept, int, updateAttribute: this.updateAttribute }
            , cashAndGear = { copper, updateAttribute: this.updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, updateAttribute: this.updateAttribute }
            , armor = {
                armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbaseencumb, armorbaserecovery, armorbaseinit,
                armortrainingdef, armortrainencumb, armortrainrecovery, armortraininit, armormiscdef, updateAttribute: this.updateAttribute, armormiscencumb,
                armormiscrecovery, armormiscinit
            }
            , shield = {
                shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbaseencumb, shieldbasebreak,
                shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscencumb, shieldmiscbreak,
                returnZeroIfNaN: this.returnZeroIfNaN, updateAttribute: this.updateAttribute, shieldsize
            }

        return (
            <div>
                <div id="pdf" className='pdfViewStylings'>
                    <div className="pageOne pageBase pageViewStylings">
                        <CharacterInfo characterInfo={characterInfo} editing={true}/>

                        <Stats stats={stats} editing={true}/>

                        <Movement movement={movement} editing={true}/>

                        <Social social={social} editing={true}/>

                        <MiscVitals miscVitals={miscVitals} editing={true}/>

                        <Ranges maxrange={maxrange} updateAttribute={this.updateAttribute} editing={true}/>

                        <Vitality vitality={vitality} editing={true}/>

                        <Abilities abilities={abilities} editing={true}/>
                    </div>
                    <div className="pageTwo pageTwoMargin pageBase pageViewStylings">
                        <div className="skillDiscount">
                            <input className="skilladeptLocation" type="number" defaultValue={skilladept} onChange={event => this.updateAttribute(event.target.value, "skilladept")} />
                        </div>
                        <div className="skillsuiteShell">
                            <div className="skillRow athletics">
                                <p className="skillcost athletics">{skillsuites[0].skillsuitebasecost + (skillsuites[0].rank * 2)}</p>
                                <input className="skillrank athletics" type="number" defaultValue={skillsuites[0].rank} onChange={event => this.updateSkillsuites(event.target.value, 0)} />
                            </div>
                            <div className="skillRow lore">
                                <p className="skillcost lore">{skillsuites[1].skillsuitebasecost + (skillsuites[1].rank * 2)}</p>
                                <input className="skillrank lore" type="number" defaultValue={skillsuites[1].rank} onChange={event => this.updateSkillsuites(event.target.value, 1)} />
                            </div>
                            <div className="skillRow streetwise">
                                <p className="skillcost streetwise">{skillsuites[2].skillsuitebasecost + (skillsuites[2].rank * 2)}</p>
                                <input className="skillrank streetwise" type="number" defaultValue={skillsuites[2].rank} onChange={event => this.updateSkillsuites(event.target.value, 2)} />
                            </div>
                            <div className="skillRow survival">
                                <p className="skillcost survival">{skillsuites[3].skillsuitebasecost + (skillsuites[3].rank * 2)}</p>
                                <input className="skillrank survival" type="number" defaultValue={skillsuites[3].rank} onChange={event => this.updateSkillsuites(event.target.value, 3)} />
                            </div>
                            <div className="skillRow tactics">
                                <p className="skillcost tactics">{skillsuites[4].skillsuitebasecost + (skillsuites[4].rank * 2)}</p>
                                <input className="skillrank tactics" type="number" defaultValue={skillsuites[4].rank} onChange={event => this.updateSkillsuites(event.target.value, 4)} />
                            </div>
                            <div className="skillRow trades">
                                <p className="skillcost trades">{skillsuites[5].skillsuitebasecost + (skillsuites[5].rank * 2)}</p>
                                <input className="skillrank trades" type="number" defaultValue={skillsuites[5].rank} onChange={event => this.updateSkillsuites(event.target.value, 5)} />
                            </div>
                            <div className="skillRow weirdcraft">
                                <p className="skillcost weirdcraft">{skillsuites[6].skillsuitebasecost + (skillsuites[6].rank * 2)}</p>
                                <input className="skillrank weirdcraft" type="number" defaultValue={skillsuites[6].rank} onChange={event => this.updateSkillsuites(event.target.value, 6)} />
                            </div>
                            <div className="nativeRow">
                                <input id="nativename" type="text" defaultValue={nativelanguage.language} onChange={event => this.updateNativeLanguage(event.target.value, 'language')} />
                                <p id="nativecost">{5 + (nativelanguage.rank || 0 * 2)}</p>
                                <input id="nativerank" type="number" placeholder={Math.ceil(int / 2)} defaultValue={nativelanguage.rank} onChange={event => this.updateNativeLanguage(event.target.value, 'rank')} />
                            </div>
                        </div>
                        <EditSkillList stylings={{ top: '42px', left: '247px', width: '549px', height: '275px' }} rowWidth={'274px'} limit={26} listArray={skills} updateFunction={this.updateAttribute} type={"skills"} />

                        <input className="copperLocation" type="text" defaultValue={copper} onChange={event => this.updateAttribute(event.target.value, "copper")} />
                        <input className="silverLocation" type="text" defaultValue={silver} onChange={event => this.updateAttribute(event.target.value, "silver")} />
                        <input className="goldLocation" type="text" defaultValue={gold} onChange={event => this.updateAttribute(event.target.value, "gold")} />
                        <input className="platiniumLocation" type="text" defaultValue={platinium} onChange={event => this.updateAttribute(event.target.value, "platinium")} />
                        <EditPairList stylings={{ top: '379px', left: '20px', width: '201px' }} listArray={gearone} limit={6} updateFunction={this.updateAttribute} type={"gearone"} />
                        <EditPairList stylings={{ top: '379px', left: '221px', width: '199px' }} listArray={geartwo} limit={6} updateFunction={this.updateAttribute} type={"geartwo"} />
                        <EditPairList stylings={{ top: '379px', left: '422px', width: '198px' }} listArray={gearthree} limit={6} updateFunction={this.updateAttribute} type={"gearthree"} />
                        <EditPairList stylings={{ top: '379px', left: '619px', width: '175px' }} listArray={gearfour} limit={6} updateFunction={this.updateAttribute} type={"gearfour"} />

                        <input className="shieldnameLocation" type="text" defaultValue={shieldname} onChange={event => this.updateAttribute(event.target.value, "shieldname")} />
                        <input className="shielddrLocation" type="text" defaultValue={shielddr} onChange={event => this.updateAttribute(event.target.value, "shielddr")} />
                        <input className="shieldcoverLocation" type="text" defaultValue={shieldcover} onChange={event => this.updateAttribute(event.target.value, "shieldcover")} />
                        <input className="shieldsizeLocation" type="text" defaultValue={shieldsize} onChange={event => this.updateAttribute(event.target.value, "shieldsize")} />
                        <textarea className="shieldbonusLocation shieldbonustextArea" defaultValue={shieldbonus} onChange={event => this.updateAttribute(event.target.value, "shieldbonus")} maxLength={"60"}></textarea>

                        <input className="shieldbasedefLocation" type="number" defaultValue={shieldbasedef} onChange={event => this.updateAttribute(event.target.value, "shieldbasedef")} />
                        <input className="shieldbaseparryLocation" type="number" defaultValue={shieldbaseparry} onChange={event => this.updateAttribute(event.target.value, "shieldbaseparry")} />
                        <input className="shieldbaseencumbLocation" type="number" defaultValue={shieldbaseencumb} onChange={event => this.updateAttribute(event.target.value, "shieldbaseencumb")} />
                        <input className="shieldbasebreakLocation" type="number" defaultValue={shieldbasebreak} onChange={event => this.updateAttribute(event.target.value, "shieldbasebreak")} />

                        <input className="shieldtraindefLocation" type="number" defaultValue={shieldtraindef} onChange={event => this.updateAttribute(event.target.value, "shieldtraindef")} />
                        <input className="shieldtrainparryLocation" type="number" defaultValue={shieldtrainparry} onChange={event => this.updateAttribute(event.target.value, "shieldtrainparry")} />
                        <input className="shieldtrainencumbLocation" type="number" defaultValue={shieldtrainencumb} onChange={event => this.updateAttribute(event.target.value, "shieldtrainencumb")} />
                        <input className="shieldtrainbreakLocation" type="number" defaultValue={shieldtrainbreak} onChange={event => this.updateAttribute(event.target.value, "shieldtrainbreak")} />

                        <input className="shieldmiscdefLocation" type="number" defaultValue={shieldmiscdef} onChange={event => this.updateAttribute(event.target.value, "shieldmiscdef")} />
                        <input className="shieldmiscparryLocation" type="number" defaultValue={shieldmiscparry} onChange={event => this.updateAttribute(event.target.value, "shieldmiscparry")} />
                        <input className="shieldmiscencumbLocation" type="number" defaultValue={shieldmiscencumb} onChange={event => this.updateAttribute(event.target.value, "shieldmiscencumb")} />
                        <input className="shieldmiscbreakLocation" type="number" defaultValue={shieldmiscbreak} onChange={event => this.updateAttribute(event.target.value, "shieldmiscbreak")} />

                        <input className="armornameLocation" type="text" defaultValue={armorname} onChange={event => this.updateAttribute(event.target.value, "armorname")} />
                        <input className="armordrLocation" type="text" defaultValue={armordr} onChange={event => this.updateAttribute(event.target.value, "armordr")} />
                        <input className="armorskilladjLocation" type="number" defaultValue={armorskilladj} onChange={event => this.updateAttribute(event.target.value, "armorskilladj")} />
                        <textarea className="armorbonusLocation armorbonustextArea" defaultValue={armorbonus} onChange={event => this.updateAttribute(event.target.value, "armorbonus")} maxLength={"60"}></textarea>

                        <input className="armorbasedefLocation" type="number" defaultValue={armorbasedef} onChange={event => this.updateAttribute(event.target.value, "armorbasedef")} />
                        <input className="armorbaseencumbLocation" type="number" defaultValue={armorbaseencumb} onChange={event => this.updateAttribute(event.target.value, "armorbaseencumb")} />
                        <input className="armorbaserecoveryLocation" type="number" defaultValue={armorbaserecovery} onChange={event => this.updateAttribute(event.target.value, "armorbaserecovery")} />
                        <input className="armorbaseinitLocation" type="number" defaultValue={armorbaseinit} onChange={event => this.updateAttribute(event.target.value, "armorbaseinit")} />

                        <input className="armortrainingdefLocation" type="number" defaultValue={armortrainingdef} onChange={event => this.updateAttribute(event.target.value, "armortrainingdef")} />
                        <input className="armortrainencumbLocation" type="number" defaultValue={armortrainencumb} onChange={event => this.updateAttribute(event.target.value, "armortrainencumb")} />
                        <input className="armortrainrecoveryLocation" type="number" defaultValue={armortrainrecovery} onChange={event => this.updateAttribute(event.target.value, "armortrainrecovery")} />
                        <input className="armortraininitLocation" type="number" defaultValue={armortraininit} onChange={event => this.updateAttribute(event.target.value, "armortraininit")} />

                        <input className="armormiscdefLocation" type="number" defaultValue={armormiscdef} onChange={event => this.updateAttribute(event.target.value, "armormiscdef")} />
                        <input className="armormiscencumbLocation" type="number" defaultValue={armormiscencumb} onChange={event => this.updateAttribute(event.target.value, "armormiscencumb")} />
                        <input className="armormiscrecoveryLocation" type="number" defaultValue={armormiscrecovery} onChange={event => this.updateAttribute(event.target.value, "armormiscrecovery")} />
                        <input className="armormiscinitLocation" type="number" defaultValue={armormiscinit} onChange={event => this.updateAttribute(event.target.value, "armormiscinit")} />

                        <WeaponBlock weapon={weaponone} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true} />
                        <WeaponBlock weapon={weapontwo} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true} />
                        <WeaponBlock weapon={weaponthree} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true} />
                        <WeaponBlock weapon={weaponfour} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true} />

                        <textarea className="generalnotesLocation generalnotestextArea" defaultValue={generalnotes} onChange={event => this.updateAttribute(event.target.value, "generalnotes")} maxLength={"500"}></textarea>
                    </div>

                </div>
                <div className='Buttons'>
                    <div className="left-corner-button corner-button">
                        <i onClick={cancelUpdate} className="fas fa-window-close"></i>
                    </div>
                    <div className="right-corner-button corner-button">
                        {editButton}
                    </div>
                </div>
            </div>
        )
    }
}