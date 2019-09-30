import React from 'react'
import Tour from 'reactour'
import { Link } from "react-router-dom";

class Header extends React.Component {

  state = {
    isTourOpen: false
  }

  closeTour = () => {
    this.setState({
      isTourOpen: false
    })
  }

  tourStart = () => {
    this.setState({ isTourOpen: true })
  }

  // componentDidMount() {
  //   this.setState({ isTourOpen: true })
  // }

  render() {
    return (
      <header>
        <Tour
          steps={steps}
          isOpen={this.state.isTourOpen}
          onRequestClose={this.closeTour}
        />
        <div className="col-sm-12 text-right py-3">
          <Link to='' onClick={this.tourStart} title="Demo" className="btn btn-primary our-button demo-button open-popup">
            <i className="fa fa-monitor fa-desktop mr-1"></i> Demo
          </Link>
        </div>
        <div className="text-center">
          <Link to="" className="navbar-brand" href="#"><img src={require("../assets/images/eleven01.png")} alt=''/></Link>
        </div>
      </header>
    )
  }
}

const steps = [  
  {
    selector: '.navbar-brand',
    content: () => (
      <div>
        <p>A blockchain is a distributed database secured by cryptography. It is the technology behind Bitcoin.</p>

        <p>This demo will guide you through the blockchain step-by-step. This demo is also covered in this Medium article with freeCodeCamp. For an understanding of cryptocurrency transactions, checkout Coin Demo.</p>

        <p>To jump between steps, hover on the title of this dialog and select a step.</p>
      </div>
    ),
    position: 'bottom',
    stepInteraction: false
  },
  {
    selector: '.second',
    content: 'This is my second Step',
  },
  {
    selector: '.genesis',
    content: 'This is my third Step',
  },
  {
    selector: '.timestamp',
    content: 'This is my fourth Step',
  } 
]

export default Header