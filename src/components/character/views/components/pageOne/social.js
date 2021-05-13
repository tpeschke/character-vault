import React from 'react'
import ViewList from '../pairComponents/viewList'
import ViewPairList from '../pairComponents/viewPairList'

export default function Social({ social }) {
    let {shownHonor, updateAttribute, circleFill, honorDiceLeft, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts} = social
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