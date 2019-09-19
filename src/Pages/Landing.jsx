import React from 'react'
import Layout from '../components/Layout'
import crypto from 'crypto';
import * as moment from 'moment';
import Slider from "react-slick";

class Landing extends React.Component {

  state = {
    dummy: 0,
    blocksCount: 0,
    itterationValue: 0,
    keyword: '',
    previous_keyword: '',
    previous_hash_block: '',
    blocks: [{
      keyword: 'Welcome to Eleven01',
      previous_hash: 0,
      hash: '0007caa0eea68563ccdfb0a032cc03ea729bdb62e5e57758b5f7731dee2bf5fcb38',
      timestamp: 'Mon, Sep 16, 2019 12:15 PM',
      nonce: '6521',
      keywordChanged: false,
      previous_hashChanged: false
    }],
    cache: {
      keyword: 'Welcome to Eleven01',
      previous_hash: 0,
      hash: '0007caa0eea68563ccdfb0a032cc03ea729bdb62e5e57758b5f7731dee2bf5fcb38',
      timestamp: 'Mon, Sep 16, 2019 12:15 PM',
      nonce: '6521',
      keywordChanged: false,
      previous_hashChanged: false
    }
  }

  newBlock = async () => {
    const previousBlock = [...this.state.blocks]
    previousBlock[this.state.blocks.length - 1].keyword = this.state.cache.keyword
    previousBlock[this.state.blocks.length - 1].previous_hash = this.state.cache.previous_hash
    previousBlock[this.state.blocks.length - 1].hash = this.state.cache.hash
    previousBlock[this.state.blocks.length - 1].timestamp = this.state.cache.timestamp
    previousBlock[this.state.blocks.length - 1].nonce = this.state.cache.nonce
    previousBlock[this.state.blocks.length - 1].keywordChanged = false
    previousBlock[this.state.blocks.length - 1].previous_hashChanged = false

    await this.setState({
      blocks: previousBlock
    })
    
    var min = 3;
    var max = 5;
    const a = Math.floor(Math.random() * (+max - +min)) + +min; 
    var nonce = Math.floor(100000 + Math.random() * 900000)
    nonce = nonce.toString().substring(0, a);
    const timestamp = moment().format('llll');
    const pre_hash = this.state.blocks.length

    const hash = crypto.createHash('sha256')
      .update((pre_hash-1) + this.state.blocks[pre_hash - 1].hash + timestamp + this.state.keyword + this.state.blocks[pre_hash - 1].nonce)
      .digest('hex');

    let block = {
      keyword: this.state.keyword,
      previous_hash: this.state.cache.hash,
      hash: '000'+ hash,
      timestamp: timestamp,
      nonce: nonce,
      keywordChanged: false,
      previous_hashChanged: false
    }

    await this.setState({
      blocks: [...this.state.blocks, block],
      cache: {
        keyword: this.state.keyword,
        previous_hash: this.state.cache.hash,
        hash: '000' + hash,
        timestamp: timestamp,
        nonce: nonce,
        keywordChanged: false,
        previous_hashChanged: false
      },
      keyword: 'Welcome to Eleven01'
    })
  }

  activeRecord = (int) => {
    this.setState({ itterationValue: int})
  }

  handleChange = async (event) => {
    const block = [...this.state.blocks]

    if (event.target.value === this.state.cache.keyword) {
      block[this.state.blocks.length - 1].keyword = this.state.cache.keyword
      block[this.state.blocks.length - 1].hash = this.state.cache.hash
      block[this.state.blocks.length - 1].keywordChanged = false
      this.setState({
        blocks: block,
        keyword: this.state.cache.keyword
      })
    } else {
      const timestamp = moment().format('llll');
      block[this.state.blocks.length - 1].keyword = event.target.value
      block[this.state.blocks.length - 1].keywordChanged = true
      const hash = crypto.createHash('sha256')
        .update(block[this.state.blocks.length - 1] + block[this.state.blocks.length - 1].hash + timestamp + event.target.value + block[this.state.blocks.length - 1].nonce)
        .digest('hex');
      block[this.state.blocks.length - 1].hash = hash
      this.setState({
        blocks: block,
        keyword: event.target.value
      }) 
    }

  }

