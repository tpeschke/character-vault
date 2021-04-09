import React from 'react'
import EditList from './components/editList'
import EditPairList from './components/editPairList'
let characterCopy

function updateAttribute(value, type) {
    characterCopy[type] = value
}

export default function CharacterEditor({ character, updateCharacter, downloadMode }) {
    characterCopy = { ...character }
    let { name, race, primarya, secondarya, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, primarylevel, secondarylevel, temperament, goals, devotions, flaws, traits, reputation, contacts,
        abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, 
        onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery, onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, twomiscrecovery, twomiscdamage, 
        twomiscinit, twoname, twobasedamage, twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize, threetrainattack, threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, threemiscparry, threemiscrecovery, threemiscdamage, 
        threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack, 
        fourmiscrecovery, fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb } = characterCopy
    return (
        <div>
            <div id="pdf" className='pdfViewStylings'>
                <div className="pageOne pageBase pageViewStylings">
                    <input className="nameLocation" type="text" defaultValue={name} onChange={event => updateAttribute(event.target.value, "name")} />
                    <input className="raceLocation" type="text" defaultValue={race} onChange={event => updateAttribute(event.target.value, "race")} />
                    <input className="primaryLocation" type="text" defaultValue={primarya} onChange={event => updateAttribute(event.target.value, "primarya")} />
                    <input className="primarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={primarylevel} onChange={event => updateAttribute(event.target.value, "primarylevel")} />
                    <input className="secondaryLocation" type="text" defaultValue={secondarya} onChange={event => updateAttribute(event.target.value, "secondarya")} />
                    <input className="secondarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={secondarylevel} onChange={event => updateAttribute(event.target.value, "secondarylevel")} />
                    <input className="levelLocation" type="number" min="1" defaultValue={level} onChange={event => updateAttribute(event.target.value, "level")} />
                    <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => updateAttribute(event.target.value, "crp")} />
                    <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onChange={event => updateAttribute(event.target.value, "excurrent")} />
                    <textarea className="drawbackLocation drawbacktextArea" defaultValue={drawback} onChange={event => updateAttribute(event.target.value, "drawback")} maxLength="165"></textarea>

                    <input className="strLocation" type="number" max="20" min="1" defaultValue={str} onChange={event => updateAttribute(event.target.value, "str")} />
                    <input className="dexLocation" type="number" max="20" min="1" defaultValue={dex} onChange={event => updateAttribute(event.target.value, "dex")} />
                    <input className="conLocation" type="number" max="20" min="1" defaultValue={con} onChange={event => updateAttribute(event.target.value, "con")} />
                    <input className="intLocation" type="number" max="20" min="1" defaultValue={int} onChange={event => updateAttribute(event.target.value, "int")} />
                    <input className="wisLocation" type="number" max="20" min="1" defaultValue={wis} onChange={event => updateAttribute(event.target.value, "wis")} />
                    <input className="chaLocation" type="number" max="20" min="1" defaultValue={cha} onChange={event => updateAttribute(event.target.value, "cha")} />

                    <input className="crawlLocation" type="text" defaultValue={crawl} onChange={event => updateAttribute(event.target.value, "crawl")} />
                    <input className="walkLocation" type="text" defaultValue={walk} onChange={event => updateAttribute(event.target.value, "walk")} />
                    <input className="jogLocation" type="text" defaultValue={jog} onChange={event => updateAttribute(event.target.value, "jog")} />
                    <input className="runLocation" type="text" defaultValue={run} onChange={event => updateAttribute(event.target.value, "run")} />
                    <input className="sprintLocation" type="text" defaultValue={sprint} onChange={event => updateAttribute(event.target.value, "sprint")} />

                    <input className="honorLocation" type="number" max="25" min="0" defaultValue={honor} onChange={event => updateAttribute(event.target.value, "honor")} />
                    <input className="temperamentLocation" type="text" defaultValue={temperament} onChange={event => updateAttribute(event.target.value, "temperament")} />
                    <EditList stylings={{ top: '358px', left: '20px', width: '224px' }} listArray={goals} limit={3} updateFunction={updateAttribute} type={"goals"} />
                    <EditPairList stylings={{ top: '442px', left: '20px', width: '224px' }} listArray={devotions} limit={3} updateFunction={updateAttribute} type={"devotions"} />
                    <EditPairList stylings={{ top: '525px', left: '20px', width: '224px' }} listArray={flaws} limit={3} updateFunction={updateAttribute} type={"flaws"} defaultValue={"d4!+Stress"} />
                    <EditPairList stylings={{ top: '316px', left: '246px', width: '200px' }} listArray={traits} limit={13} updateFunction={updateAttribute} type={"traits"} />
                    <EditList stylings={{ top: '610px', left: '107px', width: '340px' }} listArray={reputation} limit={3} updateFunction={updateAttribute} type={"reputation"} />
                    <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onChange={event => updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>

                    <input className="stressthresholdLocation" type="number" min="0" defaultValue={stressthreshold} onChange={event => updateAttribute(event.target.value, "stressthreshold")} />
                    <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => updateAttribute(event.target.value, "favormax")} />

                    <input className="maxrangeLocation" type="number" defaultValue={maxrange} onChange={event => updateAttribute(event.target.value, "maxrange")} />

                    <input className="criticalLocation" type="number" defaultValue={vitality} onChange={event => updateAttribute(event.target.value, "vitality")} />
                    <input className="sizemodLocation" type="number" min="0" defaultValue={sizemod} onChange={event => updateAttribute(event.target.value, "sizemod")} />
                    <input className="vitalityrollLocation" type="number" min="0" defaultValue={vitalityroll} onChange={event => updateAttribute(event.target.value, "vitalityroll")} />
                    <input className="vitalitydiceLocation" type="text" defaultValue={vitalitydice} onChange={event => updateAttribute(event.target.value, "vitalitydice")} />

                    <textarea className="abilitiesoneLocation abilitiesonetextArea" defaultValue={abilitiesone} onChange={event => updateAttribute(event.target.value, "abilitiesone")} maxLength={"300"}></textarea>
                    <textarea className="abilitiestwoLocation abilitiestwotextArea" defaultValue={abilitiestwo} onChange={event => updateAttribute(event.target.value, "abilitiestwo")} maxLength={"310"}></textarea>
                    <textarea className="abilitiesthreeLocation abilitiesthreetextArea" defaultValue={abilitiesthree} onChange={event => updateAttribute(event.target.value, "abilitiesthree")} maxLength={"250"}></textarea>
                    <input className="removedabilityLocation" type="text" defaultValue={removedability} onChange={event => updateAttribute(event.target.value, "removedability")} />
                </div>
                <div className="pageTwo pageTwoMargin pageBase pageViewStylings">
                    <input className="copperLocation" type="text" defaultValue={copper} onChange={event => updateAttribute(event.target.value, "copper")} />
                    <input className="silverLocation" type="text" defaultValue={silver} onChange={event => updateAttribute(event.target.value, "silver")} />
                    <input className="goldLocation" type="text" defaultValue={gold} onChange={event => updateAttribute(event.target.value, "gold")} />
                    <input className="platiniumLocation" type="text" defaultValue={platinium} onChange={event => updateAttribute(event.target.value, "platinium")} />
                    <EditPairList stylings={{ top: '379px', left: '20px', width: '201px' }} listArray={gearone} limit={6} updateFunction={updateAttribute} type={"gearone"} />
                    <EditPairList stylings={{ top: '379px', left: '221px', width: '199px' }} listArray={geartwo} limit={6} updateFunction={updateAttribute} type={"geartwo"} />
                    <EditPairList stylings={{ top: '379px', left: '422px', width: '198px' }} listArray={gearthree} limit={6} updateFunction={updateAttribute} type={"gearthree"} />
                    <EditPairList stylings={{ top: '379px', left: '619px', width: '175px' }} listArray={gearfour} limit={6} updateFunction={updateAttribute} type={"gearfour"} />

                    <div className="weaponProfileOne">
                        <input className="weaponnameLocation" type="text" defaultValue={onename} onChange={event => updateAttribute(event.target.value, "onename")} />
                        <input className="basedamageLocation" type="text" defaultValue={onebasedamage} onChange={event => updateAttribute(event.target.value, "onebasedamage")} />
                        <input className="baserecoveryLocation" type="number" defaultValue={onebaserecovery} onChange={event => updateAttribute(event.target.value, "onebaserecovery")} />
                        <input className="baseparryLocation" type="number" defaultValue={onebaseparry} onChange={event => updateAttribute(event.target.value, "onebaseparry")} />
                        <input className="basemeasureLocation" type="text" defaultValue={onebasemeasure} onChange={event => updateAttribute(event.target.value, "onebasemeasure")} />
                        <input className="typeLocation" type="text" defaultValue={onetype} onChange={event => updateAttribute(event.target.value, "onetype")} />
                        <textarea className="bonusLocation bonustextArea" defaultValue={onebonus} onChange={event => updateAttribute(event.target.value, "onebonus")} maxLength={"55"}></textarea>
                        <textarea className="traitsLocation traitstextArea" defaultValue={onetraits} onChange={event => updateAttribute(event.target.value, "onetraits")} maxLength={"35"}></textarea>

                        <input className="trainattackLocation" type="number" defaultValue={onetrainattack} onChange={event => updateAttribute(event.target.value, "onetrainattack")} />
                        <input className="trainrecoveryLocation" type="number" defaultValue={onetrainrecovery} onChange={event => updateAttribute(event.target.value, "onetrainrecovery")} />
                        <input className="trainparryLocation" type="number" defaultValue={onetrainparry} onChange={event => updateAttribute(event.target.value, "onetrainparry")} />
                        <input className="traindamageLocation" type="number" defaultValue={onetraindamage} onChange={event => updateAttribute(event.target.value, "onetraindamage")} />
                        
                        <input className="miscattackLocation" type="number" defaultValue={onemiscattack} onChange={event => updateAttribute(event.target.value, "onemiscattack")} />
                        <input className="miscrecoveryLocation" type="number" defaultValue={onemiscrecovery} onChange={event => updateAttribute(event.target.value, "onemiscrecovery")} />
                        <input className="miscparryLocation" type="number" defaultValue={onemiscparry} onChange={event => updateAttribute(event.target.value, "onemiscparry")} />
                        <input className="miscdamageLocation" type="number" defaultValue={onemiscdamage} onChange={event => updateAttribute(event.target.value, "onemiscdamage")} />
                        <input className="miscinitLocation" type="number" defaultValue={onemiscinit} onChange={event => updateAttribute(event.target.value, "onemiscinit")} />
                    </div>
                    
                    <div className="weaponProfiletwo">
                        <input className="weaponnameLocation" type="text" defaultValue={twoname} onChange={event => updateAttribute(event.target.value, "twoname")} />
                        <input className="basedamageLocation" type="text" defaultValue={twobasedamage} onChange={event => updateAttribute(event.target.value, "twobasedamage")} />
                        <input className="baserecoveryLocation" type="number" defaultValue={twobaserecovery} onChange={event => updateAttribute(event.target.value, "twobaserecovery")} />
                        <input className="baseparryLocation" type="number" defaultValue={twobaseparry} onChange={event => updateAttribute(event.target.value, "twobaseparry")} />
                        <input className="basemeasureLocation" type="text" defaultValue={twobasemeasure} onChange={event => updateAttribute(event.target.value, "twobasemeasure")} />
                        <input className="typeLocation" type="text" defaultValue={twotype} onChange={event => updateAttribute(event.target.value, "twotype")} />
                        <textarea className="bonusLocation bonustextArea" defaultValue={twobonus} onChange={event => updateAttribute(event.target.value, "twobonus")} maxLength={"55"}></textarea>
                        <textarea className="traitsLocation traitstextArea" defaultValue={twotraits} onChange={event => updateAttribute(event.target.value, "twotraits")} maxLength={"35"}></textarea>

                        <input className="trainattackLocation" type="number" defaultValue={twotrainattack} onChange={event => updateAttribute(event.target.value, "twotrainattack")} />
                        <input className="trainrecoveryLocation" type="number" defaultValue={twotrainrecovery} onChange={event => updateAttribute(event.target.value, "twotrainrecovery")} />
                        <input className="trainparryLocation" type="number" defaultValue={twotrainparry} onChange={event => updateAttribute(event.target.value, "twotrainparry")} />
                        <input className="traindamageLocation" type="number" defaultValue={twotraindamage} onChange={event => updateAttribute(event.target.value, "twotraindamage")} />
                        
                        <input className="miscattackLocation" type="number" defaultValue={twomiscattack} onChange={event => updateAttribute(event.target.value, "twomiscattack")} />
                        <input className="miscrecoveryLocation" type="number" defaultValue={twomiscrecovery} onChange={event => updateAttribute(event.target.value, "twomiscrecovery")} />
                        <input className="miscparryLocation" type="number" defaultValue={twomiscparry} onChange={event => updateAttribute(event.target.value, "twomiscparry")} />
                        <input className="miscdamageLocation" type="number" defaultValue={twomiscdamage} onChange={event => updateAttribute(event.target.value, "twomiscdamage")} />
                        <input className="miscinitLocation" type="number" defaultValue={twomiscinit} onChange={event => updateAttribute(event.target.value, "twomiscinit")} />
                    </div>

                    <div className="weaponProfilethree">
                        <input className="weaponnameLocation" type="text" defaultValue={threename} onChange={event => updateAttribute(event.target.value, "threename")} />
                        <input className="basedamageLocation" type="text" defaultValue={threebasedamage} onChange={event => updateAttribute(event.target.value, "threebasedamage")} />
                        <input className="baserecoveryLocation" type="number" defaultValue={threebaserecovery} onChange={event => updateAttribute(event.target.value, "threebaserecovery")} />
                        <input className="baseparryLocation" type="number" defaultValue={threebaseparry} onChange={event => updateAttribute(event.target.value, "threebaseparry")} />
                        <input className="basemeasureLocation" type="text" defaultValue={threebasemeasure} onChange={event => updateAttribute(event.target.value, "threebasemeasure")} />
                        <input className="typeLocation" type="text" defaultValue={threetype} onChange={event => updateAttribute(event.target.value, "threetype")} />
                        <textarea className="bonusLocation bonustextArea" defaultValue={threebonus} onChange={event => updateAttribute(event.target.value, "threebonus")} maxLength={"55"}></textarea>
                        <textarea className="traitsLocation traitstextArea" defaultValue={threetraits} onChange={event => updateAttribute(event.target.value, "threetraits")} maxLength={"35"}></textarea>

                        <input className="trainattackLocation" type="number" defaultValue={threetrainattack} onChange={event => updateAttribute(event.target.value, "threetrainattack")} />
                        <input className="trainrecoveryLocation" type="number" defaultValue={threetrainrecovery} onChange={event => updateAttribute(event.target.value, "threetrainrecovery")} />
                        <input className="trainparryLocation" type="number" defaultValue={threetrainparry} onChange={event => updateAttribute(event.target.value, "threetrainparry")} />
                        <input className="traindamageLocation" type="number" defaultValue={threetraindamage} onChange={event => updateAttribute(event.target.value, "threetraindamage")} />
                        
                        <input className="miscattackLocation" type="number" defaultValue={threemiscattack} onChange={event => updateAttribute(event.target.value, "threemiscattack")} />
                        <input className="miscrecoveryLocation" type="number" defaultValue={threemiscrecovery} onChange={event => updateAttribute(event.target.value, "threemiscrecovery")} />
                        <input className="miscparryLocation" type="number" defaultValue={threemiscparry} onChange={event => updateAttribute(event.target.value, "threemiscparry")} />
                        <input className="miscdamageLocation" type="number" defaultValue={threemiscdamage} onChange={event => updateAttribute(event.target.value, "threemiscdamage")} />
                        <input className="miscinitLocation" type="number" defaultValue={threemiscinit} onChange={event => updateAttribute(event.target.value, "threemiscinit")} />
                    </div>

                    <div className="weaponProfilefour">
                        <input className="weaponnameLocation weaponnamefour" type="text" defaultValue={fourname} onChange={event => updateAttribute(event.target.value, "fourname")} />
                        <input className="basedamageLocation basedamagefour" type="text" defaultValue={fourbasedamage} onChange={event => updateAttribute(event.target.value, "fourbasedamage")} />
                        <input className="baserecoveryLocation" type="number" defaultValue={fourbaserecovery} onChange={event => updateAttribute(event.target.value, "fourbaserecovery")} />
                        <input className="typeLocation typefour" type="text" defaultValue={fourtype} onChange={event => updateAttribute(event.target.value, "fourtype")} />
                        <textarea className="bonusLocation bonustextArea bonusfour" defaultValue={fourbonus} onChange={event => updateAttribute(event.target.value, "fourbonus")} maxLength={"80"}></textarea>
                        <textarea className="traitsLocation traitstextArea traitsfour" defaultValue={fourtraits} onChange={event => updateAttribute(event.target.value, "fourtraits")} maxLength={"50"}></textarea>

                        <input className="trainattackLocation" type="number" defaultValue={fourtrainattack} onChange={event => updateAttribute(event.target.value, "fourtrainattack")} />
                        <input className="trainrecoveryLocation" type="number" defaultValue={fourtrainrecovery} onChange={event => updateAttribute(event.target.value, "fourtrainrecovery")} />
                        <input className="traindamageLocation" type="number" defaultValue={fourtraindamage} onChange={event => updateAttribute(event.target.value, "fourtraindamage")} />
                        
                        <input className="miscattackLocation" type="number" defaultValue={fourmiscattack} onChange={event => updateAttribute(event.target.value, "fourmiscattack")} />
                        <input className="miscrecoveryLocation" type="number" defaultValue={fourmiscrecovery} onChange={event => updateAttribute(event.target.value, "fourmiscrecovery")} />
                        <input className="miscinitLocation initFour" type="number" defaultValue={fourmiscinit} onChange={event => updateAttribute(event.target.value, "fourmiscinit")} />
                        <input className="miscdamageLocation" type="number" defaultValue={fourmiscdamage} onChange={event => updateAttribute(event.target.value, "fourmiscdamage")} />
                    </div>
                    <textarea className="generalnotesLocation generalnotestextArea" defaultValue={generalnotes} onChange={event => updateAttribute(event.target.value, "generalnotes")} maxLength={"500"}></textarea>
                </div>

            </div>
            <div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                <div></div>
                <div className="right-corner-button corner-button">
                    <i onClick={_ => updateCharacter(characterCopy)} className="fas fa-save"></i>
                </div>
            </div>
        </div>
    )
}