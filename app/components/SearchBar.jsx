import React, { Component } from 'react'

export default class SearchBar extends Component {
    constructor() {
        super()

        this.state = {
            searchCity: ''
        }
    }


    render() {
        return (
            <form onSubmit={this.props.handleSearchSubmit.bind(this)}>
                <input type="text" onChange={this.props.handleChange.bind(this)} placeholder="Search for a location:" value={this.props.searchCity} />
                <button type="submit">Search</button>
            </form>
        )
    }

}