import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import Circles from './Circles'

class Layout extends React.Component {

  render() {
    return (
      <Fragment>
        <Circles />
        <Header />
        {this.props.children}
        <Footer />
      </Fragment>
    )
  }
}

export default Layout