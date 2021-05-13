import React from 'react'

export default function Movement({ movement }) {
    let {crawl, walk, jog, run, modifiedRunLength, modifiedSprintLength, sprint} = movement
    return (
        <div>
            <p className="crawlLocation">{crawl}</p>
            <p className="walkLocation">{walk}</p>
            <p className="jogLocation">{jog}</p>
            <p className="runLocation">{run}</p>
            <p className="runLengthLocation">{modifiedRunLength > 0 ? modifiedRunLength : 0} seconds</p>
            <p className="sprintLocation">{sprint}</p>
            <p className="sprintLengthLocation">{modifiedSprintLength > 0 ? modifiedSprintLength : 0} seconds</p>
        </div>
    )
}