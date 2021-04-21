import React, { Component } from 'react';

class Header extends Component {
    
    
    render() {
        return (
            <div>
                <h1>Welocome to the Decentralized Bank</h1>
                <h2>{this.props.account}</h2>
            </div>
        )
    }
}

export default Header;
