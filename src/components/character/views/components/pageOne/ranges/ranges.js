import React from 'react'
import './ranges.css'

export default function Ranges({ maxrange, editing, updateAttribute }) {

    if (editing) {
        return (
            <div className="rangeShell">
                <h2>Ranges (ft)</h2>
                <div>
                    <p>0</p>
                    <p className="maxrangeLocation one">5</p>
                    <p>-</p>
                    <p className="maxrangeLocation two">{(maxrange / 6).toFixed(0)}</p>
                </div>
                <div>
                    <p>-2</p>
                    <p className="maxrangeLocation three">{+(maxrange / 6).toFixed(0) + 1}</p>
                    <p>-</p>
                    <p className="maxrangeLocation four">{(maxrange / 3).toFixed(0)}</p>
                </div>
                <div>
                    <p>-4</p>
                    <p className="maxrangeLocation five">{+(maxrange / 3).toFixed(0) + 1}</p>
                    <p>-</p>
                    <p className="maxrangeLocation six">{(maxrange / 2).toFixed(0)}</p>
                </div>
                <div>
                    <p>-8</p>
                    <p className="maxrangeLocation seven">{+(maxrange / 2).toFixed(0) + 1}</p>
                    <p>-</p>
                    <p className="maxrangeLocation eight">{(maxrange / 1.5).toFixed(0)}</p>
                </div>
                <div>
                    <p>-16</p>
                    <p className="maxrangeLocation nine">{+(maxrange / 1.5).toFixed(0) + 1}</p>
                    <p>-</p>
                    <p className="maxrangeLocation ten">{(maxrange / 1.2).toFixed(0)}</p>
                </div>
                <div>
                    <p>-32</p>
                    <p className="maxrangeLocation eleven">{+(maxrange / 1.2).toFixed(0) + 1}</p>
                    <p>-</p>
                    <input className="maxrangeLocation" type="number" defaultValue={maxrange} onChange={event => updateAttribute(event.target.value, "maxrange")} />
                </div>
            </div>
        )
    }

    let ranges = (<div className="rangeShell">
        <h2>Ranges (ft)</h2>
        <div>
            <p>0</p>
            <p className="maxrangeLocation"> </p>
            <p>-</p>
            <p className="maxrangeLocation"> </p>
        </div>
        <div>
            <p>-2</p>
            <p className="maxrangeLocation"> </p>
            <p>-</p>
            <p className="maxrangeLocation"> </p>
        </div>
        <div>
            <p>-4</p>
            <p className="maxrangeLocation"> </p>
            <p>-</p>
            <p className="maxrangeLocation"> </p>
        </div>
        <div>
            <p>-8</p>
            <p className="maxrangeLocation"> </p>
            <p>-</p>
            <p className="maxrangeLocation"> </p>
        </div>
        <div>
            <p>-16</p>
            <p className="maxrangeLocation"> </p>
            <p>-</p>
            <p className="maxrangeLocation"> </p>
        </div>
        <div>
            <p>-32</p>
            <p className="maxrangeLocation"> </p>
            <p>-</p>
            <p className="maxrangeLocation"> </p>
        </div>
    </div>)

    if (maxrange) {
        ranges = (
            <div className="rangeShell">
                <h2>Ranges (ft)</h2>
                {calculateRange('0', 5, +(maxrange / 6).toFixed(0))}
                {calculateRange('-2', +(maxrange / 6).toFixed(0) + 1, +(maxrange / 3).toFixed(0))}
                {calculateRange('-4', +(maxrange / 3).toFixed(0) + 1, +(maxrange / 2).toFixed(0))}
                {calculateRange('-8', +(maxrange / 2).toFixed(0) + 1, +(maxrange / 1.5).toFixed(0))}
                {calculateRange('-16', +(maxrange / 1.5).toFixed(0) + 1, +(maxrange / 1.2).toFixed(0))}
                {calculateRange('-32', +(maxrange / 1.2).toFixed(0) + 1, maxrange)}
            </div>)
    }

    return (
        <div>
            {ranges}
        </div>
    )
}

function calculateRange(rangeIncrement, min, max) {
    return (
        <div>
            <p>{rangeIncrement}</p>
            <p className="maxrangeLocation">{min}</p>
            <p>-</p>
            <p className="maxrangeLocation">{max}</p>
        </div>
    )
}