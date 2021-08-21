import React from 'react'

export default function Ranges({ maxrange, editing, updateAttribute }) {

    if (editing) {
        return (
            <div>
                <input className="maxrangeLocation" type="number" defaultValue={maxrange} onChange={event => updateAttribute(event.target.value, "maxrange")} />
            </div>
        )
    }

    let ranges = (<div></div>)
    if (maxrange) {
        ranges = (<div>
            <p className="maxrangeLocation one">5</p>
            <p className="maxrangeLocation two">{(maxrange / 6).toFixed(0)}</p>
            <p className="maxrangeLocation three">{+(maxrange / 6).toFixed(0) + 1}</p>
            <p className="maxrangeLocation four">{(maxrange / 3).toFixed(0)}</p>
            <p className="maxrangeLocation five">{+(maxrange / 3).toFixed(0) + 1}</p>
            <p className="maxrangeLocation six">{(maxrange / 2).toFixed(0)}</p>
            <p className="maxrangeLocation seven">{+(maxrange / 2).toFixed(0) + 1}</p>
            <p className="maxrangeLocation eight">{(maxrange / 1.5).toFixed(0)}</p>
            <p className="maxrangeLocation nine">{+(maxrange / 1.5).toFixed(0) + 1}</p>
            <p className="maxrangeLocation ten">{(maxrange / 1.2).toFixed(0)}</p>
            <p className="maxrangeLocation eleven">{+(maxrange / 1.2).toFixed(0) + 1}</p>
            <p className="maxrangeLocation">{maxrange}</p>
        </div>)
    }

    return (
        <div>
            {ranges}
        </div>
    )
}