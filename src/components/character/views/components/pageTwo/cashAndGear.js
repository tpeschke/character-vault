import React from 'react'
import EditPairList from '../pairComponents/editPairList'

export default function Skills({ cashAndGear, editing }) {
    let { copper, updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, shownGearCarry, shownCarry } = cashAndGear
    if (editing) {
        return (
            <div>
                <input className="copperLocation" type="text" defaultValue={copper} onChange={event => updateAttribute(event.target.value, "copper")} />
                <input className="silverLocation" type="text" defaultValue={silver} onChange={event => updateAttribute(event.target.value, "silver")} />
                <input className="goldLocation" type="text" defaultValue={gold} onChange={event => updateAttribute(event.target.value, "gold")} />
                <input className="platiniumLocation" type="text" defaultValue={platinium} onChange={event => updateAttribute(event.target.value, "platinium")} />
                <EditPairList stylings={{ top: '379px', left: '20px', width: '201px' }} listArray={gearone} limit={6} updateFunction={updateAttribute} type={"gearone"} />
                <EditPairList stylings={{ top: '379px', left: '221px', width: '199px' }} listArray={geartwo} limit={6} updateFunction={updateAttribute} type={"geartwo"} />
                <EditPairList stylings={{ top: '379px', left: '422px', width: '198px' }} listArray={gearthree} limit={6} updateFunction={updateAttribute} type={"gearthree"} />
                <EditPairList stylings={{ top: '379px', left: '619px', width: '175px' }} listArray={gearfour} limit={6} updateFunction={updateAttribute} type={"gearfour"} />
            </div>
        )
    }
    return (
        <div>
            <input className="copperLocation" type="text" defaultValue={copper} onBlur={event => updateAttribute(event.target.value, "copper")} />
            <input className="silverLocation" type="text" defaultValue={silver} onBlur={event => updateAttribute(event.target.value, "silver")} />
            <input className="goldLocation" type="text" defaultValue={gold} onBlur={event => updateAttribute(event.target.value, "gold")} />
            <input className="platiniumLocation" type="text" defaultValue={platinium} onBlur={event => updateAttribute(event.target.value, "platinium")} />
            <EditPairList stylings={{ top: '380px', left: '20px', width: '201px' }} listArray={gearone} limit={6} updateFunction={updateAttribute} type={"gearone"} />
            <EditPairList stylings={{ top: '380px', left: '221px', width: '199px' }} listArray={geartwo} limit={6} updateFunction={updateAttribute} type={"geartwo"} />
            <EditPairList stylings={{ top: '380px', left: '422px', width: '198px' }} listArray={gearthree} limit={6} updateFunction={updateAttribute} type={"gearthree"} />
            <EditPairList stylings={{ top: '380px', left: '619px', width: '175px' }} listArray={gearfour} limit={6} updateFunction={updateAttribute} type={"gearfour"} />
            <p className="shownGearCarryLocation">{shownGearCarry}</p>
            <p className="strCarryLocation">{shownCarry}</p>
        </div>
    )
}