import React, { Component } from 'react'
import Abilities from './components/pageOne/abilities'
import CharacterInfo from './components/pageOne/characterInfo'
import MiscVitals from './components/pageOne/miscVitals'
import Movement from './components/pageOne/movement'
import Ranges from './components/pageOne/ranges'
import Social from './components/pageOne/social'
import Stats from './components/pageOne/stats'
import Vitality from './components/pageOne/vitality'
import Skills from './components/pageTwo/skill'
import WeaponBlock from './components/pageTwo/weaponBlock'
import CashAndGear from './components/pageTwo/cashAndGear'
import ArmorBlock from './components/pageTwo/armorBlock'
import ShieldBlock from './components/pageTwo/shieldBlock'

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
            , skillsObject = { skillsuites, nativelanguage, skills, skilladept, int, updateAttribute: this.updateAttribute, updateSkillsuites: this.updateSkillsuites, updateNativeLanguage: this.updateNativeLanguage }
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
                        <Skills skillsObject={skillsObject} editing={true}/>

                        <CashAndGear cashAndGear={cashAndGear} editing={true}/>

                        <ArmorBlock armor={armor} editing={true}/>

                        <ShieldBlock shield={shield} editing={true} />

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