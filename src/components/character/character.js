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
        let { downloadMode } = this.state
        return (
            <div id="pdf" className={downloadMode ? '' : 'pdfViewStylings'}>
                <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>

                </div>
                <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>

                </div>
            </div>
        )
    }
}

export default withRouter(Character)