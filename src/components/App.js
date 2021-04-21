import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react'
import Token from '../abis/Token.json'
import dbank from '../dbank.png'
import Web3 from 'web3'
import './App.css'

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {
  
  
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch);
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
        const dBankAddress = dBank.networks[netId].address;
        const dBankTotalDepositedAmount = await web3.eth.getBalance(dBankAddress);
        const tokenBalance = await token.methods
          .balanceOf(this.state.account)
          .call();
        
        // const dAmount = await dBank.methods.etherBalanceOf[this.state.account].call();
        // this.setState({
        //   dAmount: web3.utils.fromWei(dAmount.toString())
        // })
        const totalSupply = await token.methods.totalSupply().call();
        
        this.setState({
          token: token,
          dbank: dbank,
          dBankAddress: dBankAddress,
          tokenBalace: web3.utils.fromWei(tokenBalance),
          totalSupply: web3.utils.fromWei(totalSupply),
          dBankTotalDepositedAmount: web3.utils.fromWei(dBankTotalDepositedAmount)
        })
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }
    } else {
      window.alert('Please install Metamask')
    }

    //assign to values to variables: web3, netId, accounts

    //check if account is detected, then load balance&setStates, elsepush alert

    //in try block load contracts

    //if MetaMask not exists push alert
  }

  async deposit(amount) {
    const web3 = new Web3(window.ethereum);
    if (this.state.dbank !== 'undefined') {
      try {
        await this.state.dbank.methods
          .deposit()
          .send({ value: amount.toString(), from: this.state.account });
        
        
        // const dAmount = dbank.etherBalanceOf().call();
        this.setState({
          dAmount: web3.utils.fromWei(amount.toString())
        })
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }

  async withdraw(e) {
    e.preventDefault()
    if (this.state.dbank !== 'undefined') {
      try {
        await this.state.dbank.methods
          .withdraw()
          .send({ from: this.state.account })
      } catch (e) {
        console.log('Error, withdraw: ', e)
      }
    }
    //prevent button from default click
    //check if this.state.dbank is ok
    //in try block call dBank withdraw();
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
      tokenBalace: 0,
      
      dAmount: 0
    }
  }

  render() {
    return (
      <div className="text-monospace">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dbank} className="App-logo" alt="logo" height="32" />
            <b>dBank</b>
          </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
          <br></br>
          <h1>Welocome to the Decentralized Bank</h1>
          <h2>{this.state.account}</h2>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  <Tab eventKey="deposit" title="Deposit">
                    <div>
                      <br />
                      How much you want to deposit?
                      <br />
                      (min. amount is 0.01 ETH)
                      <br />
                      (1 deposit is possible at a time)
                      <br />
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          
                          let amount = this.depositAmount.value;
                          
                          amount = amount * 10 ** 18 //convert to Wei
                          this.deposit(amount)
                          
                        }}
                      >
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
                  </Tab>
                  <Tab eventKey="withdraw" title="Withdraw">
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
                  </Tab>
                  <Tab eventKey="accountDetails" title="Account Details">
                    <br />
                    <div>Deposited ETH : {this.state.dAmount}</div>
                    <br />
                    <br />
                    DBC Tokens: {this.state.tokenBalace} DBC
                  </Tab>

                  <Tab eventKey="bankDetails" title="Bank Details">
                    <br />
                    <div>Bank Name: {this.state.dBankName}</div>
                    <br/>
                    <div>Bank Address: {this.state.dBankAddress}</div>
                    <br />
                    <div>Token Name: {this.state.tokenName}</div>
                    <br />
                    <div>Bank ETH Balance: {this.state.dBankTotalDepositedAmount}</div>
                    <br/>
                    <div>Total DBC Token Supply: {this.state.totalSupply}</div>
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
