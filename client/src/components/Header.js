import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'components/HeaderStyle.scss';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <>
                    <Link to="/signout">Signout</Link>
                    <Link to="/feature">Feature</Link>
                </>
            );
        } else {
            return (
                <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/signin">Signin</Link>
                </>
            );
        }
    }

    render() {
        return (
            <div className="header">
                <Link to="/">Redux Auth</Link>
                <div>{this.renderLinks()}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth: { authenticated } }) => ({ authenticated });

export default connect(mapStateToProps, null)(Header);
