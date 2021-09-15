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
    
    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addNewItem = (value) => {
        let listArray = this.deepCopyListArray()
        if (value) {
            listArray.push({value})
            this.setState({ listArray }, _ => {
                this.state.updateFunction(this.state.listArray, this.state.type)
                document.getElementById(`addNewItemInput${this.state.type}`).value = null;
            })
        }
    }

    updateValue = (value, index) => {
        let listArray = this.deepCopyListArray()
        if (!value || value === '') {
            listArray.splice(index, 1)
        } else {
            listArray[index] = {...listArray[index], value}
        }
        this.setState({ listArray }, _=> this.state.updateFunction(this.state.listArray, this.state.type))
    }

    render() {
        let { stylings, listArray, limit } = this.state
        let listOfInputs = listArray.map((item, i) => {
            let inputStyles = {
                position: 'absolute',
                width: '100%',
                top: `${i * 19.6}px`
            }
            return <input style={inputStyles} key={`${this.makeId()}`} defaultValue={item.value} onBlur={e => this.updateValue(e.target.value, i)} />
        })
        
        let inputStyles = {
            position: 'absolute',
            width: '100%',
            top: `${listOfInputs.length * 19.6}px`,
            display: `${listOfInputs.length >= limit ? 'none' : 'flex'}`
        }

        return (
            <div style={stylings}>
                {listOfInputs}
                <input style={inputStyles} onBlur={e => this.addNewItem(e.target.value)} id={`addNewItemInput${this.state.type}`} />
            </div>
        )
    }
}