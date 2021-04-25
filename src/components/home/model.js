import React, { Component } from 'react'
import axios from 'axios'

export default class Modal extends Component {
    constructor() {
        super()

        this.state = {
            loading: false

        }
    }

    removeCharacter = () => {
        this.setState({ loading: true }, _ => {
            axios.patch(`/api/removeCharacter/${this.props.characterId}`).then(data => {
                this.props.toggleModel(false)
                this.setState({loading: false})
            })
        })
    }


    render() {
        let { showModel, toggleModel } = this.props
        if (this.state.loading) {
            return (<div className={showModel ? "overlay" : "displayNone"}>
                <div className="spinnerShell"><i className="fas fa-spinner"></i></div>
            </div>)
        }
        return (
            <div className={showModel ? "overlay" : "displayNone"}>
                <div className="modelBody">
                    <h5>Sure You Want to Remove This Character?</h5>
                    <p>You'll still be able to access it through the Vault.</p>
                    <p>However, it'll be a pain to find and you won't be able to edit it.</p>
                    <div className="modelButtons">
                        <button className="yes" onClick={this.removeCharacter}>Go For It</button>
                        <button className="no" onClick={_ => toggleModel(false)}>Wait, Nevermind</button>
                    </div>
                </div>
            </div>
        )
    }
}