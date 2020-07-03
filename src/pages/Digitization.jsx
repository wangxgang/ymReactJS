import React, { Component, useRef } from 'react';
import ReactDOM from 'react-dom';
class Digitization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iFrameHeight: '0px',
    };
  }
  componentDidMount() {
    var box = document.getElementById('iframeFaq');
    if (box) {
      console.log(box.offsetHeight, document.body.clientHeight);
      this.setState({
        iFrameHeight: document.body.clientHeight - 120 + 'px',
      });
    }
  }
  render() {
    // const listHeight = useRef()
    // console.log(listHeight.current.clientHeight)
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <iframe
          width="100%"
          height={this.state.iFrameHeight}
          id="iframeFaq"
          frameborder="0"
          scrolling="no"
          src="http://localhost:9987/index.html"  //
        ></iframe>
      </div>
      // <iframe
      //     style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible'}}
      //     onLoad={() => {
      //         const obj = ReactDOM.findDOMNode(this);
      //         this.setState({
      //             "iFrameHeight":  obj.contentWindow.document.body.scrollHeight + 'px'
      //         });
      //     }}
      //     ref="iframe"
      //     src="http://baidu.com"
      //     width="100%"
      //     height={this.state.iFrameHeight}
      //     scrolling="no"
      //     frameBorder="0"
      // />
    );
  }
}

export default Digitization;
