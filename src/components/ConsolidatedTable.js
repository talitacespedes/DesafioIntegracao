import React, { Component } from "react";
import { Table, Container } from "react-bootstrap";

import * as API from "../api/APIUtils";

import formatPrice from "../utils/formatPrice";
import formatMonth from "../utils/formatMonth";

export default class ConsolidatedTable extends Component {

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
            let releases = await API.fetchReleasesJSON();

            this.setState({
                isLoading: true,
                releases: this.groupedReleases(releases),
                categories: await API.fetchCategoriesJSON()
            });
        }
        catch(error) {
            console.error(error);
        }
    };

    groupedReleases(list) {
        let group = list.reduce((items, item) => {
            items[item.mes_lancamento] = [...items[item.mes_lancamento] || [], item];
            return items;
        }, {});

        let groupedReleases = [];
        Object.entries(group).map(([key, value]) => {
            let total = 0
            value.map(item => {
                return total += item.valor
            });

            return groupedReleases.push({
                total: total,
                month: key
            });
        });

        return groupedReleases;
    };

    renderData() {
        const { releases } = this.state;

        return (
            <Table bordered striped size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>Mês</th>
                        <th>Total Gasto</th>
                    </tr>
                </thead>

                <tbody>
                {releases.map(item => (
                    <tr key={item.month}>
                        <td>{formatMonth(item.month)}</td>
                        <td>{formatPrice(item.total)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        );
    };

    render() {
        const { isLoading } = this.state;
        
        return (
            <Container>
                <h2>Tabela Consolidada</h2>
                {!isLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    this.renderData()
                )}
            </Container>
        );
    };

}