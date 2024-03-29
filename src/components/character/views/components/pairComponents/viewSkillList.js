import React, { Component } from 'react'
import './editPair.css'

export default class ViewSkillList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: {
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                ...props.stylings
            },
            listArray: props.listArray || [],
            rowWidth: props.rowWidth || '100%',
            skilladept: props.skilladept,
            isCombat: props.isCombat
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render() {
        let { stylings, listArray, rowWidth, skilladept, isCombat } = this.state
        let rowStyles = {
            width: rowWidth
        }
        let listOfSkills = listArray.map((item, i) => {
            if (!isCombat) {
                return (
                    <div className="editPairRow" style={rowStyles} key={`${this.makeId()}`}>
                        <p className="skillInput">{item.skill}</p>
                        <p className="costView">{item.cost + (item.rank * 3) - skilladept}</p>
                        <p className="rankInput">{item.rank}</p>
                        <p className="modInput">{item.mod}</p>
                    </div>
                )
            } else {
                return (
                    <div className="editPairRow" style={rowStyles} key={`${this.makeId()}`}>
                        <p className="skillInput combatInput">{item.skill}</p>
                        <p className="costView combatCost">{item.cost + (item.rank * 3) - skilladept}</p>
                        <p className="rankInput combatRank">{item.rank}</p>
                    </div>
                )
            }
        })

        return (
            <div style={stylings}>
                {listOfSkills}
            </div>
        )
    }
}