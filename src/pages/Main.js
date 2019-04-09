import React, { Component } from 'react';
import Home from './Home'
import Landing from './Landing'
import '../App.css';
import {connect} from 'react-redux';

class Main extends Component {

  render() {

    var curpage =<Landing/>
  
    //We are changing state to use the globla state
    switch (this.props.pages){
      case "Landing":
        curpage = <Landing/>
        break;

      case "Home":
        curpage = <Home/>
        break;
  
    }
  
    return(
        <div>
        {curpage}
        </div>
    ) ; 
  
  }}

function mapStateToProps(state){
  return{
      pages: state.Page.page
  }
}

export default connect(mapStateToProps)(Main)
