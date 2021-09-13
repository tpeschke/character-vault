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
        <div className="statsShell">
            <h1>Stats</h1>
            <div className="statRowsShell">
                <div>
                    <p className="strLocation">{str}</p>
                    <p>Str</p>
                    <div id="confDieShell">
                        <p className="strConfrontationLocation">{strData.confrontation.toLowerCase()}</p>
                        <p>Conf Die</p>
                    </div>
                </div>
                <div>
                    <p className="dexLocation">{dex}</p>
                    <p>Dex</p>
                    <div id="confDieShell">
                        <p className="dexConfrontationLocation">{dexData.confrontation.toLowerCase()}</p>
                        <p>Conf Die</p>
                    </div>
                </div>
                <div>
                    <p className="conLocation">{con}</p>
                    <p>Con</p>
                    <div id="confDieShell">
                        <p className="conConfrontationLocation">{conData.confrontation.toLowerCase()}</p>
                        <p>Conf Die</p>
                    </div>
                </div>
                <div>
                    <p className="intLocation">{int}</p>
                    <p>Int</p>
                    <div id="confDieShell">
                        <p className="intConfrontationLocation">{intData.confrontation.toLowerCase()}</p>
                        <p>Conf Die</p>
                    </div>
                </div>
                <div>
                    <p className="wisLocation">{wis}</p>
                    <p>Wis</p>
                    <div id="confDieShell">
                        <p className="wisConfrontationLocation">{wisData.confrontation.toLowerCase()}</p>
                        <p>Conf Die</p>
                    </div>
                </div>
                <div>
                    <p className="chaLocation">{cha}</p>
                    <p>Cha</p>
                    <div id="confDieShell">
                        <p className="chaConfrontationLocation">{chaData.confrontation.toLowerCase()}</p>
                        <p>Conf Die</p>
                    </div>
                </div>
            </div>
        </div>
    )
}