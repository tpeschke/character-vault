import React, { Component } from 'react'

export default class ViewList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || []
        }
    }

    render() {
        let { stylings, listArray } = this.state
        let listOfThingsToDisplay = listArray.map((item, i) => {
            let inputStyles = {
                position: 'absolute',
                width: '100%',
                top: `${i * 21.33}px`
            }
            return <input style={inputStyles} key={`${i}${stylings.top}`} defaultValue={item} />
        })

        return (
            <div style={stylings}>
                {listOfThingsToDisplay}
            </div>
        )
    }
}