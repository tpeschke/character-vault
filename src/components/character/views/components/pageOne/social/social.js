import React from 'react'
import './social.css'
import ViewList from '../../pairComponents/viewList'
import ViewPairList from '../../pairComponents/viewPairList'
import EditList from '../../pairComponents/editList'
import EditPairList from '../../pairComponents/editPairList'

export default function Social({ social, editing }) {
    let { shownHonor, updateAttribute, isHuman, honorDiceLeft, strength, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts, descriptions } = social

    let honorCircle = <div></div>
    let honorInput = <p className="honorLocation"> </p>
    let honorDieInput = <p className="extrahonordiceLocation"> </p>
    let alliesTextArea = <div className="contactsLocation contactstextArea"></div>

    if (!!shownHonor || shownHonor === 0) {
        if (!editing) {
            honorCircle = <div className="circle" style={{ left: honorDiceLeft }}> </div>
        }
        honorInput = <input className="honorLocation" type="number" max="25" min="0" defaultValue={shownHonor} onBlur={event => updateAttribute(event.target.value, "honor")} />
        honorDieInput = <input className="extrahonordiceLocation" type="number" min="0" defaultValue={extrahonordice} onBlur={event => updateAttribute(event.target.value, "extrahonordice")} />
        alliesTextArea = <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onBlur={event => updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>
    }

    function getList(label, listArray, limit, updateName) {
        if (editing && updateName) {
            return (
                <>
                    <h2>{label}</h2>
                    <EditList listArray={listArray} limit={limit} updateFunction={updateAttribute} type={updateName} />
                </>
            )
        }
        return (
            <>
                <h2>{label}</h2>
                <ViewList listArray={listArray} limit={limit} />
            </>
        )
    }

    function getPairList(label, listArray, limit, updateName) {
        if (editing && updateName) {
            return (
                <>
                    <h2>{label}</h2>
                    <EditPairList listArray={listArray} limit={limit} updateFunction={updateAttribute} type={updateName} />
                </>)
        }
        return (
            <>
                <h2>{label}</h2>
                <ViewPairList listArray={listArray} limit={limit} />
            </>
        )
    }

    return (
        <div className="socialShell" key={goals.length}>
            <h1>Characteristics</h1>
            <div className="honorShell">
                <div>
                    {honorInput}
                    <p>Integrity</p>
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
                    <p>Grit Dice</p>
                    {honorDieInput}
                </div>
            </div>
            <div className="socialBodyShell">
                <div className="socialLeftShell">
                    {getList('Goals', goals, 3, 'goals')}
                    {getPairList('Relationships', devotions, 5, 'devotions')}
                    <h2>Flaws</h2>
                    {editing ? (
                        <>
                            <div className='racial-temp-edit-shell'><input className="temperamentLocation" type="text" defaultValue={temperament} onChange={event => updateAttribute(event.target.value, "temperament")} /></div>
                            <EditList listArray={flaws} limit={5} updateFunction={updateAttribute} type={"flaws"} />
                        </>
                    ) : (
                        <>
                            <div className="temperamentLocation"><p>{temperament}</p></div>
                            <ViewList listArray={flaws} limit={5} />
                        </>
                    )
                    }
                </div>
                <div className="socialRightShell">
                    {getPairList('Descriptions', descriptions, 5, 'descriptions')}
                    {getPairList('Convictions', traits, 8, 'traits')}
                    <h2>Cultural Strength</h2>
                    {editing ? (
                        <input className='cultural-strength-input' defaultValue={strength} onBlur={event => updateAttribute(event.target.value, "strength")} />
                    ) : (
                        <p>{strength}</p>
                    )}
                </div>
            </div>
            <h2>Reputation</h2>
            <div className='reputationShell'>
                <div className="reputationTitles">
                    <p>I'm Known For</p>
                    <p>I'm Known For</p>
                    <p>I'm Known For</p>
                </div>
                {editing ? (
                    <EditList stylings={{ width: '341px' }} rowStyles={{ textAlign: 'left' }} listArray={reputation} limit={3} updateFunction={updateAttribute} type={"reputation"} />
                ) : (
                    <ViewList stylings={{ width: '341px' }} listArray={reputation} limit={3} />
                )
                }
            </div>
            <h2>Allies, Contacts, & Assets</h2>
            <div>
                {alliesTextArea}
                <div className="contactStriping">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}