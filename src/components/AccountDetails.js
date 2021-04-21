import React, { Component } from 'react'

class AccountDetails extends Component {
  render() {
    return (
      <div>
        <br />
        <div>Deposited ETH : {this.props.dAmount}</div>
        <br />
        <br />
        DBC Tokens: {this.props.tokenBalance} DBC
      </div>
    )
  }
}

export default AccountDetails;
