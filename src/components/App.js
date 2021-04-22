import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react'
import Token from '../abis/Token.json'
import './App.css'
import Web3 from 'web3'
import Navbar from './Navbar'
import Header from './Header'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import AccountDetails from './AccountDetails'
import BankDetails from './BankDetails'
import Borrow from './Borrow'
import Payoff from './Payoff'

class App extends Component {
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  // connect the app with the blockchain
  async loadBlockchainData(dispatch) {
    //check if MetaMask exists
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      //load balance

      if (typeof accounts[0] !== 'undefined') {
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({
          account: accounts[0],
          balance: web3.utils.fromWei(balance),
          web3: web3,
        })
      } else {
        window.alert('Please login with Metamask.')
      }

      try {
        // Token Bank
        const token = new web3.eth.Contract(
          Token.abi,
          Token.networks[netId].address,
        )
        const dbank = new web3.eth.Contract(
          dBank.abi,
          dBank.networks[netId].address,
        )
        const dBankAddress = dBank.networks[netId].address
        const dBankTotalDepositedAmount = await web3.eth.getBalance(
          dBankAddress,
        )
        const tokenBalance = await token.methods
          .balanceOf(this.state.account)
          .call()

        const totalSupply = await token.methods.totalSupply().call()

        this.setState({
          token: token,
          dbank: dbank,
          dBankAddress: dBankAddress,
          tokenBalance: web3.utils.fromWei(tokenBalance),
          totalSupply: web3.utils.fromWei(totalSupply),
          dBankTotalDepositedAmount: web3.utils.fromWei(
            dBankTotalDepositedAmount,
          ),
        })
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }
    } else {
      window.alert('Please install Metamask')
    }
  }

  
  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      tokenName: 'DBC',
      totalSupply: 0,
      dbank: null,
      dBankName: 'Decentralized Bank Currency',
      balance: 0,
      dBankAddress: null,
      dBankTotalDepositedAmount: 0,
      tokenBalance: 0,

      dAmount: 0,
    }
  }

  render() {
    return (
      <div className="text-monospace">
        <Navbar />
        <div className="container-fluid mt-5 text-center">
          <br />
          <Header account={this.state.account} />
          <br></br>

          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  <Tab eventKey="deposit" title="Deposit">
                    <Deposit
                      dbank={this.state.dbank}
                      account={this.state.account}
                    />
                  </Tab>

                  <Tab eventKey="withdraw" title="Withdraw">
                    <Withdraw
                      dbank={this.state.dbank}
                      account={this.state.account}
                    />
                  </Tab>
                  <Tab eventKey="accountDetails" title="Account Details">
                    <AccountDetails
                      dAmount={this.state.dAmount}
                      tokenBalance={this.state.tokenBalance}
                    />
                  </Tab>

                  <Tab eventKey="bankDetails" title="Bank Details">
                    <BankDetails
                      dBankName={this.state.dBankName}
                      dBankAddress={this.state.dBankAddress}
                      tokenName={this.state.tokenName}
                      dBankTotalDepositedAmount={
                        this.state.dBankTotalDepositedAmount
                      }
                      totalSupply={this.state.totalSupply}
                    />
                  </Tab>
                  <Tab eventKey="borrow" title="Borrow Tokens">
                    <Borrow
                      dbank={this.state.dbank}
                      account={this.state.account}
                    />
                  </Tab>

                  <Tab eventKey="payOff" title="Payoff">
                    <Payoff dbank={this.state.dbank} account={this.state.account} dBankAddress ={this.state.dBankAddress} token = {this.state.token}/>
                  </Tab>

                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
