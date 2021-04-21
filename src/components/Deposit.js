import React, { Component } from 'react'
// import { Tabs, Tab } from 'react-bootstrap';
import Web3 from 'web3'

class Deposit extends Component {
  async deposit(amount) {
    const web3 = new Web3(window.ethereum)
    if (this.props.dbank !== 'undefined') {
      try {
        await this.props.dbank.methods
          .deposit()
          .send({ value: amount.toString(), from: this.props.account })

        // const dAmount = dbank.etherBalanceOf().call();
        this.setState({
          dAmount: web3.utils.fromWei(amount.toString()),
        })
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();

    let amount = this.depositAmount.value;

    amount = amount * 10 ** 18 //convert to Wei
    this.deposit(amount)
  }
  render() {
    return (
      <div>
        <br />
        How much you want to deposit?
        <br />
        (min. amount is 0.01 ETH)
        <br />
        (1 deposit is possible at a time)
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mr-sm-2">
            <br />
            <input
              id="depositAmount"
              step="0.01"
              type="number"
              className="form-control form-control-md"
              placeholder="amount..."
              required
              ref={(input) => {
                this.depositAmount = input
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Deposit
          </button>
        </form>
      </div>
    )
  }
}

export default Deposit
