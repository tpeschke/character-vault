import React from 'react'
import ViewList from '../pairComponents/viewList'
import ViewPairList from '../pairComponents/viewPairList'
import EditList from '../pairComponents/editList'
import EditPairList from '../pairComponents/editPairList'

export default function Social({ social, editing }) {
    let { shownHonor, updateAttribute, isHuman, honorDiceLeft, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts, honor } = social

    if (editing) {
        return (
            <div className="socialShell">
                <h1>Honor</h1>
                <div className="honorShell">
                    <div>
                        <input className="honorLocation" type="number" max="25" min="0" defaultValue={shownHonor} onBlur={event => updateAttribute(event.target.value, "honor")} />
                        <p>Honor</p>
                    </div>
                    <div className="honorCategoryShell">
                        <div className="circle" style={{ left: honorDiceLeft }}> </div>
                        <p>0-5: n/a</p>
                        <p>6-10: {isHuman ? 'd6!' : 'd4!'}</p>
                        <p>11-15: {isHuman ? 'd8!' : 'd6!'}</p>
                        <p>16-20: {isHuman ? 'd10!' : 'd8!'}</p>
                        <p>21-25: {isHuman ? 'd12!' : 'd10!'}</p>
                    </div>
                    <div>
                        <p>Honor Dice</p>
                        <input className="extrahonordiceLocation" type="number" min="0" defaultValue={extrahonordice} onBlur={event => updateAttribute(event.target.value, "extrahonordice")} />
                    </div>
                </div>
                <div className="socialBodyShell">
                    <div className="socialLeftShell">
                        <h2>Temperament</h2>
                        <input className="temperamentLocation" type="text" defaultValue={temperament} onChange={event => updateAttribute(event.target.value, "temperament")} />
                        <h2>Goals</h2>
                        <EditList stylings={{ width: '224px', height: '56px' }} height='56px' listArray={goals} limit={3} updateFunction={updateAttribute} type={"goals"} />
                        <h2>Devotions</h2>
                        <EditPairList stylings={{ width: '224px' }} listArray={devotions} limit={4} updateFunction={updateAttribute} type={"devotions"} />
                    </div>
                    <div className="socialRightShell">
                        <h2>Traits</h2>
                        <EditPairList stylings={{ width: '200px' }} listArray={traits} limit={10} updateFunction={updateAttribute} type={"traits"} />
                    </div>
                </div>
                <h2>Flaws</h2>
                <EditPairList stylings={{ width: '428px', height: '60px' }} rowWidth={'212px'}  height={'60px'} listArray={flaws} limit={6} updateFunction={updateAttribute} type={"flaws"} defaultValue={"d4!"} />
                <h2>Reputation</h2>
                <div className="reputationShell">
                    <EditList stylings={{ left: '86px', width: '340px' }} listArray={reputation} limit={3} updateFunction={updateAttribute} type={"reputation"} />
                    <div className="reputationTitles">
                        <p>I'm Know For</p>
                        <p>I'm Know For</p>
                        <p>I'm Know For</p>
                    </div>
                </div>
                <h2>Allies, Contacts, & Assets</h2>
                <div>
                    <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onBlur={event => updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>
                    <div className="contactStriping">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }

    let honorCircle = <div></div>
    let honorInput = <p className="honorLocation"> </p>
    let honorDieInput = <p className="extrahonordiceLocation"> </p>
    let alliesTextArea = <div className="contactsLocation contactstextArea"></div>
    if (shownHonor) {
        honorCircle = <div className="circle" style={{ left: honorDiceLeft }}> </div>
        honorInput = <input className="honorLocation" type="number" max="25" min="0" defaultValue={shownHonor} onBlur={event => updateAttribute(event.target.value, "honor")} />
        honorDieInput = <input className="extrahonordiceLocation" type="number" min="0" defaultValue={extrahonordice} onBlur={event => updateAttribute(event.target.value, "extrahonordice")} />
        alliesTextArea = <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onBlur={event => updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>
    }

    return (
        <div className="socialShell" key={goals.length}>
            <h1>Honor</h1>
            <div className="honorShell">
                <div>
                    {honorInput}
                    <p>Honor</p>
                </div>
                <div className="honorCategoryShell">
                    {honorCircle}
                    <p>0-5: n/a</p>
                    <p>6-10: {isHuman ? 'd6!' : 'd4!'}</p>
                    <p>11-15: {isHuman ? 'd8!' : 'd6!'}</p>
                    <p>16-20: {isHuman ? 'd10!' : 'd8!'}</p>
                    <p>21-25: {isHuman ? 'd12!' : 'd10!'}</p>
                </div>
                <div>
                    <p>Honor Dice</p>
                    {honorDieInput}
                </div>
            </div>
            <div className="socialBodyShell">
                <div className="socialLeftShell">
                    <h2>Temperament</h2>
                    <p className="temperamentLocation">{temperament}</p>
                    <h2>Goals</h2>
                    <ViewList listArray={goals} limit={3} />
                    <h2>Devotions</h2>
                    <ViewPairList listArray={devotions} limit={4} />
                </div>
                <div className="socialRightShell">
                    <h2>Traits</h2>
                    <ViewPairList listArray={traits} limit={10} />
                </div>
            </div>
            <h2>Flaws</h2>
            <ViewPairList stylings={{ width: '428px', height: '60px' }} rowWidth={'212px'} height={'60px'} listArray={flaws} limit={6} />
            <h2>Reputation</h2>
            <div className="reputationShell">
                <ViewList stylings={{ left: '95px', width: '331px' }} listArray={reputation} limit={3} />
                <div className="reputationTitles">
                    <p>I'm Known For</p>
                    <p>I'm Known For</p>
                    <p>I'm Known For</p>
                </div>
            </div>
            <h2>Allies, Contacts, & Assets</h2>
            <div>
                {alliesTextArea}
                <div className="contactStriping">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}