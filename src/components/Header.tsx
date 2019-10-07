import React, { Component }  from 'react'
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
import { Link } from "react-router-dom";

interface Props {
  breakpoint: string;
}

interface State {
  run: boolean;
  endTour: boolean;
  steps: Step[];
}

class Header extends Component<Props, State> {
  private helpers?: StoreHelpers;
  constructor(props: Props) {
    super(props);
    this.state = {
      run: false,
      endTour: true,
      steps: [
        {
          target: '.navbar-brand',
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true
          },
          content: (
            <div>
              <h2>Blockchain Demo</h2>
              <p>A blockchain is a distributed database secured by cryptography. It is the technology behind Bitcoin.</p>
              <p>This demo will guide you through the blockchain step-by-step. This demo is also covered in this Medium article with freeCodeCamp. For an understanding of cryptocurrency transactions, checkout Coin Demo.</p>
              <p>To jump between steps, hover on the title of this dialog and select a step.</p>
            </div>
          ),
        },
        {
          target: '.navbar-brand',
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true
          },
          content: (
            <div>
              <h2>What's New </h2>
              <ul>
                <li>15+ New Topics & Explanations</li>
                <li>Revamped Interface</li>
                <li>Source Code</li>
              </ul>
            </div>
          ),
        },
        {
          target: '.second',
          content: (
            <div>
              <h2>Blockchain</h2>
              <p>A blockchain has a list of blocks.</p>
              <p>It starts with a single block, called the genesis block.</p>
            </div>
          ),
          floaterProps: {
            disableAnimation: true,
          },
          disableBeacon: true,
          placement: 'top',
        },
        {
          target: '.third',
          content: (
            <div>
              <h2>Block</h2>
              <p>Each block stores the following information:</p>
            </div>
          ),
          floaterProps: {
            disableAnimation: true,
          },
          disableBeacon: true,
          placement: 'top',
        },
        {
          target: '.genesis',
          content: (
            <div>
              <h2>Index</h2>
              <p>The index is the position of the block in the chain.</p>
              <p>The genesis block has an index of 0. The next block will have an index of 1.</p>
            </div>
          ),
          floaterProps: {
            disableAnimation: true,
          },
          disableBeacon: true,
          styles: {
            options: {
              zIndex: 10000,
            },
          },
        },
        {
          target: '.timestamp',
          content: (
            <div>
              <h2>Timestamp</h2>
              <p>A record of when the block was created.</p>
              <p>The timestamp helps to keep the blockchain in order.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
        },
        {
          target: '.hash-input',
          content: (
            <div>
              <h2>Hash</h2>
              <p>A hash looks like a bunch of random numbers and letters.</p>
              <p>It is a alphanumeric value that uniquely identifies data, or the "digital fingerprint" of data.</p>

              <h3>Properties of a hash:</h3>
              <ul>
                <li>Hash has a fixed length.</li>
                <li>Same data always maps to same hash.</li>
                <li>Different data always maps to a different hash (within practical limitations).</li>
                <li>Is easy to compute.</li>
                <li>Is infeasible to convert hash to data.</li>
                <li>A small change in data leads to a large change in hash.</li>
              </ul>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.hash-input',
          content: (
            <div>
              <h2>Valid Hash</h2>
              <p>A valid hash for a blockchain is a hash that meets a certain requirement. For this blockchain, having three zeros at the beginning of the hash is the requirement for a valid hash.</p>
              <p>The number of leading zeros required is the difficulty.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.hash-input',
          content: (
            <div>
              <h2>Block Hash Calculation</h2>
              <p>A hashing function takes data as input, and returns a unique hash</p>
              <p>f ( data ) = hash</p>
              <p>Since the hash is a "digital fingerprint" of the entire block, the data is the combination of index, timestamp, previous hash, block data, and nonce.</p>
              <p>f ( index + previous hash + timestamp + data + nonce ) = hash</p>
              <p>Replace the values for our genesis block, we get:</p>
              <p>f ( 0 + "0" + 1508270000000 + "Welcome to Blockchain Demo 2.0!" + 604 ) = <br/> 000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.previous-hash-information',
          content: (
            <div>
              <h2>Previous Hash</h2>
              <p>The previous hash is the hash of the previous block</p>
              <p>The genesis block's previous hash is "0" because there is no previous block.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.data-block',
          content: (
            <div>
              <h2>Data</h2>
              <p>Each block can store data against it.</p>
              <p>In cryptocurrencies such as Bitcoin, the data would include money transactions.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.nonce-block',
          content: (
            <div>
              <h2>Nonce</h2>
              <p>The nonce is the number used to find a valid hash.</p>
              <p>To find a valid hash, we need to find a nonce value that will produce a valid hash when used with the rest of the information from that block.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.nonce-block',
          content: (
            <div>
              <h2>Mining A Block</h2>
              <p>The process of determining this nonce is called mining.</p>
              <p>We start with a nonce of 0 and keep incrementing it by 1 until we find a valid hash.</p>
              <img src={require("../assets/images/nonce.gif")} alt="" />
              <p>As difficulty increases, the number of possible valid hashes decreases. With fewer possible valid hashes, it takes more processing power to find a valid hash.</p>
              <p>If the hash on the block is invalid, click on the tool button to mine the genesis block!</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.data-block',
          content: (
            <div>
              <h2>Data Mutation</h2>
              <p>Edit the "Welcome to Eleven01" input!</p>
              <p>Since data is an input variable for the hash, changing the data will change the hash.</p>
              <p>The new hash will not have three leading zeros, and therefore becomes invalid.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.data-block',
          content: (
            <div>
              <h2>Mutation Effect</h2>
              <p>Subsequent blocks will also be invalid.</p>
              <p>A hash change will cause a mutation in the previous hash of subsequent blocks. Since previous hash is used to calculate the hash, subsequent hashes will also change.</p>
              <p>This will lead to a cascading invalidation of blocks.</p>
              <p>Try it yourself:</p>
              <p>Add 3 blocks, then mutate the genesis block input.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.add-block',
          content: (
            <div>
              <h2>Adding A New Block</h2>
              <p>To mine another block to the blockchain, fill out the data input and click the button.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
        {
          target: '.add-block',
          content: (
            <div>
              <h2>Adding Valid Block</h2>
              <p>When adding a new block to the blockchain, the new block needs to meet these requirements.</p>
              <p>Block index one greater than latest block index.</p>
              <p>Block previous hash equal to latest block hash.</p>
              <p>Block hash meets difficulty requirement.</p>
              <p>Block hash is correctly calculated.</p>
              <p>Other peers on the network will be adding blocks to the blockchain, so new blocks need to be validated.</p>
            </div>
          ),
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
          placement: 'top',
        },
      ]
    }
  }
  
  getHelpers = (helpers: StoreHelpers) => {
    this.helpers = helpers;
  };

  private handleClickStart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    this.setState({
      run: true,
    });
  };

  private handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (data.action === 'close' && data.type === 'step:after') {
      if (finishedStatuses.includes(status)) {
        this.setState({ run: false });
      } else {
        this.setState({ run: false, endTour: false });
      }
    } 

    if (data.type === "tour:end") {
      this.setState({
        endTour: true,
        run: false
      })
    }

    // tslint:disable:no-console
    console.groupCollapsed(type);
    console.log(data, 'data');
    console.groupEnd();
    // tslint:enable:no-console
  };

  render() {
    const { run, steps } = this.state;
    return (
      <header>
        <Joyride
          callback={this.handleJoyrideCallback}
          continuous={true}
          getHelpers={this.getHelpers}
          run={run}
          scrollToFirstStep={false}
          showProgress={true}
          showSkipButton={true}
          steps={steps}
          styles={{
            options: {
              arrowColor: "#fff",
              backgroundColor: "#fff",
              overlayColor: "rgba(0, 0, 0, 0.4)",
              primaryColor: "mediumaquamarine",
              textColor: "#333",
              // width: 500,
              zIndex: 10000
            }
          }}
        />
        <div className="col-sm-12 text-right py-3">
          <Link to='' onClick={this.handleClickStart} title="Demo" className="btn btn-primary our-button demo-button open-popup">
            <i className="fa fa-monitor fa-desktop mr-1"></i>
            {
              this.state.endTour === true ?
                'Start Demo'
                :
                'Continue Demo'
            }
          </Link>
        </div>
        <div className="text-center">
          <Link to="" className="navbar-brand" href="#"><img src={require("../assets/images/eleven01.png")} alt=''/></Link>
        </div>
      </header>
    )
  }
}


export default Header