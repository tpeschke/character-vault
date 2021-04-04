import { Component } from "react";
import './character.css'
import { withRouter } from "react-router";

class Character extends Component {
    constructor(props) {
        super(props)

        this.state = {
            downloadMode: props.match.path === "/download/:character",
            character: props.match.params.character
        }
    }

    componentWillMount() {
        console.log(this.state.downloadMode, this.state.character)
    }

    render() {
        return (
            <div id="pdf">
                <div className="pageOne pageBase">

                </div>
                <div className="pageTwo pageBase">

                </div>
            </div>
        )
    }
}

export default withRouter(Character)