  updateHash = (event) => {
    const length = this.state.blocks.length
    const timestamp = moment().format('llll');

    for (let i = this.state.itterationValue; i < length; i++){
      const block = [...this.state.blocks]

      if (event.target.value === this.state.previous_keyword) {

        block[this.state.itterationValue].keyword = this.state.previous_keyword
        block[this.state.itterationValue].hash = this.state.previous_hash_block

        block[i].previous_hash = block[i - 1].hash
        block[i].keywordChanged = false
        if (i + 1 !== length) {
          block[i + 1].previous_hashChanged = false
        }

        this.setState({
          blocks: block
        })  
        
      } else {
        
        block[this.state.itterationValue].keyword = event.target.value
        const hash = crypto.createHash('sha256')
          .update(block[this.state.itterationValue] + block[this.state.itterationValue].hash + timestamp + event.target.value + block[this.state.itterationValue].nonce)
          .digest('hex');
        block[this.state.itterationValue].hash = hash
        block[i].previous_hash = block[i - 1].hash

        // let hash2 = crypto.createHmac('sha256', block[i].hash)
        //   .update('I love cupcakes')
        //   .digest('hex');
        
        const hash2 = crypto.createHash('sha256')
          .update(block[this.state.itterationValue] + block[i].hash + block[i].timestamp + block[i].hash + block[i].nonce)
          .digest('hex');

        block[i].keywordChanged = true
        if (i + 1 !== length) {
          block[i + 1].hash = hash2
          block[i + 1].previous_hashChanged = true
        }

        this.setState({
          blocks: block
        })
      }
    }
  }

  setItteration = async (index) => {
    await this.setState({
      itterationValue: index
    })
    await this.setState({
      previous_keyword: this.state.blocks[this.state.itterationValue].keyword,
      previous_hash_block: this.state.blocks[this.state.itterationValue].hash
    })
  }

  mine = async () => {
    const block = [...this.state.blocks]
    var min = 3;
    var max = 5;
    const a = Math.floor(Math.random() * (+max - +min)) + +min;
    var nonce = Math.floor(100000 + Math.random() * 900000)
    nonce = nonce.toString().substring(0, a);
    const timestamp = moment().format('llll');
    const pre_hash = this.state.blocks.length

    const hash = crypto.createHash('sha256')
      .update((pre_hash-1) + this.state.blocks[pre_hash - 1].hash + timestamp + this.state.keyword + this.state.blocks[pre_hash - 1].nonce)
      .digest('hex');


    block[pre_hash - 1].keyword= this.state.keyword
    block[pre_hash - 1].previous_hash = this.state.blocks[pre_hash - 1].previous_hash
    block[pre_hash - 1].hash= '000' + hash
    block[pre_hash - 1].timestamp= timestamp
    block[pre_hash - 1].nonce= nonce
    block[pre_hash - 1].keywordChanged= false
    block[pre_hash - 1].previous_hashChanged = false
    
    const cache_block = {
      keyword: this.state.keyword,
      previous_hash: this.state.blocks[pre_hash - 1].previous_hash,
      hash: '000' + hash,
      timestamp: timestamp,
      nonce: nonce,
      keywordChanged: false,
      previous_hashChanged: false
    }
    
    await this.setState({
      block: block,
      cache: cache_block,
      keyword: ''
    })
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    };

    let blocks = this.state.blocks.map((block, i) => {
      return (
        // <div className="col-xs-3 col-sm-3 col-md-2 block-item" key={i} onClick={() => this.activeRecord(i)} >
        <div className={
          i === 0 ?
            "col-xs-3 col-sm-3 col-md-2 block-item no-chain "
            :
            "col-xs-3 col-sm-3 col-md-2 block-item"
        } key={i} data-toggle="modal"
          onClick={() => this.setItteration(i)} data-target={"#myModal-" + this.state.itterationValue}>
          
          <div className="myblock">
          <img src={require("../assets/images/block-3d-1.png")} alt="" />
            <div className="overlay2"><i className="fa fa-info"></i></div>
          </div>
          {
            i === 0 ?
              <h6>GENESIS BLOCK </h6>
            :
              <h6>BLOCK #{i}</h6>
          }
        </div>
      )
    })
    
