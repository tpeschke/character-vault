import React from 'react'

export default function Stats({ stats, editing }) {
    let { str, strData, dex, dexData, con, conData, int, intData, wis, wisData, cha, chaData, updateAttribute } = stats

    if (editing) {
        return (
            <div>
                <input className="strLocation" type="number" max="20" min="1" defaultValue={str} onChange={event => updateAttribute(event.target.value, "str")} />
                <input className="dexLocation" type="number" max="20" min="1" defaultValue={dex} onChange={event => updateAttribute(event.target.value, "dex")} />
                <input className="conLocation" type="number" max="20" min="1" defaultValue={con} onChange={event => updateAttribute(event.target.value, "con")} />
                <input className="intLocation" type="number" max="20" min="1" defaultValue={int} onChange={event => updateAttribute(event.target.value, "int")} />
                <input className="wisLocation" type="number" max="20" min="1" defaultValue={wis} onChange={event => updateAttribute(event.target.value, "wis")} />
                <input className="chaLocation" type="number" max="20" min="1" defaultValue={cha} onChange={event => updateAttribute(event.target.value, "cha")} />
            </div>
        )
    }
    return (
        <div>
            <p className="strLocation">{str}</p>
            <p className="strConfrontationLocation">{strData.confrontation.toLowerCase()}</p>
            <p className="dexLocation">{dex}</p>
            <p className="dexConfrontationLocation">{dexData.confrontation.toLowerCase()}</p>
            <p className="conLocation">{con}</p>
            <p className="conConfrontationLocation">{conData.confrontation.toLowerCase()}</p>
            <p className="intLocation">{int}</p>
            <p className="intConfrontationLocation">{intData.confrontation.toLowerCase()}</p>
            <p className="wisLocation">{wis}</p>
            <p className="wisConfrontationLocation">{wisData.confrontation.toLowerCase()}</p>
            <p className="chaLocation">{cha}</p>
            <p className="chaConfrontationLocation">{chaData.confrontation.toLowerCase()}</p>
        </div>
    )
}