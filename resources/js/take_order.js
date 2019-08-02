import React from 'react';
import ReactDOM from 'react-dom';
import Pending from "./Pending";
import OrderMenu from "./OrderMenu";


$(document).ready(e => {
    const rootNode = document.getElementById('react-dom');
    ReactDOM.unmountComponentAtNode(rootNode);

    ReactDOM.render(
        <OrderMenu/>,
        rootNode
    );
});
