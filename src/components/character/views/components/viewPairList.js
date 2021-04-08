import React, { Component } from 'react'
import './editPair.css'

export default class ViewPairList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || [],
            converterFunction: props.converterFunction || this.converterFunction
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    converterFunction = (value) => {
        return value
    }

    render() {
        let { stylings, listArray } = this.state
        let listOfPairsToDisplay = listArray.map((item, i) => {
            let rowStyles = {
                top: `${i * 21.33}px`
            }
            return (<div className="editPairRow" style={rowStyles} key={`${this.makeId()}`}>
                <p className="titleInput">{item.title}</p>
                <p className="valueDisplay">{this.state.converterFunction(item.value)}</p>
            </div>)
        })

        return (
            <div style={stylings}>
                {listOfPairsToDisplay}
            </div>
        )
    }
}