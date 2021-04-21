import React, { Component } from 'react'

class Withdraw extends Component {
  async withdraw(e) {
    e.preventDefault()
    if (this.props.dbank !== 'undefined') {
      try {
        await this.props.dbank.methods
          .withdraw()
          .send({ from: this.props.account })
      } catch (e) {
        console.log('Error, withdraw: ', e)
      }
    }
    //prevent button from default click
    //check if this.state.dbank is ok
    //in try block call dBank withdraw();
  }
  render() {
    return (
      <div>
        <br />
        Do you want to withdraw + take interest?
        <br />
        <br />
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              this.withdraw(e)
            }}
          >
            Withdraw
          </button>
        </div>
      </div>
    )
  }
}

export default Withdraw
