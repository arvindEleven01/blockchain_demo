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
          spotlightPadding: 20,
          content: (
            <div>
              <p>A blockchain is a distributed database secured by cryptography. It is the technology behind Bitcoin.</p>

              <p>This demo will guide you through the blockchain step-by-step. This demo is also covered in this Medium article with freeCodeCamp. For an understanding of cryptocurrency transactions, checkout Coin Demo.</p>

              <p>To jump between steps, hover on the title of this dialog and select a step.</p>
            </div>
          ),
        },
        {
          target: '.second',
          content: 'This is my second Step',
          floaterProps: {
            disableAnimation: true,
          },
          disableBeacon: true,
        },
        {
          target: '.genesis',
          content: 'This is my third Step',
          floaterProps: {
            disableAnimation: true,
          },
          disableBeacon: true,
        },
        {
          target: '.timestamp',
          content: 'This is my fourth Step',
          disableBeacon: true,
          floaterProps: {
            disableAnimation: true,
          },
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
              width: 500,
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