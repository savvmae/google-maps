import React, { Component } from 'react'
import { Row, Input, Link, Card, Col } from 'react-materialize'


export default class SearchBar extends Component {

    render() {
        return (
            <div className="container">
                <Col m={6} s={12}>
                    <div className="row margyy-t">
                        <input className="forty-w  inpy" type="text" onChange={this.props.handleChange.bind(this)} placeholder="Search for a location:" value={this.props.searchCity} />
                    </div>
                </Col>
            </div>
        )
    }

}