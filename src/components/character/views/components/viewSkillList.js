import React, { Component } from 'react'
import './editPair.css'

export default class ViewSkillList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || [],
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render() {
        let { stylings, listArray, limit } = this.state
        let listOfSkills = listArray.map((item, i) => {
            let rowStyles = {
                top: `${i * 21}px`
            }
            return (<div className="editPairRow" style={rowStyles} key={`${this.makeId()}`}>
                <p className="skillInput">{item.skill}</p>
                <p className="costView">{item.cost + (item.rank * 2)}</p>
                <p className="rankInput">{item.rank}</p>
            </div>)
        })

        return (
            <div style={stylings}>
                {listOfSkills}
            </div>
        )
    }
}