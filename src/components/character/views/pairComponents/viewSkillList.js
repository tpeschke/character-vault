import React, { Component } from 'react'
import './editPair.css'

export default class ViewSkillList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
             ...props.stylings },
            listArray: props.listArray || [],
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render() {
        let { stylings, listArray } = this.state
        let listOfSkills = listArray.map((item, i) => {
            return (<div className="editPairRow" key={`${this.makeId()}`}>
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