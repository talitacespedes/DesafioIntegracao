import React, { Component } from "react";
import { Table } from "react-bootstrap";

import * as API from "../api/APIUtils";

import formatPrice from "../utils/formatPrice";
import formatMonth from "../utils/formatMonth";

export default class GeneralTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            releases: [],
            categories: []
        };
    };

    async componentDidMount() {
        try {
            this.setState({
                isLoading: true,
                releases: await API.fetchReleasesJSON(),
                categories: await API.fetchCategoriesJSON()
            })
        }
        catch(error) {
            console.error(error);
        }
    };

    renderCategory(category) {
        const { categories } = this.state;
        
        let name;
        categories.map(cat => {
            if(cat.id == category){
                name = cat.nome;
            };

            return false;
        });

        return name;
    };

    renderData() {
        const { releases } = this.state;

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Origem</th>
                        <th>Categoria</th>
                        <th>Valor Gasto</th>
                        <th>Mês</th>
                    </tr>
                </thead>

                <tbody>
                {releases.map(item => (
                    <tr key={item.id}>
                        <td>{item.origem}</td>
                        <td>{this.renderCategory(item.categoria)}</td>
                        <td>{formatPrice(item.valor)}</td>
                        <td>{formatMonth(item.mes_lancamento)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    };

    render() {
        const { isLoading } = this.state;
        
        return (
            <React.Fragment>
                <h2>Tabela Geral</h2>
                {!isLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    this.renderData()
                )}
            </React.Fragment>
        );
    };

}