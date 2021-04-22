import React, { Component } from 'react'

class Payoff extends Component {
  async payOff(e) {
    e.preventDefault();
    if (this.props.dbank !== 'undefined') {
      try {
        const collateralEther = await this.props.dbank.methods
          .collateralEther(this.props.account)
          .call({ from: this.props.account })
        const tokenBorrowed = collateralEther / 2
        await this.props.token.methods
          .approve(this.props.dBankAddress, tokenBorrowed.toString())
          .send({ from: this.props.account })
        await this.props.dbank.methods
          .payOff()
          .send({ from: this.props.account })
      } catch (e) {
        console.log('Error, pay off: ', e)
      }
    }
  }
  render() {
    return (
      <div>
        <div>
          <br></br>
          Do you want to payoff the loan?
          <br></br>
          (You'll receive your collateral - fee)
          <br></br>
          <br></br>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => this.payOff(e)}
          >
            PAYOFF
          </button>
        </div>
      </div>
    )
  }
}

export default Payoff
