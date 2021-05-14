import React, { Component } from 'react'
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
        let { name, race, primarya, secondarya, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, primarylevel, secondarylevel, temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry,
            onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery, onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, twomiscrecovery, twomiscdamage,
            twomiscinit, twoname, twobasedamage, twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize, threetrainattack, threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, threemiscparry, threemiscrecovery, threemiscdamage,
            threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack, skills, skilladept,
            fourmiscrecovery, fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery,
            armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef, armorbaserecovery, armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus,
            shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, skillsuites, nativelanguage, weaponone, weapontwo, weaponthree, weaponfour } = this.state.character
        let { updateCharacter, cancelUpdate } = this.state
            , { isUpdating } = this.props

        let editButton = (<i onClick={_ => updateCharacter(this.state.character)} className="fas fa-save"></i>)
        if (isUpdating) {
            editButton = (<i className="fas fa-spinner spinner-tiny"></i>)
        }

        return (
            <div>
                <div id="pdf" className='pdfViewStylings'>
                    <div className="pageOne pageBase pageViewStylings">
                        <input className="nameLocation" type="text" defaultValue={name} onChange={event => this.updateAttribute(event.target.value, "name")} />
                        <input className="raceLocation" type="text" defaultValue={race} onChange={event => this.updateAttribute(event.target.value, "race")} />
                        <input className="primaryLocation" type="text" defaultValue={primarya} onChange={event => this.updateAttribute(event.target.value, "primarya")} />
                        <input className="primarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={primarylevel} onChange={event => this.updateAttribute(event.target.value, "primarylevel")} />
                        <input className="secondaryLocation" type="text" defaultValue={secondarya} onChange={event => this.updateAttribute(event.target.value, "secondarya")} />
                        <input className="secondarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={secondarylevel} onChange={event => this.updateAttribute(event.target.value, "secondarylevel")} />
                        <input className="levelLocation" type="number" min="1" defaultValue={level} onChange={event => this.updateAttribute(event.target.value, "level")} />
                        <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => this.updateAttribute(event.target.value, "crp")} />
                        <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onChange={event => this.updateAttribute(event.target.value, "excurrent")} />
                        <textarea className="drawbackLocation drawbacktextArea" defaultValue={drawback} onChange={event => this.updateAttribute(event.target.value, "drawback")} maxLength="165"></textarea>

                        <input className="strLocation" type="number" max="20" min="1" defaultValue={str} onChange={event => this.updateAttribute(event.target.value, "str")} />
                        <input className="dexLocation" type="number" max="20" min="1" defaultValue={dex} onChange={event => this.updateAttribute(event.target.value, "dex")} />
                        <input className="conLocation" type="number" max="20" min="1" defaultValue={con} onChange={event => this.updateAttribute(event.target.value, "con")} />
                        <input className="intLocation" type="number" max="20" min="1" defaultValue={int} onChange={event => this.updateAttribute(event.target.value, "int")} />
                        <input className="wisLocation" type="number" max="20" min="1" defaultValue={wis} onChange={event => this.updateAttribute(event.target.value, "wis")} />
                        <input className="chaLocation" type="number" max="20" min="1" defaultValue={cha} onChange={event => this.updateAttribute(event.target.value, "cha")} />

                        <input className="crawlLocation" type="text" defaultValue={crawl} onChange={event => this.updateAttribute(event.target.value, "crawl")} />
                        <input className="walkLocation" type="text" defaultValue={walk} onChange={event => this.updateAttribute(event.target.value, "walk")} />
                        <input className="jogLocation" type="text" defaultValue={jog} onChange={event => this.updateAttribute(event.target.value, "jog")} />
                        <input className="runLocation" type="text" defaultValue={run} onChange={event => this.updateAttribute(event.target.value, "run")} />
                        <input className="sprintLocation" type="text" defaultValue={sprint} onChange={event => this.updateAttribute(event.target.value, "sprint")} />

                        <input className="honorLocation" type="number" max="25" min="0" defaultValue={honor} onChange={event => this.updateAttribute(event.target.value, "honor")} />
                        <input className="temperamentLocation" type="text" defaultValue={temperament} onChange={event => this.updateAttribute(event.target.value, "temperament")} />
                        <EditList stylings={{ top: '358px', left: '20px', width: '224px' }} listArray={goals} limit={3} updateFunction={this.updateAttribute} type={"goals"} />
                        <EditPairList stylings={{ top: '508px', left: '20px', width: '224px' }} listArray={devotions} limit={3} updateFunction={this.updateAttribute} type={"devotions"} />
                        <EditPairList stylings={{ top: '593px', left: '20px', width: '427px', height: '67px' }} rowWidth={'212px'} listArray={flaws} limit={6} updateFunction={this.updateAttribute} type={"flaws"} defaultValue={"d4!+Stress"} />
                        <EditPairList stylings={{ top: '383px', left: '246px', width: '200px' }} listArray={traits} limit={9} updateFunction={this.updateAttribute} type={"traits"} />
                        <EditList stylings={{ top: '610px', left: '107px', width: '340px' }} listArray={reputation} limit={3} updateFunction={this.updateAttribute} type={"reputation"} />
                        <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onChange={event => this.updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>

                        <input className="stressthresholdLocation" type="number" min="0" defaultValue={stressthreshold} placeholder={stressthreshold ? stressthreshold : +wis * 3} onChange={event => this.updateAttribute(event.target.value, "stressthreshold")} />
                        <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => this.updateAttribute(event.target.value, "favormax")} />

                        <input className="maxrangeLocation" type="number" defaultValue={maxrange} onChange={event => this.updateAttribute(event.target.value, "maxrange")} />

                        <input className="criticalLocation" type="number" defaultValue={vitality} onChange={event => this.updateAttribute(event.target.value, "vitality")} />
                        <input className="sizemodLocation" type="number" min="0" defaultValue={sizemod} onChange={event => this.updateAttribute(event.target.value, "sizemod")} />
                        <input className="vitalityrollLocation" type="number" min="0" defaultValue={vitalityroll} onChange={event => this.updateAttribute(event.target.value, "vitalityroll")} />
                        <input className="vitalitydiceLocation" type="text" defaultValue={vitalitydice} onChange={event => this.updateAttribute(event.target.value, "vitalitydice")} />

                        <textarea className="abilitiesoneLocation abilitiesonetextArea" defaultValue={abilitiesone} onChange={event => this.updateAttribute(event.target.value, "abilitiesone")} maxLength={"300"}></textarea>
                        <textarea className="abilitiestwoLocation abilitiestwotextArea" defaultValue={abilitiestwo} onChange={event => this.updateAttribute(event.target.value, "abilitiestwo")} maxLength={"310"}></textarea>
                        <textarea className="abilitiesthreeLocation abilitiesthreetextArea" defaultValue={abilitiesthree} onChange={event => this.updateAttribute(event.target.value, "abilitiesthree")} maxLength={"250"}></textarea>
                        <input className="removedabilityLocation" type="text" defaultValue={removedability} onChange={event => this.updateAttribute(event.target.value, "removedability")} />
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

                        <WeaponBlock  weapon={weaponone} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true}/>
                        <WeaponBlock  weapon={weapontwo} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true}/>
                        <WeaponBlock  weapon={weaponthree} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true}/>
                        <WeaponBlock  weapon={weaponfour} updateObject={this.updateObject} returnZeroIfNaN={null} editing={true}/>

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