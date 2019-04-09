import React, { Component } from 'react'
import { Icon, Menu, GridRow } from 'semantic-ui-react'
import { Grid,Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {changePage} from '../redux/action';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import ExchangeRates from '../comps/ExchangeRates'
import History from '../comps/History'
import Codes from '../comps/Codes'
import history from '../history';

  function GetRates() {
    return <ExchangeRates />;
  }
  
  function CurrencyList() {
    return <Codes />;
  }

  function Chart() {
    return <History />;
  }

class Home extends Component {
  state = { activeItem: 'exchange rates' }

  handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
  }

  handleQuitApp = (page) => {
    history.push('/');
    this.props.dispatch(changePage(page))
}

  render() {
    const { activeItem } = this.state

    return (
        <Router history={history}>
        <Grid celled='internally' stackable style={{minHeight: "100vh"}}>
     
          <Grid.Column width={2} stretched>
        
            <Menu color='blue' icon='labeled' vertical>

            <Link to="/Xrates">

            <Menu.Item
          name='exchange rates'
          active={activeItem === 'exchange rates'}
          onClick={this.handleItemClick}
        >
          <Icon name='money bill alternate outline' />
          Exchange Rates
        </Menu.Item>
        
        </Link>

        <Link to="/chart/">
        <Menu.Item
          name='chart'
          active={activeItem === 'chart'}
          onClick={this.handleItemClick}
        >
          <Icon name='chart area' />
          Historical lookup
        </Menu.Item>
        </Link>

        <Link to="/currencylist/">
        <Menu.Item
          name='list'
          active={activeItem === 'list'}
          onClick={this.handleItemClick}
        >
          <Icon name='dollar sign' />
          Currency Codes
        </Menu.Item>
        </Link>

        <Menu.Item
          name='exit'
          active={activeItem === 'exit'}
          onClick={this.handleQuitApp.bind("Landing")}
        >
          <Icon name='log out' />
          Exit
        </Menu.Item>
      
      </Menu>
      
          </Grid.Column>
          <Grid.Column width={14}>
            <GridRow stretched>
          <Container fluid>
            <Route path="/Xrates/" component={GetRates} />
            <Route path="/chart/" component={Chart} />
            <Route path="/currencylist/" component={CurrencyList} />
            </Container>
            </GridRow>
          </Grid.Column>
     
      </Grid>
      </Router>
       )
  }
}

function mapStateToProps(state){
    return{
        pages: state.Page.page
    }
  }
  
  export default connect(mapStateToProps)(Home)