import React from 'react'
import ViewSkillList from '../pairComponents/viewSkillList'
import EditSkillList from '../pairComponents/editSkillList'

export default function Skills({ skillsObject, editing }) {
    let { str, con, dex, wis, cha, skillsuites, nativelanguage, skills, skilladept, int, updateAttribute, updateNativeLanguage, updateSkillsuites, updateTrained } = skillsObject

    if (!str) {
        str = 1
    }
    if (!dex) {
        dex = 1
    }
    if (!con) {
        con = 1
    }
    if (!int) {
        int = 1
    }
    if (!wis) {
        wis = 1
    }
    if (!cha) {
        cha = 1
    }
    let checkMod = {
        1: -3,
        2: -2,
        3: -2,
        4: -1,
        5: -1,
        6: -1,
        7: -1,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 1,
        14: 1,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 2,
        20: 2
    }

    if (editing) {
        return (
            <div className='skillShell'>
                <h1>Skills</h1>
                <div className="innerSkillShell">
                    <div className="skillLeftShell">
                        <div>
                            <h2>Check Mods & Skill Adepts</h2>
                            <div className="skillDiscount">
                                <div className="skillMods">
                                    <div>
                                        <p>Str</p>
                                        <p> </p>
                                    </div>
                                    <div>
                                        <p>Dex</p>
                                        <p> </p>
                                    </div>
                                    <div>
                                        <p>Con</p>
                                        <p> </p>
                                    </div>
                                    <div>
                                        <p>Int</p>
                                        <p> </p>
                                    </div>
                                    <div>
                                        <p>Will</p>
                                        <p> </p>
                                    </div>
                                    <div>
                                        <p>Pre</p>
                                        <p> </p>
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
                                {skillsuites[0].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", 0)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", 0)}></div>}
                                <p className="skillcost">{Math.floor((20 + (skillsuites[0].rank * 5)) * (1 - (skilladept * .10)))}</p>
                                {skillsuites[0].trained ? <input className="skillrank" type="number" defaultValue={skillsuites[0].rank} onChange={event => updateSkillsuites(event.target.value, 0)} /> : <p className="skillrank">U</p>}
                                <p className="skillmod"> </p>
                            </div>
                            <div className="skillRow">
                                <p>Lore</p>
                                {skillsuites[1].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", 1)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", 1)}></div>}
                                <p className="skillcost">{Math.floor((20 + (skillsuites[1].rank * 5)) * (1 - (skilladept * .10)))}</p>
                                {skillsuites[1].trained ? <input className="skillrank" type="number" defaultValue={skillsuites[1].rank} onChange={event => updateSkillsuites(event.target.value, 1)} /> : <p className="skillrank">U</p>}
                                <p className="skillmod"> </p>
                            </div>
                            <div className="skillRow">
                                <p>Streetwise</p>
                                {skillsuites[2].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", 2)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", 2)}></div>}
                                <p className="skillcost">{Math.floor((20 + (skillsuites[2].rank * 5)) * (1 - (skilladept * .10)))}</p>
                                {skillsuites[2].trained ? <input className="skillrank" type="number" defaultValue={skillsuites[2].rank} onChange={event => updateSkillsuites(event.target.value, 2)} /> : <p className="skillrank">U</p>}
                                <p className="skillmod"> </p>
                            </div>
                            <div className="skillRow">
                                <p>Survival</p>
                                {skillsuites[3].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", 3)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", 3)}></div>}
                                <p className="skillcost">{Math.floor((20 + (skillsuites[3].rank * 5)) * (1 - (skilladept * .10)))}</p>
                                {skillsuites[3].trained ? <input className="skillrank" type="number" defaultValue={skillsuites[3].rank} onChange={event => updateSkillsuites(event.target.value, 3)} /> : <p className="skillrank">U</p>}
                                <p className="skillmod"> </p>
                            </div>
                            <div className="skillRow">
                                <p>Tactics</p>
                                {skillsuites[4].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", 4)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", 4)}></div>}
                                <p className="skillcost">{Math.floor((20 + (skillsuites[4].rank * 5)) * (1 - (skilladept * .10)))}</p>
                                {skillsuites[4].trained ? <input className="skillrank" type="number" defaultValue={skillsuites[4].rank} onChange={event => updateSkillsuites(event.target.value, 4)} /> : <p className="skillrank">U</p>}
                                <p className="skillmod"> </p>
                            </div>
                            <div className="skillRow">
                                <p>Trades</p>
                                {skillsuites[5].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", 5)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", 5)}></div>}
                                <p className="skillcost">{Math.floor((20 + (skillsuites[5].rank * 5)) * (1 - (skilladept * .10)))}</p>
                                {skillsuites[5].trained ? <input className="skillrank" type="number" defaultValue={skillsuites[5].rank} onChange={event => updateSkillsuites(event.target.value, 5)} /> : <p className="skillrank">U</p>}
                                <p className="skillmod"> </p>
                            </div>
                            <div className="skillRow">
                                <p>Weirdcraft</p>
                                {skillsuites[6].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", 6)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", 6)}></div>}
                                <p className="skillcost">{Math.floor((30 + (skillsuites[6].rank * 5)) * (1 - (skilladept * .10)))}</p>
                                {skillsuites[6].trained ? <input className="skillrank" type="number" defaultValue={skillsuites[6].rank} onChange={event => updateSkillsuites(event.target.value, 6)} /> : <p className="skillrank">U</p>}
                                <p className="skillmod"> </p>
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
                                <p id="nativemod"> </p>
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
            </div>
        )
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
            <p className="skillcost">{Math.floor((20 + (skillsuites[0].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <p className="skillrank">{skillsuites[0].trained ? skillsuites[0].rank : 'U'}</p>
            <p className="skillmod">{Math.max(checkMod[str], checkMod[con])}</p>
        </div>)
        lore = (
            <div className="skillRow">
                <p>Lore</p>
                <p className="skillcost">{Math.floor((20 + (skillsuites[1].rank * 5)) * (1 - (skilladept * .10)))}</p>
                <p className="skillrank">{skillsuites[1].trained ? skillsuites[1].rank : 'U'}</p>
                <p className="skillmod">{checkMod[int]}</p>
            </div>
        )
        streetwise = (<div className="skillRow">
            <p>Streetwise</p>
            <p className="skillcost">{Math.floor((20 + (skillsuites[2].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <p className="skillrank">{skillsuites[2].trained ? skillsuites[2].rank : 'U'}</p>
            <p className="skillmod">{Math.max(checkMod[wis], checkMod[cha])}</p>
        </div>)
        survival = (
            <div className="skillRow">
                <p>Survival</p>
                <p className="skillcost">{Math.floor((20 + (skillsuites[3].rank * 5)) * (1 - (skilladept * .10)))}</p>
                <p className="skillrank">{skillsuites[3].trained ? skillsuites[3].rank : 'U'}</p>
                <p className="skillmod">{Math.max(checkMod[con], checkMod[wis])}</p>
            </div>
        )
        tactics = (
            <div className="skillRow">
                <p>Tactics</p>
                <p className="skillcost">{Math.floor((20 + (skillsuites[4].rank * 5)) * (1 - (skilladept * .10)))}</p>
                <p className="skillrank">{skillsuites[4].trained ? skillsuites[4].rank : 'U'}</p>
                <p className="skillmod">{Math.max(checkMod[wis], checkMod[cha])}</p>
            </div>
        )
        trades = (<div className="skillRow">
            <p>Trades</p>
            <p className="skillcost">{Math.floor((20 + (skillsuites[5].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <p className="skillrank">{skillsuites[5].trained ? skillsuites[5].rank : 'U'}</p>
            <p className="skillmod">{Math.max(checkMod[dex], checkMod[int])}</p>
        </div>)
        weirdcraft = (<div className="skillRow">
            <p>Weirdcraft</p>
            <p className="skillcost">{Math.floor((30 + (skillsuites[6].rank * 5)) * (1 - (skilladept * .10)))}</p>
            <p className="skillrank">{skillsuites[6].trained ? skillsuites[6].rank : 'U'}</p>
            <p className="skillmod">{Math.max(checkMod[int], checkMod[wis])}</p>
        </div>)
        nativeLanguage = (
            <div className="skillRow">
                <p className="navLang">{nativelanguage.language}</p>
                <p className="skillcost">{5 + (nativelanguage.rank || int * 2) - skilladept}</p>
                <p className="skillrank">{nativelanguage.rank ? nativelanguage.rank : int}</p>
                <p className="skillmod">{Math.max(checkMod[int], checkMod[wis])}</p>
            </div>
        )
    }

    return (
        <div className='skillShell'>
            <h1>Skills</h1>
            <div className="innerSkillShell">
                <div className="skillLeftShell">
                    <div>
                        <h2>Check Mods & Skill Adepts</h2>
                        <div className="skillDiscount">
                            <div className="skillMods">
                                <div>
                                    <p>Str</p>
                                    <p>{checkMod[str]}</p>
                                </div>
                                <div>
                                    <p>Dex</p>
                                    <p>{checkMod[dex]}</p>
                                </div>
                                <div>
                                    <p>Con</p>
                                    <p>{checkMod[con]}</p>
                                </div>
                                <div>
                                    <p>Int</p>
                                    <p>{checkMod[int]}</p>
                                </div>
                                <div>
                                    <p>Will</p>
                                    <p>{checkMod[wis]}</p>
                                </div>
                                <div>
                                    <p>Pre</p>
                                    <p>{checkMod[cha]}</p>
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
        </div>
    )
}