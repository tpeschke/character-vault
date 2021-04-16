import React, { Component } from 'react';
import './home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import newCharacter from './newCharacter'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            characters: null
        }
    }

    componentWillMount() {
        axios.get('/api/characters').then(({ data: characters }) => {
            this.setState({ characters })
        })
    }

    createNewCharacter = () => {
        axios.post('/api/upsertCharacter', newCharacter).then(({ data: character }) => {
            console.log(character)
        })
    }

    render = () => {
        let { characters } = this.state
        if (!characters) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        }

        let characterList = characters.map(({ name, race, primarya, secondarya, level, id }) => {
            return (
                <Link className="character" key={id} to={`/view/${id}`}>
                    <p>{name}</p>
                    <p>{race}</p>
                    <p>{primarya}/{secondarya}</p>
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
                <i className="fas fa-plus" onClick={this.createNewCharacter}></i>
            </div>)
    }
}