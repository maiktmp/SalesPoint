import React from 'react';
import ReactDOM from 'react-dom';
import Pending from "./Pending";


$(document).ready(e => {
    const rootNode = document.getElementById('react-dom');
    ReactDOM.unmountComponentAtNode(rootNode);
    ReactDOM.render(
        <Pending/>,
        rootNode
    );
    $('#modal-upsert').modal('show');
});
