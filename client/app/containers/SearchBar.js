import React, { Component } from 'react'
import { Row, Input, Link, Card, Col } from 'react-materialize'


export default class SearchBar extends Component {

    render() {
        return (
            <input className="forty-w  inpy margy-r" type="text" onChange={this.props.handleChange.bind(this)} placeholder="Search for a location:" value={this.props.searchCity} />
        )
    }

}