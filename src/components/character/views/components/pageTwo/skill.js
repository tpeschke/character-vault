import React from 'react'
import ViewSkillList from '../pairComponents/viewSkillList'
import EditSkillList from '../pairComponents/editSkillList'

export default function Skills({ skillsObject, editing }) {
    let { strData, conData, dexData, intData, wisData, chaData, skillsuites, nativelanguage, skills, skilladept, int, updateAttribute, updateNativeLanguage, updateSkillsuites } = skillsObject

    if (editing) {
        return (
            <div className="skillShell">
                <div className="skillLeftShell">
                    <div>
                        <h2>Check Mods & Skill Adepts</h2>
                        <div className="skillDiscount">
                            <div className="skillMods">
                                <div>
                                    <p>Str</p>
                                    <p>{strData.skill}</p>
                                </div>
                                <div>
                                    <p>Dex</p>
                                    <p>{dexData.skill}</p>
                                </div>
                                <div>
                                    <p>Con</p>
                                    <p>{conData.skill}</p>
                                </div>
                                <div>
                                    <p>Int</p>
                                    <p>{intData.skill}</p>
                                </div>
                                <div>
                                    <p>Will</p>
                                    <p>{wisData.skill}</p>
                                </div>
                                <div>
                                    <p>Pre</p>
                                    <p>{chaData.skill}</p>
                                </div>
                            </div>
                            <div className="skillAdept">
                                <p>Skill Adept(s)</p>
                                <input className="skilladeptLocation" type="number" defaultValue={skilladept} onChange={event => updateAttribute(event.target.value, "skilladept")} />
                            </div>
                        </div>
                    </div>
                    <div className="skillsuiteShell">
                        <div className="skillRow">
                            <h2>Skill Suites</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                        <div className="skillRow">
                            <p>Athletics</p>
                            <p className="skillcost">{Math.floor((skillsuites[0].skillsuitebasecost + (skillsuites[0].rank * 5)) * (1 - (skilladept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={skillsuites[0].rank} onChange={event => updateSkillsuites(event.target.value, 0)} />
                            <p className="skillmod">{Math.min(strData.skill, conData.skill)}</p>
                        </div>
                        <div className="skillRow">
                            <p>Lore</p>
                            <p className="skillcost">{Math.floor((skillsuites[1].skillsuitebasecost + (skillsuites[1].rank * 5)) * (1 - (skilladept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={skillsuites[1].rank} onChange={event => updateSkillsuites(event.target.value, 1)} />
                            <p className="skillmod">{intData.skill}</p>
                        </div>
                        <div className="skillRow">
                            <p>Streetwise</p>
                            <p className="skillcost">{Math.floor((skillsuites[2].skillsuitebasecost + (skillsuites[2].rank * 5)) * (1 - (skilladept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={skillsuites[2].rank} onChange={event => updateSkillsuites(event.target.value, 2)} />
                            <p className="skillmod">{Math.min(wisData.skill, chaData.skill)}</p>
                        </div>
                        <div className="skillRow">
                            <p>Survival</p>
                            <p className="skillcost">{Math.floor((skillsuites[3].skillsuitebasecost + (skillsuites[3].rank * 5)) * (1 - (skilladept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={skillsuites[3].rank} onChange={event => updateSkillsuites(event.target.value, 3)} />
                            <p className="skillmod">{Math.min(conData.skill, wisData.skill)}</p>
                        </div>
                        <div className="skillRow">
                            <p>Tactics</p>
                            <p className="skillcost">{Math.floor((skillsuites[4].skillsuitebasecost + (skillsuites[4].rank * 5)) * (1 - (skilladept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={skillsuites[4].rank} onChange={event => updateSkillsuites(event.target.value, 4)} />
                            <p className="skillmod">{Math.min(wisData.skill, chaData.skill)}</p>
                        </div>
                        <div className="skillRow">
                            <p>Trades</p>
                            <p className="skillcost">{Math.floor((skillsuites[5].skillsuitebasecost + (skillsuites[5].rank * 5)) * (1 - (skilladept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={skillsuites[5].rank} onChange={event => updateSkillsuites(event.target.value, 5)} />
                            <p className="skillmod">{Math.min(dexData.skill, intData.skill)}</p>
                        </div>
                        <div className="skillRow">
                            <p>Weirdcraft</p>
                            <p className="skillcost">{Math.floor((skillsuites[6].skillsuitebasecost + (skillsuites[6].rank * 5)) * (1 - (skilladept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={skillsuites[6].rank} onChange={event => updateSkillsuites(event.target.value, 6)} />
                            <p className="skillmod">{Math.min(intData.skill, wisData.skill)}</p>
                        </div>
                    </div>
                    <div className="skillsuiteShell">
                        <div className="skillRow">
                            <h2>Native Lang.</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                        <div className="skillRow">
                            <input id="nativename" type="text" defaultValue={nativelanguage.language} onChange={event => updateNativeLanguage(event.target.value, 'language')} />
                            <p id="nativecost">{5 + (nativelanguage.rank || int * 2) - skilladept}</p>
                            <input id="nativerank" type="number" placeholder={int} defaultValue={nativelanguage.rank} onChange={event => updateNativeLanguage(event.target.value, 'rank')} />
                            <p id="nativemod">{Math.min(intData.skill, wisData.skill)}</p>
                        </div>
                    </div>
                </div>
                <div className="skillRightShell">
                    <div className="advSkillBackgroundShell">
                        <div>
                            <div className="skillRow">
                                <h2>Adv Skill</h2>
                                <h2>Cost</h2>
                                <h2>Rank</h2>
                                <h2>Mod</h2>
                            </div>
                            <div className="stripings">
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="skillRow">
                                <h2>Adv Skill</h2>
                                <h2>Cost</h2>
                                <h2>Rank</h2>
                                <h2>Mod</h2>
                            </div>
                            <div className="stripings">
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditSkillList stylings={{ width: '549px', height: '275px' }} rowWidth={'274px'} limit={26} listArray={skills} updateFunction={updateAttribute} type={"skills"} skilladept={skilladept} />
                </div>
            </div>
        )
    }

    let strMod = null
    if (strData) {
        strMod = strData.skill
    }
    let dexMod = null
    if (dexData) {
        dexMod = dexData.skill
    }
    let conMod = null
    if (conData) {
        conMod = conData.skill
    }
    let intMod = null
    if (intData) {
        intMod = intData.skill
    }
    let wisMod = null
    if (wisData) {
        wisMod = wisData.skill
    }
    let chaMod = null
    if (chaData) {
        chaMod = chaData.skill
    }

    let athletics = (<div className="skillRow">
        <p>Athletics</p>
        <p className="skillcost"> </p>
        <p className='skillrank'> </p>
        <p className="skillmod"> </p>
    </div>
    )
    let lore = (
        <div className="skillRow">
            <p>Lore</p>
            <p className="skillcost"> </p>
            <p className='skillrank'> </p>
            <p className="skillmod"> </p>
        </div>
    )
    let streetwise = (<div className="skillRow">
        <p>Streetwise</p>
        <p className="skillcost"> </p>
        <p className='skillrank'> </p>
        <p className="skillmod"> </p>
    </div>)
    let survival = (<div className="skillRow">
        <p>Survival</p>
        <p className="skillcost"> </p>
        <p className='skillrank'> </p>
        <p className="skillmod"> </p>
    </div>
    )
    let tactics = (
        <div className="skillRow">
            <p>Tactics</p>
            <p className="skillcost"> </p>
            <p className='skillrank'> </p>
            <p className="skillmod"> </p>
        </div>
    )
    let trades = (
        <div className="skillRow">
            <p>Trades</p>
            <p className="skillcost"> </p>
            <p className='skillrank'> </p>
            <p className="skillmod"> </p>
        </div>
    )
    let weirdcraft = (
        <div className="skillRow">
            <p>Weirdcraft</p>
            <p className="skillcost"> </p>
            <p className='skillrank'> </p>
            <p className="skillmod"> </p>
        </div>
    )
    let nativeLanguage = (
        <div className="skillRow">
            <p className="navLang"> </p>
            <p className="skillcost"> </p>
            <p className="skillrank"> </p>
            <p className="skillmod"> </p>
        </div>
    )

    if (skillsuites) {
        athletics = (<div className="skillRow">
            <p>Athletics</p>
            <p className="skillcost">{Math.floor((skillsuites[0].skillsuitebasecost + (skillsuites[0].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <input className="skillrank" type="number" defaultValue={skillsuites[0].rank} onChange={event => updateSkillsuites(event.target.value, 0)} />
            <p className="skillmod">{Math.min(strData.skill, conData.skill)}</p>
        </div>)
        lore = (
            <div className="skillRow">
                <p>Lore</p>
                <p className="skillcost">{Math.floor((skillsuites[1].skillsuitebasecost + (skillsuites[1].rank * 5)) * (1 - (skilladept * .10)))}</p>
                <input className="skillrank" type="number" defaultValue={skillsuites[1].rank} onChange={event => updateSkillsuites(event.target.value, 1)} />
                <p className="skillmod">{intData.skill}</p>
            </div>
        )
        streetwise = (<div className="skillRow">
            <p>Streetwise</p>
            <p className="skillcost">{Math.floor((skillsuites[2].skillsuitebasecost + (skillsuites[2].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <input className="skillrank" type="number" defaultValue={skillsuites[2].rank} onChange={event => updateSkillsuites(event.target.value, 2)} />
            <p className="skillmod">{Math.min(wisData.skill, chaData.skill)}</p>
        </div>)
        survival = (
            <div className="skillRow">
                <p>Survival</p>
                <p className="skillcost">{Math.floor((skillsuites[3].skillsuitebasecost + (skillsuites[3].rank * 5)) * (1 - (skilladept * .10)))}</p>
                <input className="skillrank" type="number" defaultValue={skillsuites[3].rank} onChange={event => updateSkillsuites(event.target.value, 3)} />
                <p className="skillmod">{Math.min(conData.skill, wisData.skill)}</p>
            </div>
        )
        tactics = (
            <div className="skillRow">
                <p>Tactics</p>
                <p className="skillcost">{Math.floor((skillsuites[4].skillsuitebasecost + (skillsuites[4].rank * 5)) * (1 - (skilladept * .10)))}</p>
                <input className="skillrank" type="number" defaultValue={skillsuites[4].rank} onChange={event => updateSkillsuites(event.target.value, 4)} />
                <p className="skillmod">{Math.min(wisData.skill, chaData.skill)}</p>
            </div>
        )
        trades = (<div className="skillRow">
            <p>Trades</p>
            <p className="skillcost">{Math.floor((skillsuites[5].skillsuitebasecost + (skillsuites[5].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <input className="skillrank" type="number" defaultValue={skillsuites[5].rank} onChange={event => updateSkillsuites(event.target.value, 5)} />
            <p className="skillmod">{Math.min(dexData.skill, intData.skill)}</p>
        </div>)
        weirdcraft = (<div className="skillRow">
            <p>Weirdcraft</p>
            <p className="skillcost">{Math.floor((skillsuites[6].skillsuitebasecost + (skillsuites[6].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <input className="skillrank" type="number" defaultValue={skillsuites[6].rank} onChange={event => updateSkillsuites(event.target.value, 6)} />
            <p className="skillmod">{Math.min(intData.skill, wisData.skill)}</p>
        </div>)
        nativeLanguage = (
            <div className="skillRow">
                <p className="navLang">{nativelanguage.language}</p>
                <p className="skillcost">{5 + (nativelanguage.rank || int * 2) - skilladept}</p>
                <p className="skillrank">{nativelanguage.rank ? nativelanguage.rank : int}</p>
                <p className="skillmod">{Math.min(intData.skill, wisData.skill)}</p>
            </div>
        )
    }

    return (
        <div className="skillShell">
            <div className="skillLeftShell">
                <div>
                    <h2>Check Mods & Skill Adepts</h2>
                    <div className="skillDiscount">
                        <div className="skillMods">
                            <div>
                                <p>Str</p>
                                <p>{strMod}</p>
                            </div>
                            <div>
                                <p>Dex</p>
                                <p>{dexMod}</p>
                            </div>
                            <div>
                                <p>Con</p>
                                <p>{conMod}</p>
                            </div>
                            <div>
                                <p>Int</p>
                                <p>{intMod}</p>
                            </div>
                            <div>
                                <p>Will</p>
                                <p>{wisMod}</p>
                            </div>
                            <div>
                                <p>Pre</p>
                                <p>{chaMod}</p>
                            </div>
                        </div>
                        <div className="skillAdept">
                            <p>Skill Adept(s)</p>
                            <p className="skilladeptLocation">{skilladept}</p>
                        </div>
                    </div>
                </div>
                <div className="skillsuiteShell">
                    <div className="skillRow">
                        <h2>Skill Suites</h2>
                        <h2>Cost</h2>
                        <h2>Rank</h2>
                        <h2>Mod</h2>
                    </div>
                    {athletics}
                    {lore}
                    {streetwise}
                    {survival}
                    {tactics}
                    {trades}
                    {weirdcraft}
                </div>
                <div className="skillsuiteShell">
                    <div className="skillRow">
                        <h2>Native Lang.</h2>
                        <h2>Cost</h2>
                        <h2>Rank</h2>
                        <h2>Mod</h2>
                    </div>
                    {nativeLanguage}
                </div>
            </div>
            <div className="skillRightShell">
                <div className="advSkillBackgroundShell">
                    <div>
                        <div className="skillRow">
                            <h2>Adv Skill</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                        <div className="stripings">
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="skillRow">
                            <h2>Adv Skill</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                        <div className="stripings">
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                            <div className="stripeDiv">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <ViewSkillList stylings={{ width: '549px', height: '275px' }} rowWidth={'271px'} listArray={skills} skilladept={skilladept} />
            </div>
        </div>
    )
}