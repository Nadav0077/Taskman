import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


class _DropdownView extends Component {
    state = {
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <h1>Temp CONNECT COMP</h1>
        )
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {

}


export const DropdownView = connect(mapStateToProps, mapDispatchToProps)(_DropdownView)