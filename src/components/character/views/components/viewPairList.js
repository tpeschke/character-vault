import React, { Component } from 'react'
import './editPair.css'

export default class ViewPairList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || []
        }
    }

    render() {
        let { stylings, listArray } = this.state
        let listOfPairsToDisplay = listArray.map((item, i) => {
            let rowStyles = {
                top: `${i * 21.33}px`
            }
            return (<div className="editPairRow" style={rowStyles} key={`${item.value}${stylings.left}`}>
                <p className="titleInput">{item.title}</p>
                <p className="valueInput">{item.value}</p>
            </div>)
        })

        return (
            <div style={stylings}>
                {listOfPairsToDisplay}
            </div>
        )
    }
}