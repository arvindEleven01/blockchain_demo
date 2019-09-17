import React, {Fragment} from 'react'

class Circles extends React.Component {

  render() {
    return (
      <Fragment>
        <div id="sanmain1" className="wheel-2">
          <img src={require("../assets/images/circle-1.png")} alt="" className="main_image rotate" id="image1" />
          <img src={require("../assets/images/circle-2.png")} alt="" className="overlay_image rotatew" id="image2" />
          <img src={require("../assets/images/circle-3.png")} alt="" className="overlay_image1 rotate" id="image3" />
          <img src={require("../assets/images/circle-4.png")} alt="" className="overlay_image2 rotatew" id="image4" />
          <img src={require("../assets/images/circle-5.png")} alt="" className="overlay_image3" />
        </div>
        <div id="sanmain4" className="wheel-3">
          <img src={require("../assets/images/circle-101.png")} alt="" className="main_image rotate" id="image10" />
          <img src={require("../assets/images/circle-102.png")} alt="" className="overlay_image rotatew" id="image11" />
          <img src={require("../assets/images/circle-103.png")} alt="" className="overlay_image1 rotate" id="image12" />
          <img src={require("../assets/images/circle-104.png")} alt="" className="overlay_image2 rotatew" id="image13" />
          <img src={require("../assets/images/circle-105.png")} alt="" className="overlay_image3" />
        </div>
      </Fragment>
    )
  }
}

export default Circles