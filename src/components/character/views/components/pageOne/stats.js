import React from 'react'

export default function Stats({ stats }) {
    let { str, strData, dex, dexData, con, conData, int, intData, wis, wisData, cha, chaData } = stats
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