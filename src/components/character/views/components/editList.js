import React, { Component } from 'react'

export default class EditList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || [],
            limit: props.limit,
            updateFunction: props.updateFunction,
            type: props.type
        }
    }

    addNewItem = (value) => {
        let listArray = [...this.state.listArray]
        listArray.push({value})
        this.setState({ listArray }, _ => {
            this.state.updateFunction(this.state.listArray, this.state.type)
            document.getElementById('addNewItemInput').value = null;
        })
    }

    updateValue = (value, index) => {
        let listArray = [...this.state.listArray]
        if (!value || value === '') {
            listArray.splice(index)
        } else {
            if (listArray[index].id) {
                listArray[index] = {id: listArray[index].id, value}
            } else {
                listArray[index] = {value}
            }
        }
        this.setState({ listArray }, _=> this.state.updateFunction(this.state.listArray, this.state.type))
    }

    render() {
        let { stylings, listArray, limit } = this.state
        let listOfInputs = listArray.map((item, i) => {
            let inputStyles = {
                position: 'absolute',
                width: '100%',
                top: `${i * 21.33}px`
            }
            return <input style={inputStyles} key={`${i}${stylings.top}`} defaultValue={item.value} onBlur={e => this.updateValue(e.target.value, i)} />
        })

        let inputStyles = {
            position: 'absolute',
            width: '100%',
            top: `${listOfInputs.length * 21.33}px`,
            display: `${listOfInputs.length >= limit ? 'none' : 'inherit'}`
        }

        return (
            <div style={stylings}>
                {listOfInputs}
                <input style={inputStyles} onBlur={e => this.addNewItem(e.target.value)} id="addNewItemInput" />
            </div>
        )
    }
}