import React from 'react'
import './ranges.css'

export default function Ranges({ maxrange, editing, updateAttribute }) {
    function calculateRange(rangeIncrement, min, max, isMax) {
        if (editing && isMax) {
            return (
                <div>
                    <p>{rangeIncrement}</p>
                    <p className="maxrangeLocation">{min}</p>
                    <p>-</p>
                    <input className="maxrangeLocation" type="number" defaultValue={max} onChange={event => updateAttribute(event.target.value, "maxrange")} />
                </div>
            )
        }
        return (
            <div>
                <p>{rangeIncrement}</p>
                <p className="maxrangeLocation">{min}</p>
                <p>-</p>
                <p className="maxrangeLocation">{max}</p>
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
                {calculateRange('-32', +(maxrange / 1.2).toFixed(0) + 1, maxrange, true)}
            </div>)
    }

    return (
        <div>
            {ranges}
        </div>
    )
}