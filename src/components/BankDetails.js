import React, { Component } from 'react'

class BankDetails extends Component {
  render() {
    return (
      <div>
        <br />
        <div>Bank Name: {this.props.dBankName}</div>
        <br />
        <div>Bank Address: {this.props.dBankAddress}</div>
        <br />
        <div>Token Name: {this.props.tokenName}</div>
        <br />
        <div>Bank ETH Balance: {this.props.dBankTotalDepositedAmount}</div>
        <br />
        <div>Total DBC Token Supply: {this.props.totalSupply}</div>
      </div>
    )
  }
}

export default BankDetails
