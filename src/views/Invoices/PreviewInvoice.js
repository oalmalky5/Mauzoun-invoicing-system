import React, {useEffect, useState, useRef} from "react";
import axios from "axios";

import alertify from "alertifyjs";
import {API_URL} from "../../constants";


export function PreviewInvoice(props) {

    const sr_no = props.match.params.sr_no;
    const status = props.match.params.status;

    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        axios.get(API_URL + 'invoices/' + sr_no + '/' + status +'/preview').then((response) => {

            if (response.data.status) {
                setInvoice(response.data.data);
            } else if (response.data.code === 404) {
                alertify.error(response.data.message);
                return null;
            }
        });
    }, []);

    return (
        <>
            <iframe src={invoice.pdf_url} height={"800px"} width={"100%"}></iframe>
        </>

    );
}
