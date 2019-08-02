import React from 'react';
import TextFormatter from './services/TextFormatter';

class OrderMenu extends React.Component {
    /**
     *       Instructions
     *  1. Get AllProducts and Variants
     *  2. Create Order
     *  3. Get Resume products pending
     *  4. Update order variant Status
     *  5. Update variant
     *  6. get All Orders
     */


    constructor(props) {
        super(props);
        this.processCallServer = this.processCallServer.bind(this);
        const conn = new WebSocket('ws://192.168.1.111:8090');
        conn.onopen = () => {
            conn.send(JSON.stringify({instruction: 1}));
            // conn.send(JSON.stringify({instruction: 6}));
        };
        conn.onmessage = this.processCallServer;

        this.state = {
            order: [],
            products: []
        }
    }

    componentDidMount() {

    }

    render() {
        return <div className="row mt-1 mx-0">
            <div className={"col-12"}>

            </div>
            <div className="col-12 px-0">
                {this.renderProducts()}
            </div>

        </div>
    }

    processCallServer(serverResponse) {
        const data = JSON.parse(serverResponse.data);
        const instruction = data.instruction;
        switch (instruction) {
            case 1:
                const products = JSON.parse(data.data);
                this.setState({products: products});
                console.log(products);
                break;
        }
    }

    renderProducts() {
        let products = this.state.products;
        let cards = products.map(product => {
            return (<div key={product.id} className="card my-1">
                <div className="card-header" id={"product-" + product.id}>
                    <h5 className="mb-0">
                        <button className="btn btn-link"
                                data-toggle="collapse"
                                data-target={"#collapseProduct" + product.id}
                                aria-expanded="true"
                                aria-controls={"collapseProduct" + product.id}>
                            {product.name}
                        </button>
                    </h5>
                </div>
                <div id={"collapseProduct" + product.id}
                     className={"collapse " + (product.id === 1 ? "show" : " ")}
                     aria-labelledby={"product-" + product.id}
                     data-parent="#accordion">
                    <div className="card-body px-0">
                        <div className="row">
                            <div className="col-12">
                                <table className="table">
                                    <tbody>
                                    {product.variants.map(variant => {
                                        return <tr>
                                            <td>{variant.name}</td>
                                            <td>{TextFormatter.asMoney(variant.price)}</td>
                                            <td width="20%">{<input type="number" className="form-control"/>}</td>
                                            <td>
                                                <i className="fas fa-comment-dots fa-2x text-primary"></i>
                                                &nbsp;&nbsp;&nbsp;
                                                <i className="fas fa-plus-circle text-success fa-2x"></i>
                                            </td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        });
        return (<div id="accordion">{cards}</div>)
    }


}

export default OrderMenu;
