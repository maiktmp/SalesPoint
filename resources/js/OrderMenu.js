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
        this.onAddProduct = this.onAddProduct.bind(this);
        this.onDeleteProduct = this.onDeleteProduct.bind(this);
        this.onCreateOrder = this.onCreateOrder.bind(this);

        const conn = new WebSocket('ws://192.168.1.111:8090');
        conn.onopen = () => {
            conn.send(JSON.stringify({instruction: 1}));
            // conn.send(JSON.stringify({instruction: 6}));
        };
        conn.onmessage = this.processCallServer;

        this.state = {
            orderProducts: [],
            products: [],
            client_name: ""
        }
    }

    componentDidMount() {

    }

    render() {
        return <div className="row mt-1 mx-0">
            <div className={"col-12 px-0"}>
                {this.renderOrder()}
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
                                        return <React.Fragment>
                                            <tr>
                                                <td>{variant.name}</td>
                                                <td>{TextFormatter.asMoney(variant.price)}</td>
                                                <td width="20%">{<input id={"inp-quantity-variant-" + variant.id}
                                                                        type="number"
                                                                        className="form-control"/>}
                                                </td>
                                                <td>
                                                    <i onClick={(e) => {
                                                        this.onAddProduct(product, variant)
                                                    }}
                                                       className="fas fa-plus-circle text-success fa-2x"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <i
                                                                className="fas fa-comment-dots fa-2x text-primary mx-1"/>
                                                        </div>
                                                        <input
                                                            id={"inp-comments-variant-" + variant.id}
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Comentarios" aria-label="Username"
                                                            aria-describedby="basic-addon1"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        </React.Fragment>
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

    renderOrder() {
        return <div className={'card'}>
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <td colSpan={3} className={'text-center'}>
                                    Productos de la orden
                                    <input id={"inp-order-client-name"} type="text" className="form-control"/>

                                </td>
                                <td>
                                    <button onClick={this.onCreateOrder} className="btn btn-success">Crear</button>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.orderProducts.map(orderHasVariant => {
                                    console.log(orderHasVariant);
                                    return <React.Fragment>
                                        <tr>
                                            <td>{orderHasVariant.variant.product.name}</td>
                                            <td>{orderHasVariant.variant.name}</td>
                                            <td>{orderHasVariant.quantity}</td>
                                            <td>
                                                <i
                                                    onClick={(e) => this.onDeleteProduct(orderHasVariant)}
                                                    className="fas fa-trash-alt text-danger"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}>{orderHasVariant.description}</td>
                                        </tr>
                                    </React.Fragment>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    }

    onAddProduct(product, variant) {
        const quantity = document.getElementById('inp-quantity-variant-' + variant.id).value;
        const comment = document.getElementById('inp-comments-variant-' + variant.id).value;

        let orderProducts = this.state.orderProducts;
        let id = orderProducts.length + 1;
        let orderHasVariant = {
            id: id,
            price: variant.price,
            quantity: quantity,
            description: comment,
            fk_id_variant: variant.id,
            variant: {
                id: variant.id,
                name: variant.name,
                product: {
                    id: product.id,
                    name: product.name,
                }
            }
        };

        orderProducts.push(orderHasVariant);
        this.setState({orderProducts: orderProducts});
        document.getElementById('inp-quantity-variant-' + variant.id).value = "";
        document.getElementById('inp-comments-variant-' + variant.id).value = "";
    }

    onDeleteProduct(orderHasVariant) {
        let orderProducts = this.state.orderProducts;
        orderProducts = orderProducts.filter(orderProduct => orderProduct.id !== orderHasVariant.id);
        this.setState({orderProducts: orderProducts});
    }

    onCreateOrder() {
        console.table(this.state.orderProducts);

        const clientName = document.getElementById('inp-order-client-name').value;

        const conn = new WebSocket('ws://192.168.1.111:8090');
        conn.onopen = () => {
            conn.send(JSON.stringify({instruction: 1}));
            // conn.send(JSON.stringify({instruction: 6}));
        };
        conn.onmessage = response => {
            const data = JSON.parse(response.data);
            if (data.success) {
                window.location.reload();
            }
        };
        conn.onopen = () => {
            conn.send(JSON.stringify({
                instruction: 2,
                name: clientName,
                orderHasVariants: this.state.orderProducts
            }));
        };
    }
}

export default OrderMenu;
