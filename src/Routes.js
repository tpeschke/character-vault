import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Character from './components/character/character'
import Header from './components/header/header'
import Home from './components/home/home'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route
                        path='/view/:id'
                        component={Header(Character)} />
                    <Route
                        path='/download/:id'
                        component={Character} />
                    <Route
                        path='/new/:id'
                        component={Header(Character)} />
                    <Route
                        exact path='*'
                        component={Header(Home)} />
                </Switch>
            </div>
        )
    }
}