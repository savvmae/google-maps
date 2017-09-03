import React, { Component } from 'react'
import { Row, Input, Link, Card, Col } from 'react-materialize'


export default class SearchBar extends Component {

    render() {
        return (
            <div className="container">
                <Col m={6} s={12}>
                    <div className="row">
                        <form className="margy-t" onSubmit={this.props.handleSearchSubmit.bind(this)} >
                            <input className="fifty-w margy-r" type="text" onChange={this.props.handleChange.bind(this)} placeholder="Search for a location:" value={this.props.searchCity} />
                            <button className="btn waves-effect waves-light z-zero" type="submit">Search</button>
                        </form>
                    </div>
                </Col>
            </div>
        )
    }

}