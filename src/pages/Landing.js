import React, { Component } from 'react';
import Lottie from 'lottie-react-web';
import animation from '../animation.json';

import { Icon } from 'semantic-ui-react'
import '../App.css';
import {connect} from 'react-redux';
import {changePage} from '../redux/action';
import history from '../history';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: 1
    };
  }

  handleChangePage = () => {
    history.push('/Xrates');
    this.props.dispatch(changePage("Home"))
}

  render() {

    return (
      <div>
        <header className="App-header">
        <div className="AnimBox">
        <Lottie
          options={{
            animationData: animation
          }}
        />
        </div>
              
          <h1>
            FOR€X
          </h1>

      <div>
        <nav>
 
              <div className="HomeButton" onClick={this.handleChangePage}>
              <span>START  <Icon name='play' /></span>
              </div>

              <div className="SourceButton">
              <span>Source Code  <Icon name='github' /></span>
              </div>

        </nav>

      </div>

        </header>
        <div id="footer">
        <ul>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="https://jimmytruong.ca">About</a>
          </li>
  
        </ul>
      </div>
      </div>
    );
      }

}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps)(Landing)
