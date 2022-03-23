import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import queryString from 'query-string';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
const CONFIG = require("../../configs/api.config.json");
class ViewPDF extends React.Component {
    state = {
        srcFile: {}
    };
    componentDidMount() {
        const { search } = this.props.location
        const parsed = queryString.parse(search);
        //console.log('parsed', parsed);

        if (parsed.type == "VMI")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_VMI_V2.pdf" });
        else if (parsed.type == "CMI")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_CMI_V2.pdf" });
        else if (parsed.type == "VSmartAndroid")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_VSmart_Android.pdf" });
        else if (parsed.type == "VSmartIOS")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_VSmart_IOS.pdf" });
        else if (parsed.type == "Agent")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_eAgency_ForAgent.pdf" });
        else if (parsed.type == "Admin")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_eAgency_ForAdmin.pdf" });
        else if (parsed.type == "AO")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_eAgency_ForAO.pdf" });
        else if (parsed.type == "Underwrite")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_eAgency_ForUnderwrite.pdf" });
        else if (parsed.type == "OFB")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_eAgency_ForOFB.pdf" });
        else if (parsed.type == "OFC")
            this.setState({ srcFile: CONFIG.UserManualUrl.URL + "UserManual_eAgency_ForOFC.pdf" });
    }
    render() {

        return (

            <ResponsiveEmbed ratio='16:9'>
                <iframe
                    src={this.state.srcFile}
                    type='application/pdf'
                    title='title'
                />
            </ResponsiveEmbed>


            //     <div style="position:relative;height:0;overflow:hidden;max-width:100%;padding-bottom:56.25%;">
            //     <iframe
            //         style="position:absolute;top:0;left:0;width:100%;height:100%;"
            //         src={this.state.srcFile}
            //         type='application/pdf'
            //         title='title'
            //     />

            // </div>
        )
    }
}
export default ViewPDF;