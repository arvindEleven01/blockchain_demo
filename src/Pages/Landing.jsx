import React, { Fragment } from 'react'
import Layout from '../components/Layout'
import crypto from 'crypto';
import * as moment from 'moment';
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import $ from 'jquery';
import ReactTooltip from 'react-tooltip'

class Landing extends React.Component {

  state = {
    blockNumberMined: '',
    blocksCount: 0,
    itterationValue: 0,
    keyword: '',
    previous_keyword: '',
    blocks: [{
      keyword: 'Welcome to Eleven01',
      previous_hash: 0,
      hash: '0007caa0eea68563ccdfb0a032cc03ea729bdb62e5e57758b5f7731dee2bf5fcb38',
      timestamp: 'Mon, Sep 16, 2019 12:15 PM',
      nonce: '6521',
      keywordChanged: false,
      previous_hashChanged: false,
      newBlockOnError: false
    }],
    cache: {
      keyword: 'Welcome to Eleven01',
      previous_hash: 0,
      hash: '0007caa0eea68563ccdfb0a032cc03ea729bdb62e5e57758b5f7731dee2bf5fcb38',
      timestamp: 'Mon, Sep 16, 2019 12:15 PM',
      nonce: '6521',
      keywordChanged: false,
      previous_hashChanged: false,
      newBlockOnError: false
    },
    cache_blocks: [{
      keyword: 'Welcome to Eleven01',
      previous_hash: 0,
      hash: '0007caa0eea68563ccdfb0a032cc03ea729bdb62e5e57758b5f7731dee2bf5fcb38',
      timestamp: 'Mon, Sep 16, 2019 12:15 PM',
      nonce: '6521',
      keywordChanged: false,
      previous_hashChanged: false,
      newBlockOnError: false
    }],
    slideIndex: 0,
    updateCount: 0
  }

  newBlock = async () => {
    var min = 3;
    var max = 5;
    const a = Math.floor(Math.random() * (+max - +min)) + +min;
    var nonce = Math.floor(100000 + Math.random() * 900000)
    nonce = nonce.toString().substring(0, a);
    const timestamp = moment().format('llll');
    const pre_hash = this.state.blocks.length

    if (this.state.blockNumberMined === '') {
      
      const pre_hash = this.state.blocks.length

      const hash = crypto.createHash('sha256')
        .update((pre_hash - 1) + this.state.blocks[pre_hash - 1].previous_hash + timestamp + this.state.keyword + this.state.blocks[pre_hash - 1].nonce)
        .digest('hex');
      
      let keywordChanged
      let previous_hashChanged

      if (this.state.blocks[pre_hash - 1].keywordChanged === true) {
        keywordChanged = false
        previous_hashChanged = true
      } else {
        keywordChanged = false
        previous_hashChanged = false
      }

      let block = {
        keyword: '',
        previous_hash: this.state.blocks[pre_hash - 1].hash,
        hash: '000' + hash,
        timestamp: timestamp,
        nonce: nonce,
        keywordChanged: keywordChanged,
        previous_hashChanged: previous_hashChanged
      }

      if (this.state.blocks[pre_hash - 1].keywordChanged === true || this.state.blocks[pre_hash - 1].previous_hashChanged === true) {
        block.newBlockOnError = true
      } else {
        block.newBlockOnError = false
      }

      await this.setState({
        cache_blocks: [...this.state.cache_blocks, block]
      })

      await this.setState({
        blocks: [...this.state.blocks, block],
        cache: {
          keyword: '',
          previous_hash: this.state.blocks[pre_hash - 1].hash,
          hash: '000' + hash,
          timestamp: timestamp,
          nonce: nonce,
          keywordChanged: keywordChanged,
          previous_hashChanged: previous_hashChanged
        },
        keyword: ''
      })
      await this.slider.slickGoTo(this.state.blocks.length)

    } else {

      const hash = crypto.createHash('sha256')
        .update((pre_hash - 1) + this.state.blocks[pre_hash - 1].previous_hash + timestamp + this.state.keyword + this.state.blocks[pre_hash - 1].nonce)
        .digest('hex');
      
      let previous_hashChanged
      if (this.state.blocks[this.state.blocks.length - 1].keywordChanged === true) {
        previous_hashChanged = true
      } else {
        previous_hashChanged = false
      }

      let block = {
        keyword: '',
        previous_hash: this.state.blocks[this.state.blocks.length - 1].hash,
        hash: '000' + hash,
        timestamp: timestamp,
        nonce: nonce,
        keywordChanged: false,
        previous_hashChanged: previous_hashChanged
      }

      await this.setState({
        cache_blocks: [...this.state.cache_blocks, block]
      })

      await this.setState({
        blocks: [...this.state.blocks, block],
        cache: {
          keyword: '',
          previous_hash: this.state.blocks[this.state.blocks.length-1].hash,
          hash: '000' + hash,
          timestamp: timestamp,
          nonce: nonce,
          keywordChanged: false,
          previous_hashChanged: previous_hashChanged
        },
        keyword: '',
        blockNumberMined: ''
      })
    }
  }

