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

    deepCopyListArray = () => {
        return this.state.listArray.map(item=>{return {...item}})
    }

    addNewItem = (value) => {
        let listArray = this.deepCopyListArray()
        listArray.push({value})
        this.setState({ listArray }, _ => {
            this.state.updateFunction(this.state.listArray, this.state.type)
            document.getElementById('addNewItemInput').value = null;
        })
    }

    updateValue = (value, index) => {
        let listArray = this.deepCopyListArray()
        if (!value || value === '') {
            listArray.splice(index, 1)
        } else {
            listArray[index] = {...listArray[index], value}
        }
        console.log(listArray)
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
            return <input style={inputStyles} key={`${item.value}${stylings.left}`} defaultValue={item.value} onBlur={e => this.updateValue(e.target.value, i)} />
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