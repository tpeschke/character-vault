import React, { Component } from 'react';
import './home.css'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            characters: [{
                id: 1,
                name: "Luke",
                race: "Human",
                primary: "Thief",
                secondary: "Fighter",
                level: 2
            },
            {
                id: 2,
                name: "Martin",
                race: "Minotaur",
                primary: "Champion",
                secondary: "Assassin",
                level: 20
            },{
                id: 3,
                name: "Riley",
                race: "Changeling",
                primary: "Runegalder",
                secondary: "Runegalder",
                level: 5
            }]
        }
    }
    render = () => {
        let { characters } = this.state
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
            </div>)
    }
}