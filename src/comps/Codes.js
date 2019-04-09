import React, { Component } from 'react'
import {  Table, Image,Container,Header} from 'semantic-ui-react'
import {connect} from 'react-redux';
import CodesList from '../listDB';

class Codes extends Component {
    constructor(props){
        super(props);
        this.state={
            currency: 'CAD',
            refresh: false,
            amount: 1
        }
    }

    componentWillMount = async() => {

      }

  render(){
    return (
           <div>
                <Container fluid style={{padding:50}}>
                <Table basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Currency Code</Table.HeaderCell>
        <Table.HeaderCell>Currency Name</Table.HeaderCell>
        <Table.HeaderCell>Currency Symbol</Table.HeaderCell>
        <Table.HeaderCell>Country</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>

        {CodesList.map((item, index) => {
          return (
            <Table.Row key={index}>
            <Table.Cell><Image avatar src={item.image} /></Table.Cell>
            <Table.Cell><Header as='h4'>{item.code} </Header></Table.Cell>
            <Table.Cell><Header as='h4'>{item.name} </Header></Table.Cell>
            <Table.Cell><Header as='h4'>{item.symbol} </Header></Table.Cell>
            <Table.Cell><Header as='h4'>{item.country} </Header></Table.Cell>
            </Table.Row>
          )
        })}

    </Table.Body>
  </Table>
                </Container>
          </div>
            )
        }
            
        }

function mapStateToProps(state){
    return{
        currency: state.Page.currency
    }
  }
  
  export default connect(mapStateToProps)(Codes)