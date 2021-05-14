import React from 'react'
import ViewList from '../pairComponents/viewList'
import ViewPairList from '../pairComponents/viewPairList'
import EditList from '../pairComponents/editList'
import EditPairList from '../pairComponents/editPairList'

export default function Social({ social, editing }) {
    let { shownHonor, updateAttribute, circleFill, honorDiceLeft, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts, honor } = social

    if (editing) {
        return (
            <div>
                <input className="honorLocation" type="number" max="25" min="0" defaultValue={honor} onChange={event => updateAttribute(event.target.value, "honor")} />
                <input className="temperamentLocation" type="text" defaultValue={temperament} onChange={event => updateAttribute(event.target.value, "temperament")} />
                <EditList stylings={{ top: '358px', left: '20px', width: '224px' }} listArray={goals} limit={3} updateFunction={updateAttribute} type={"goals"} />
                <EditPairList stylings={{ top: '508px', left: '20px', width: '224px' }} listArray={devotions} limit={3} updateFunction={updateAttribute} type={"devotions"} />
                <EditPairList stylings={{ top: '593px', left: '20px', width: '427px', height: '67px' }} rowWidth={'212px'} listArray={flaws} limit={6} updateFunction={updateAttribute} type={"flaws"} defaultValue={"d4!+Stress"} />
                <EditPairList stylings={{ top: '383px', left: '246px', width: '200px' }} listArray={traits} limit={9} updateFunction={updateAttribute} type={"traits"} />
                <EditList stylings={{ top: '610px', left: '107px', width: '340px' }} listArray={reputation} limit={3} updateFunction={updateAttribute} type={"reputation"} />
                <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onChange={event => updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>
            </div>
        )
    }
    return (
        <div>
            <input className="honorLocation" type="number" max="25" min="0" defaultValue={shownHonor} onBlur={event => updateAttribute(event.target.value, "honor")} />
            <div className="circle" style={{ left: honorDiceLeft }}>{circleFill}</div>
            <input className="extrahonordiceLocation" type="number" min="0" defaultValue={extrahonordice} onBlur={event => updateAttribute(event.target.value, "extrahonordice")} />
            <p className="temperamentLocation">{temperament}</p>
            <ViewList stylings={{ top: '405px', left: '20px', width: '224px' }} listArray={goals} />
            <ViewPairList stylings={{ top: '507px', left: '20px', width: '224px' }} listArray={devotions} />
            <ViewPairList stylings={{ top: '593px', left: '20px', width: '427px', height: '67px' }} rowWidth={'212px'} listArray={flaws} />
            <ViewPairList stylings={{ top: '384px', left: '246px', width: '200px' }} listArray={traits} />
            <ViewList stylings={{ top: '656px', left: '107px', width: '340px' }} listArray={reputation} />
            <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onBlur={event => updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>
        </div>
    )
}