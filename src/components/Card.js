import React from 'react';
import QRCode from 'qrcode.react';
import './style.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ssid: '', password: '', qrvalue: ''};
    this.handleSSIDChange = this.handleSSIDChange.bind(this);
    this.handlePasswordChange= this.handlePasswordChange.bind(this);
  }

  handleSSIDChange(event) {
    this.setState({ssid: event.target.value}, () => this.generateqr());
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value}, () => this.generateqr());
  }

  generateqr() {
    const qrcode = `WIFI:T:WPA;S:${this.state.ssid};P:${this.state.password};;`
    this.setState({qrvalue: qrcode});
  }

  render() {
    return (
      <div>
        <fieldset id="print-area">
          <legend></legend>

          <h1>WiFi Login</h1>
          <hr/>

          <div className="details">
            <QRCode className="qrcode" value={this.state.qrvalue} size={175} />

            <div className="text">
              <label>Network name</label>
              <input id="ssid" type="text" maxlength="32" placeholder="Enter your WiFi Network" value={this.state.ssid} onChange={this.handleSSIDChange}/>
              <label>Password</label>
              <input id="password" type="text" maxlength="64" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
          </div>

          <p><span role="img" aria-label="mobile-phone">📸📱</span>Point your phone's camera at the QR Code to connect automatically</p>
        </fieldset>
        <div className="print-btn">
          <button onClick={window.print}>Print</button>
        </div>
      </div>
    )
  }
}

export default Card;
