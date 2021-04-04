import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CharacterViewer from './components/character-viewer/character-viewer';
import Character from './components/character/character'
import Header from './components/header/header'
import Home from './components/home'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route
                        path='/view/:character'
                        component={Header(CharacterViewer)} />
                    <Route
                        path='/download/:character'
                        component={Character} />
                    <Route
                        exact path='*'
                        component={Header(Home)} />
                </Switch>
            </div>
        )
    }
}