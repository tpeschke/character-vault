import { Component } from "react";
import './character.css'
import { withRouter } from "react-router";

class Character extends Component {
    constructor(props) {
        super(props)

        this.state = {
            downloadMode: props.match.path === "/download/:character",
            character: props.match.params.character.split('.')[0]
        }
    }

    render() {
        let { downloadMode, character } = this.state
        return (
            <div>
                <div id="pdf" className={downloadMode ? '' : 'pdfViewStylings'}>
                    <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                        <p className="nameLocation">{character}</p>
                    </div>
                    <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>

                    </div>
                </div>
                <div className={downloadMode ? 'removeDownloadButton' : 'downloadButton'}>
                    {/* ADD LOADING INDICATOR */}
                    <a href={`http://localhost:4000/${character}.pdf`} download>Download</a>
                </div>
            </div>
        )
    }
}

export default withRouter(Character)