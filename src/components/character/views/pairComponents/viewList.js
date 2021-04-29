import React, { Component } from 'react'

export default class ViewList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || []
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render() {
        let { stylings, listArray } = this.state
        let listOfThingsToDisplay = listArray.map((item, i) => {
            let inputStyles = {
                position: 'absolute',
                width: '100%',
                top: `${i * 21.33}px`
            }
            return <p style={inputStyles} key={`${this.makeId()}`}>{item.value}</p>
        })

        return (
            <div style={stylings}>
                {listOfThingsToDisplay}
            </div>
        )
    }
}