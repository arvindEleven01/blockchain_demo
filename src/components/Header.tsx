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
              <p>A Blockchain Technology is a distibuted database secured by cryptography. It is the technology behind Eleven01.</p>
              <p>Eleven01 is one of the fastest, highly scalable blockchain protocol which aims to make blockchain technologies ready for real world use.</p>
              <p>This Interactive demo will guide you through step by step procedure on Eleven01 Blockchain protocol.</p>
              <p>After completion of this demo, you will be able to create several blocks on Eleven01.</p>
            </div>
          ),
        },
        {
          target: '.second',
          content: (
            <div>
              <h2>Blockchain</h2>
              <p>A blockchain has list of blocks.</p>
              <p>Eleven01 Blockchain starts with a single block called Genesis Block.</p>
              <p>Genesis Block is the foundation on which additional blocks are sequentially added to form a chain of blocks. This block is also referred as Block Zero.</p>
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
              <ul>
                <li><i className="fa fa-tag"></i>Index</li>
                <li><i className="fa fa-calendar-alt"></i>Timestamp</li>
                <li><i className="fa fa-barcode"></i>Hash</li>
                <li><i className="fa fa-step-backward"></i>Previous Hash</li>
                <li><i className="fa fa-file-alt"></i>Data</li>
                <li><i className="fa fa-file-alt"></i>Nonce</li>
              </ul>
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
              <h2>Block Height Number</h2>
              <p>This index represents the position of the block in the chain. This number is known as Block Height Number. Block height number is always a positive integer greater than zero.</p>
              <p>The genesis block is also referred to as block zero. The second block to be added on top of block zero would then be referred to as block number 1.</p>
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
              <p>A record when the block was created. It mainly helps to maintain the ordering of the blockchain.</p>
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
                <li>- Hash has a fixed length.</li>
                <li><i className="fa fa-barcode"></i>Same data always maps to same hash.</li>
                <li><i className="fa fa-qrcode"></i>Different data always maps to a different hash (within practical limitations).</li>
                <li><i className="fa fa-qrcode"></i>Is easy to compute.</li>
                <li><i className="fa fa-lock"></i>Is infeasible to convert hash to data.</li>
                <li><i className="fa fa-arrow-up"></i>A small change in data leads to a large change in hash.</li>
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
              <p>Hash is considered as a digital fingerprint of entire block.</p>
              <p>Having three leading zeros at the beginnning of the hash is considered as a Valid Hash for Eleven01 Blockchain Protocol.</p>
              <p>The requirement of the number of leading zeros is called as difficulty of the block. Each blockchain has its own difficulty value</p>
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
              <p>Hashing function takes an input string of any length and produces an unique output of fixed length resulting in an unique hash.</p>
              <p>Hashing function f (data) = hash</p>
              <p>Data in the hashing function is combination of index, timestamp, previous hash, block data and nonce.</p>
              <p>f (index + previous hash + timestamp + data + nonce) = hash</p>
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
              <p>Previous Hash is also know as Parent Hash.</p>
              <p>The previous hash is the hash of the previous block. Without this component, there will be no connection and chronology between each block.</p>
              <p>As Genesis Block is the first block in Eleven01 blockchain, the previous hash is "0".</p>
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
              <p>Data includes series of transactions which also includes money transactions.</p>
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
              <p>Nonce, also referred as "Number only used once" is the number used to find valid hash.</p>
              <p>This number is added to the hashed block in the blockchain, which when rehashed meets the difficulty level of leading three zeros for valid hash.</p>
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
              <p>Lets try to edit the Data input here.</p>
              <p>When you change the data, hash gets automatically changed to invalid hash (With no leading three zeros).</p>
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
              <p>As new hash is generated, all the subsequent blocks becomes invalid.</p>
              <p>Hash Change will cause a mutation in the previous hash of all the subsequent blocks, since previous hash is used to generate each block hash.</p>
              <p>Hence, this leads to a cascading invalidation of blocks.</p>
              <p>Lets try to demonstrate by ourself by adding two blocks and then try to change the Genesis Data.</p>
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
              <p>To add new block to Eleven01 blockchain, click on the Add New Block Button and then fill the data input of the block.</p>
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
              <p>When adding a new block to Eleven01 Blockchain, the new block needs to meet these requirements:</p>
              <ul>
                <li>1. Block Height Number must be greater than the last Block Height number</li>
                <li>2. Previous Hash is same as the latest block hash</li>
                <li>3. Block Hash should meet difficulty (three leading zeros) requirement</li>
                <li>4. Hash calculated using Nonce should be valid</li>
              </ul>
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