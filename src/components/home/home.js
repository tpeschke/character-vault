import React, { Component } from 'react';
import './home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            characters: null
        }
    }

    componentWillMount() {
        axios.get('/api/characters').then(({data:characters}) => {
            this.setState({characters})
        })
    }

    render = () => {
        let { characters } = this.state
        if (!characters) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        }
        
        let characterList = characters.map(({name, race, primary, secondary, level, id}) => {
            return (
                <Link className="character" key={id} to={`/view/${id}`}>
                    <p>{name}</p>
                    <p>{race}</p>
                    <p>{primary}/{secondary}</p>
                    <p>Level: {level}</p>
                </Link>
            )
        })

        return (
            <div className="homeShell">
                <h4>Here are your characters:</h4>
                <div>
                    {characterList}
                </div>
                <i className="fas fa-plus"></i>
            </div>)
    }
}