    return (
      <Layout>
        <section className="main-content d-flex align-items-center justify-content-center create-block">
          <div className="container">
            <div className="col-sm-12 col-md-12 p-0 mx-auto ">
              <div className="col-md-12 col-lg-7 second mx-auto text-center border  px-0   box-1 effect5 py-5">
                <div className="px-4">
                  <div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary button-left-border-radius px-3" type="button" id="button-addon1">DATA</button>
                        <button className="btn btn-outline-secondary " type="button" id="button-addon1"><i className="fa fa-file"></i></button>
                      </div>
                      <input type="text" className="form-control button-right-border-radius" placeholder=""
                        aria-label="Example text with button addon" aria-describedby="button-addon1"
                        name="keyword" onChange={this.handleChange} value={this.state.blocks[this.state.blocks.length-1].keyword}
                      />
                    </div>
                    <div className="input-group mb-3 previous-hash-information">
                      PREVIOUS HASH: &nbsp;
                        <span id="previous-hash" className={
                        this.state.blocks[this.state.blocks.length - 1].previous_hashChanged ?
                          'add-error-color'
                          :
                          ''
                      }>
                        {this.state.blocks[this.state.blocks.length - 1].previous_hash}
                      </span>
                    </div>
                    <div className="input-group mb-3 hash-input">
                      <div className="input-group-prepend ">
                        <button
                          className={
                            this.state.blocks[this.state.blocks.length - 1].keywordChanged ?
                              "btn btn-outline-secondary button-left-border-radius px-3 add-red"
                              :
                              "btn btn-outline-secondary button-left-border-radius px-3"
                          }
                          id="button-addon1">HASH</button>
                      </div>
                      <input type="text" disabled
                        className={
                          this.state.blocks[this.state.blocks.length - 1].keywordChanged ?
                            "form-control button-right-border-radius add-red"
                            :
                            "form-control button-right-border-radius"
                        }
                        placeholder="" aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        value={this.state.blocks[this.state.blocks.length - 1].hash}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-9 text-left">
                        <h4 className="mb-0 line-height genesis">
                          {
                            this.state.blocks.length === 1 ?
                            'GENESIS BLOCK'
                            :
                            'BLOCK #' + (this.state.blocks.length-1)
                          }
                        <span className="block-date-information timestamp">
                            &nbsp;on {this.state.blocks[this.state.blocks.length - 1].timestamp}
                          </span>
                        </h4>
                      </div>
                      {
                        this.state.blocks[this.state.blocks.length - 1].keywordChanged ?
                          <div className="col-md-2">
                            <div className="block-view-content-two">
                              <a href="#" onClick={this.mine}>
                                <i className="fa fa-link"></i>
                              </a>
                            </div>
                          </div>
                          :
                          <div className="col-md-3">
                            <div className="block-view-content">
                              {this.state.blocks[this.state.blocks.length - 1].nonce}
                            </div>
                          </div>
                      }
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <a className="btn btn-default our-button circle-button" href="#" onClick={this.newBlock} title="">
                          <i className="fa fa-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 mx-auto ">
              <h4 className="text-center add-new-block-title" >Add New Block</h4>
            </div>

            <div className="p-5">
              <div id="demo" className="carousel slide container no-scroll" data-ride="carousel" data-interval="false" data-wrap="false">
                <div className="container carousel-inner no-padding ">
                  <div className="carousel-item active">
                    <Slider {...settings}>
                      {blocks}
                    </Slider>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#demo" data-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" href="#demo" data-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="modal fade modal-new-1 mx-2" id={"myModal-" + this.state.itterationValue}>
          <div className="modal-dialog " role="document">
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"> × </button>
              <div className="modal-body p-0">
                <div className="col-md-12 col-lg-12 mx-auto text-center border  px-0  m-0  box-1 effect5 py-5">
                  <div className="px-4">
                    <div>
                      <div className="input-group ">
                        <div className="input-group-prepend">
                          <button className="btn btn-outline-secondary button-left-border-radius px-3" type="button"
                            id="button-addon1">DATA</button>
                          <button className="btn btn-outline-secondary " type="button" id="button-addon1">
                            <i className="fa fa-file"></i>
                          </button>
                        </div>
                        <input type="text" className="form-control button-right-border-radius" placeholder=""
                          aria-label="Example text with button addon" aria-describedby="button-addon1"
                          name="keyword" onChange={this.updateHash}
                          value={this.state.blocks[this.state.itterationValue].keyword}
                        />
                      </div>
                      <div className="input-group my-3 previous-hash-information">
                        PREVIOUS HASH: &nbsp;
                        <span id="previous-hash" className={
                          this.state.blocks[this.state.itterationValue].previous_hashChanged ?
                            'add-error-color'
                            :
                            ''
                        }>
                          {this.state.blocks[this.state.itterationValue].previous_hash}
                        </span>
                      </div>
                      <div className="input-group mb-3 hash-input">
                        <div className="input-group-prepend ">
                          <button
                            className={
                              this.state.blocks[this.state.itterationValue].keywordChanged ?
                                "btn btn-outline-secondary button-left-border-radius px-3 add-red"
                                : 
                                "btn btn-outline-secondary button-left-border-radius px-3"
                              }
                            id="button-addon1">HASH</button>
                        </div>
                        <input type="text" disabled
                          className={
                            this.state.blocks[this.state.itterationValue].keywordChanged ?
                              "form-control button-right-border-radius add-red"
                              :
                              "form-control button-right-border-radius"
                            }
                          placeholder="" aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          value={this.state.blocks[this.state.itterationValue].hash}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-9 text-left">
                          <h4 className="mb-0 line-height genesis">
                            {
                              this.state.itterationValue === 0 ?
                                'GENESIS BLOCK'
                                :
                                'BLOCK #' + this.state.itterationValue
                            }
                            <span className="block-date-information timestamp">
                             &nbsp;on {this.state.blocks[this.state.itterationValue].timestamp}
                            </span>
                          </h4>
                         
                        </div>
                          {
                            this.state.blocks[this.state.itterationValue].keywordChanged ? 
                              <div className="col-md-2">
                                <div className="block-view-content-two">
                                <a href="#" onClick={this.mine}>
                                  <i className="fa fa-link"></i>
                                </a> 
                                </div>
                              </div>
                            :
                              <div className="col-md-3">
                                <div className="block-view-content">
                                  {this.state.blocks[this.state.itterationValue].nonce}
                                </div>
                              </div>
                          }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Landing