  activeRecord = (int) => {
    this.setState({ itterationValue: int})
  }

  handleChange = async (event) => {
    const block = JSON.parse(JSON.stringify(this.state.blocks))

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
        .update(block[this.state.blocks.length - 1] + block[this.state.blocks.length - 1].previous_hash + timestamp + event.target.value + block[this.state.blocks.length - 1].nonce)
        .digest('hex');
      block[this.state.blocks.length - 1].hash = hash
      this.setState({
        blocks: block,
        keyword: event.target.value
      }) 
    }
  }

  mine = async () => {
    const block = [...this.state.blocks]
    const cache_block = [...this.state.cache_blocks]
    var min = 3;
    var max = 5;
    const a = Math.floor(Math.random() * (+max - +min)) + +min;
    var nonce = Math.floor(100000 + Math.random() * 900000)
    nonce = nonce.toString().substring(0, a);
    const timestamp = moment().format('llll');
    const pre_hash = this.state.blocks.length

    const hash = crypto.createHash('sha256')
      .update((pre_hash - 1) + this.state.blocks[pre_hash - 1].previous_hash + timestamp + this.state.keyword + this.state.blocks[pre_hash - 1].nonce)
      .digest('hex');

    if (block[pre_hash - 1].keyword === 'Welcome to Eleven01') {
      block[pre_hash - 1].keyword = this.state.keyword
    } else {
      block[pre_hash - 1].keyword = block[pre_hash - 1].keyword
    }
    block[pre_hash - 1].previous_hash = this.state.blocks[pre_hash - 1].previous_hash
    block[pre_hash - 1].hash = '000' + hash
    block[pre_hash - 1].timestamp = timestamp
    block[pre_hash - 1].nonce = nonce

    let keywordChanged = false
    let previous_hashChanged
    if (pre_hash - 1 !== 0) {
      if (block[pre_hash - 2].keywordChanged === true) {
        previous_hashChanged = true
      } else {
        previous_hashChanged = false
      }
    }
    else {
      previous_hashChanged = false
    }
    

    block[pre_hash - 1].keywordChanged = keywordChanged
    block[pre_hash - 1].previous_hashChanged = previous_hashChanged
    block[pre_hash - 1].newBlockOnError = false
    
    const cache = {
      keyword: block[pre_hash - 1].keyword,
      previous_hash: this.state.blocks[pre_hash - 1].previous_hash,
      hash: '000' + hash,
      timestamp: timestamp,
      nonce: nonce,
      keywordChanged: keywordChanged,
      previous_hashChanged: previous_hashChanged,
      newBlockOnError: false
    }

    cache_block[pre_hash - 1].keyword = block[pre_hash - 1].keyword
    cache_block[pre_hash - 1].previous_hash = this.state.blocks[pre_hash - 1].previous_hash
    cache_block[pre_hash - 1].hash = '000' + hash
    cache_block[pre_hash - 1].timestamp = timestamp
    cache_block[pre_hash - 1].nonce = nonce
    cache_block[pre_hash - 1].keywordChanged = keywordChanged
    cache_block[pre_hash - 1].previous_hashChanged = previous_hashChanged
    cache_block[pre_hash - 1].newBlockOnError = false

    await this.setState({
      block: block,
      cache: cache,
      cache_blocks: cache_block,
      keyword: ''
    })
  }

  setItteration = async (index) => {
    await this.setState({
      itterationValue: index
    })
    await this.setState({
      previous_keyword: this.state.cache_blocks[this.state.itterationValue].keyword
    })
  }

  updateHash = async (event) => { 
    console.log(this.state.blocks)
    const length = this.state.blocks.length
    const timestamp = moment().format('llll');
    if (event.target.value === this.state.previous_keyword) {
      const block = JSON.parse(JSON.stringify(this.state.blocks))
      const cache_blocks = JSON.parse(JSON.stringify(this.state.cache_blocks))
      for (let i = this.state.itterationValue; i < length; i++) {
        if (i === this.state.itterationValue) {
          if (i === 0) {
            block[i].keyword = cache_blocks[i].keyword
            block[i].hash = cache_blocks[i].hash
            if (i === 0) {
              block[i].previous_hash = 0
            } else {
              block[i].previous_hash = cache_blocks[i - 1].hash
            }
            block[i].timestamp = cache_blocks[i].timestamp
            block[i].nonce = cache_blocks[i].nonce
            block[i].keywordChanged = cache_blocks[i].keywordChanged
            block[i].previous_hashChanged = cache_blocks[i].previous_hashChanged
          } else {
            if (block[i-1].keywordChanged === true) {
              for (let a = i; a < length; a++) {
                block[a].keyword = event.target.value
                const hash2 = crypto.createHash('sha256')
                  .update(a + block[a].previous_hash + block[a].timestamp + block[a].hash + block[a].nonce)
                  .digest('hex');
                block[a].hash = hash2
                if (block[a - 1].keywordChanged === true) {
                  block[a].previous_hashChanged = true
                } else {
                  block[a].previous_hashChanged = false
                }
                block[a].previous_hash = block[a - 1].hash
              }
              break;
            } else {
              block[i].keyword = cache_blocks[i].keyword
              block[i].hash = cache_blocks[i].hash
              if (i === 0) {
                block[i].previous_hash = 0
              } else {
                block[i].previous_hash = cache_blocks[i - 1].hash
              }
              block[i].timestamp = cache_blocks[i].timestamp
              block[i].nonce = cache_blocks[i].nonce
              block[i].keywordChanged = cache_blocks[i].keywordChanged
              block[i].previous_hashChanged = cache_blocks[i].previous_hashChanged
            }
          }
          
          
        } else {
          if (block[i].newBlockOnError === true) {
            const hash2 = crypto.createHash('sha256')
              .update(i + block[i].previous_hash + block[i].timestamp + block[i].hash + block[i].nonce)
              .digest('hex');
            block[i].hash = hash2
            block[i].keywordChanged = true
            if (block[i - 1].keywordChanged === true) {
              block[i].previous_hashChanged = true 
            } else {
              block[i].previous_hashChanged = false 
            }
            block[i].keyword = cache_blocks[i].keyword
            if (i === 0) {
              block[i].previous_hash = 0
            } else {
              block[i].previous_hash = block[i-1].hash
            }
            block[i].timestamp = cache_blocks[i].timestamp
            block[i].nonce = cache_blocks[i].nonce

          } else {
            if (block[i].keyword === cache_blocks[i].keyword) {
              block[i].keyword = cache_blocks[i].keyword
              block[i].hash = cache_blocks[i].hash
              block[i].keywordChanged = false
              block[i].previous_hashChanged = false
              if (i === 0) {
                block[i].previous_hash = 0
              } else {
                block[i].previous_hash = cache_blocks[i - 1].hash
              }
              block[i].timestamp = cache_blocks[i].timestamp
              block[i].nonce = cache_blocks[i].nonce
              // repeat
              console.log(i)
            } 
            else {
              for (let a = i; a < length; a++) {
                const hash2 = crypto.createHash('sha256')
                  .update(a + block[a].previous_hash + block[a].timestamp + block[a].hash + block[a].nonce)
                  .digest('hex');
                block[a].hash = hash2
                if (block[a-1].keywordChanged === true) {
                  block[a].previous_hashChanged = true
                } else {
                  block[a].previous_hashChanged = false
                }
                block[a].previous_hash = block[a - 1].hash
              }
              break;
            }
          }
        }
      }
      await this.setState({
        blocks: block
      })
    } else {
      const block = JSON.parse(JSON.stringify(this.state.blocks))
      const cache_blocks = JSON.parse(JSON.stringify(this.state.cache_blocks))
      for (let i = this.state.itterationValue; i < length; i++) {
        block[this.state.itterationValue].keyword = event.target.value
        const hash = crypto.createHash('sha256')
          .update(block[this.state.itterationValue] + block[this.state.itterationValue].previous_hash + timestamp + event.target.value + block[this.state.itterationValue].nonce)
          .digest('hex');
        block[this.state.itterationValue].hash = hash
        if (i === 0) {
          block[i].previous_hash = 0
        } else {
          block[i].previous_hash = block[i - 1].hash
        }
        block[i].keywordChanged = true
        if (cache_blocks[i].hash === block[i].hash) {
          block[i].previous_hashChanged = false
        }
        if (i + 1 !== length) {
          const hash2 = crypto.createHash('sha256')
            .update(block[i + 1] + block[i + 1].previous_hash + block[i + 1].timestamp + block[i + 1].hash + block[i + 1].nonce)
            .digest('hex');
          block[i + 1].hash = hash2
          block[i + 1].previous_hashChanged = true
        }
      }
      await this.setState({
        blocks: block
      })
    }
  }

  updateMine = async () => {
    const block = JSON.parse(JSON.stringify(this.state.blocks))
    const cache_blocks = JSON.parse(JSON.stringify(this.state.cache_blocks))
    const timestamp = moment().format('llll');

    const length = this.state.blocks.length
    for (let i = this.state.itterationValue; i < length; i++) { 
      var min = 3;
      var max = 5;
      const a = Math.floor(Math.random() * (+max - +min)) + +min;
      var nonce = Math.floor(100000 + Math.random() * 900000)
      nonce = nonce.toString().substring(0, a);

      if (i === this.state.itterationValue) {
        const hash = crypto.createHash('sha256')
          .update(block[this.state.itterationValue] + block[this.state.itterationValue].previous_hash + block[this.state.itterationValue].timestamp + block[this.state.itterationValue].hash + block[this.state.itterationValue].nonce)
          .digest('hex');
        block[this.state.itterationValue].hash = '000' + hash
        cache_blocks[this.state.itterationValue].hash = '000' + hash

        block[this.state.itterationValue].nonce = nonce
        cache_blocks[this.state.itterationValue].nonce = nonce

        block[this.state.itterationValue].timestamp = timestamp
        cache_blocks[this.state.itterationValue].timestamp = timestamp

        if (block[this.state.itterationValue].keywordChanged === true) {
          if (this.state.itterationValue + 1 < this.state.blocks.length) {
            block[this.state.itterationValue + 1].previous_hashChanged = true
            cache_blocks[this.state.itterationValue + 1].previous_hashChanged = true
          }
        }

        block[this.state.itterationValue].keywordChanged = false
        cache_blocks[this.state.itterationValue].keywordChanged = false

        const length = this.state.blocks.length
        if (this.state.itterationValue + 1 !== length) {
          block[this.state.itterationValue + 1].previous_hash = '000' + hash
          cache_blocks[this.state.itterationValue + 1].previous_hash = '000' + hash

          block[this.state.itterationValue + 1].previous_hashChanged = false
          cache_blocks[this.state.itterationValue + 1].previous_hashChanged = false

          block[this.state.itterationValue + 1].newBlockOnError = false
          cache_blocks[this.state.itterationValue + 1].newBlockOnError = false
        }

        let id = this.state.itterationValue
        if (this.state.itterationValue + 1 === length) {
          id = ''
        } else {
          id = this.state.itterationValue
        }
        this.setState({
          blocks: block,
          cache_blocks: cache_blocks,
          blockNumberMined: id
        })
      } else {

        const hash = crypto.createHash('sha256')
          .update(block[i] + block[i].previous_hash + block[i].timestamp + block[i].hash + block[i].nonce)
          .digest('hex');

        block[i].hash = hash
        cache_blocks[i].hash = hash

        block[i].previous_hash = block[i - 1].hash
        cache_blocks[i].previous_hash = block[i - 1].hash

        block[i].nonce = nonce
        cache_blocks[i].nonce = nonce

        block[i].timestamp = timestamp
        cache_blocks[i].timestamp = timestamp

        if (i + 1 < length) {
          block[i + 1].previous_hashChanged = true
          cache_blocks[i + 1].previous_hashChanged = true
        }
        block[i].keywordChanged = true
        cache_blocks[i].keywordChanged = true

        block[i].newBlockOnError = false
        cache_blocks[i].newBlockOnError = false

        await this.setState({
          blocks: block,
          cache_blocks  
        })
      }
    }
  }

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 5,
      afterChange: () =>
        this.setState(state => ({ updateCount: state.updateCount + 1 })),
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };

    let blocks = this.state.blocks.map((block, i) => {
      return (
        <Fragment key={i}>
          <div className={
            i === 0 ?
              "col-xs-3 col-sm-3 col-md-2 block-item desktop-blocks-design no-chain"
              :
              block.previous_hashChanged === true && block.keywordChanged === true ?
                "col-xs-3 col-sm-3 col-md-2 block-item desktop-blocks-design errorschain"
                :
                "col-xs-3 col-sm-3 col-md-2 block-item desktop-blocks-design"
          }
            data-toggle="modal"
            onClick={() => this.setItteration(i)} data-backdrop="static" data-keyboard="false" data-target={"#myModal-" + this.state.itterationValue}>
            
            <div className={
              block.keywordChanged === true ?
                "myblock errors"
                :
                "myblock"
            }>
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
        </Fragment>
      )
    })
    
    return (
      <Layout>
        <ReactTooltip />
        <section className="main-content d-flex align-items-center justify-content-center create-block">
          <div className="container">
            <div className="col-sm-12 col-md-12 p-0 mx-auto ">
              <div className="col-md-12 col-lg-12 second">
                <div className="col-md-12 col-lg-6 third mx-auto text-center border  px-0   box-1 effect5 py-5">
                  <div className="px-4">
                    <div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <button className="btn btn-outline-secondary button-left-border-radius px-3" type="button" id="button-addon1">DATA</button>
                          <button className="btn btn-outline-secondary " type="button" id="button-addon1"><i className="fa fa-file"></i></button>
                        </div>
                        <input type="text" className="form-control button-right-border-radius data-block" placeholder=""
                          aria-label="Example text with button addon" aria-describedby="button-addon1"
                          name="keyword" onChange={this.handleChange} value={this.state.blocks[this.state.blocks.length - 1].keyword}
                        />
                        <i className="fa fa-question-circle ml-1 mt-2" data-class="tooltip-width" data-tip="Data includes series of transactions which also includes money transactions." aria-hidden="true"></i>
                      </div>
                      <div className="input-group mb-3 previous-hash-information">
                        <i className="fa fa-question-circle mr-1 mt-1" aria-hidden="true" data-class="tooltip-width" data-tip="The previous hash is the hash of the previous block."></i>
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
                        <i className="fa fa-question-circle ml-1 mt-2" data-class="tooltip-width" data-tip="This Hash represents the hash of the data entered in the above data field." aria-hidden="true"></i>
                      </div>
                      <div className="row">
                        <div className="col-md-9 text-left">
                          <i className="fa fa-question-circle mr-1" data-class="tooltip-width" data-tip="This index represents the position of the block in the chain. This number is known as Block Height Number. Block height number is always a positive integer greater than zero." aria-hidden="true"></i>
                          <h4 className="mb-0 line-height genesis">
                            {
                              this.state.blocks.length === 1 ?
                                'GENESIS BLOCK'
                                :
                                'BLOCK #' + (this.state.blocks.length - 1)
                            }
                          </h4>
                          <span className="block-date-information ">
                            <span className="timestamp">
                              on {this.state.blocks[this.state.blocks.length - 1].timestamp}
                            </span>
                          </span>
                          <i className="fa fa-question-circle ml-1" data-class="tooltip-width" data-tip="A record when the block was created. It mainly helps to maintain the ordering of the blockchain." aria-hidden="true"></i>
                        </div>
                        {
                          this.state.blocks[this.state.blocks.length - 1].keywordChanged ?
                            <div className="col-md-3 pull-right text-right">
                              <div className=" ">
                                <Link to="#" onClick={this.mine}>
                                  <i className="fa fa-link mine-link"></i>
                                </Link>
                                <i className="fa fa-question-circle ml-1" data-class="tooltip-width" data-tip="Nonce, also referred as 'Number only used once' is the number used to find valid hash." aria-hidden="true"></i>

                              </div>
                            </div>
                            :
                            <div className="col-md-3">
                              <i className="fa fa-question-circle ml-1 pull-right mt-2" data-class="tooltip-width" data-tip="Nonce, also referred as 'Number only used once' is the number used to find valid hash." aria-hidden="true"></i>
                              <div className="block-view-content nonce-block pull-right"  >
                                {this.state.blocks[this.state.blocks.length - 1].nonce}
                              </div>
                              
                            </div>
                        }
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <Link className="btn btn-default our-button circle-button add-block" to="#" onClick={this.newBlock} title="">
                            <i className="fa fa-plus"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 mx-auto ">
              <h4 className="text-center add-new-block-title" >Add New Block<i data-class="tooltip-width" data-tip="On clicking this a new block will be added to Eleven01 blockchain." className="fa fa-question-circle ml-1" aria-hidden="true"></i></h4>
            </div>

            <div className="pb-3 pt-5">
              <div id="demo" className="carousel slide container no-scroll" data-ride="carousel" data-interval="false" data-wrap="false">
                <div className="container carousel-inner no-padding ">
                  <div className="carousel-item active">
                    <Slider ref={slider => (this.slider = slider)} {...settings}>
                      {blocks}
                    </Slider>
                  </div>
                </div>
                <Link className="carousel-control-prev" to="#demo" data-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </Link>
                <Link className="carousel-control-next" to="#demo" data-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </Link>
              </div>
            </div>
            <div className="mobile-blocks-design">
              <div className="table-responsive mx-auto col-md-5">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.blocks.map((block, i) => {
                        return (
                          <tr key={i} data-toggle="modal"
                            onClick={() => this.setItteration(i)}
                            data-backdrop="static" data-keyboard="false"
                            data-target={"#myModal-" + this.state.itterationValue}>
                            <td>
                              <Link to="" className={
                                block.keywordChanged === true ?
                                  "mobile-myblock-errors"
                                  :
                                  ''
                              }>
                                <img src={require("../assets/images/block-3d-1.png")} alt="" width="20px" className="mr-2" />
                                {
                                  i === 0 ?
                                    <span>GENESIS BLOCK </span>
                                    :
                                    <span>BLOCK #{i}</span>
                                }
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
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
                          value={this.state.blocks[this.state.itterationValue].keyword }
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
                            <div className="col-md-3 pull-right text-right">
                                <div className="">
                                <Link to="#" onClick={this.updateMine}>
                                  <i className="fa fa-link mine-link"></i>
                                </Link> 
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