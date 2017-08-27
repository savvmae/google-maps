import React, { Component } from 'react'

export default class SearchBar extends Component {
    constructor() {
        super()

        this.state = {
            searchCity: ''
        }
        this.handleChange.bind(this)
        this.handleSearchSubmit.bind(this)
    }
    handleChange(e) {
        
        this.setState({searchCity: e.target.value})
        console.log(this.state)
    }
    handleSearchSubmit (e) {
        e.preventDefault();
        // send city
        this.setState({searchCity: ''})
        console.log(this.state)
    }
    render() {
        return (
            <form onSubmit={this.handleSearchSubmit.bind(this)}>
                <input type="text" onChange={this.handleChange.bind(this)} placeholder="Search for a location:" value={this.state.searchCity} />
                <button type="submit">Search</button>
            </form>
        )
    }

}