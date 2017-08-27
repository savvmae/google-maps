import React, { Component } from 'react'

export default class SearchBar extends Component {
    constructor() {
        super()

        this.state = {
            searchCity: ''
        }
    }
    handleChange = (e) => {
        this.setState({searchCity: e.target.value})
    }
    handleSearchSubmit = (e) => {
        e.preventDefault();
        // send city
        this.setState({searchCity: ''})
    }
    render() {
        return (
            <form onSubmit={this.handleSearchSubmit}>
                <input type="text" onChange={this.handleChange} placeholder="Search for a location:" value={this.state.searchCity} />
                <button type="submit">Search</button>
            </form>
        )
    }

}