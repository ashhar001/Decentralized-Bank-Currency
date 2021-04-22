import React, { Component } from 'react'

class Borrow extends Component {
  async borrow(amount) {
    if (this.props.dbank !== 'undefined') {
      try {
        await this.props.dbank.methods
          .borrow()
          .send({ value: amount.toString(), from: this.props.account })
      } catch (e) {
        console.log('Error, borrow: ', e)
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let amount = this.borrowAmount.value
    amount = amount * 10 ** 18 //convert to wei
    this.borrow(amount);
  }
  render() {
    return (
      <div>
        <br></br>
        Do you want to borrow tokens?
        <br></br>
        (You'll get 50% of collateral, in Tokens)
        <br></br>
        Type collateral amount (in ETH)
        <br></br>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mr-sm-2">
            <input
              id="borrowAmount"
              step="0.01"
              type="number"
              ref={(input) => {
                this.borrowAmount = input
              }}
              className="form-control form-control-md"
              placeholder="amount..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            BORROW
          </button>
        </form>
      </div>
    )
  }
}

export default Borrow
