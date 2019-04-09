import React, { Component } from 'react'
import { Dropdown, Grid,Image, List, Container, Input, Header} from 'semantic-ui-react'
import {connect} from 'react-redux';

const currencyOptions = [
    {
      key: 'CAD',
      text: 'Canadian Dollar',
      value: 'CAD',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/323/323277.svg' },
    },
    {
      key: 'USD',
      text: 'US Dollar',
      value: 'USD',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197484.svg' },
    },
    {
      key: 'GBP',
      text: 'Pound sterling',
      value: 'GBP',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197374.svg' },
    },
    {
      key: 'EUR',
      text: 'Euro',
      value: 'EUR',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197615.svg' },
    },
    {
      key: 'AUD',
      text: 'Australian Dollar',
      value: 'AUD',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197507.svg' },
    },
    {
      key: 'CHF',
      text: 'Swiss franc',
      value: 'CHF',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197540.svg' },
    },
    {
      key: 'CNY',
      text: 'Chinese Yuan',
      value: 'CNY',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197375.svg' },
    },
    {
      key: 'JPY',
      text: 'Japanese Yen',
      value: 'JPY',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197604.svg' },
    },
    {
      key: 'RUB',
      text: 'Russian Rouble',
      value: 'RUB',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197408.svg' },
    },
    {
      key: 'BRL',
      text: 'Brazilian Real',
      value: 'BRL',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197386.svg' },
    },
    {
      key: 'PHP',
      text: 'Philippine Peso',
      value: 'PHP',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197561.svg' },
    },
    {
      key: 'SGD',
      text: 'Singapore Dollar',
      value: 'SGD',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197496.svg' },
    },
    {
      key: 'THB',
      text: 'Thai Baht',
      value: 'THB',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197452.svg' },
    },
  ]

var currencyOptions1 = [
    {
      key: 'CAD',
      text: 'Canadian Dollar',
      value: 'CAD',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/323/323277.svg' },
    },
    {
      key: 'USD',
      text: 'US Dollar',
      value: 'USD',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197484.svg' },
    },
    {
      key: 'GBP',
      text: 'Pound sterling',
      value: 'GBP',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197374.svg' },
    },
    {
      key: 'EUR',
      text: 'Euro',
      value: 'EUR',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197615.svg' },
    },
    {
      key: 'AUD',
      text: 'Australian Dollar',
      value: 'AUD',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197507.svg' },
    },
    ]
    var currencyOptions2 = [
    {
      key: 'CHF',
      text: 'Swiss franc',
      value: 'CHF',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197540.svg' },
    },
    {
      key: 'CNY',
      text: 'Chinese Yuan',
      value: 'CNY',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197375.svg' },
    },
    {
      key: 'JPY',
      text: 'Japanese Yen',
      value: 'JPY',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197604.svg' },
    },
    {
      key: 'RUB',
      text: 'Russian Rouble',
      value: 'RUB',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197408.svg' },
    },
    {
      key: 'BRL',
      text: 'Brazilian Real',
      value: 'BRL',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197386.svg' },
    },
    ]

    var currencyOptions3 = [
    {
      key: 'PHP',
      text: 'Philippine Peso',
      value: 'PHP',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197561.svg' },
    },
    {
      key: 'SGD',
      text: 'Singapore Dollar',
      value: 'SGD',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197496.svg' },
    },
    {
      key: 'THB',
      text: 'Thai Baht',
      value: 'THB',
      rate: '',
      image: { avatar: true, src: 'https://image.flaticon.com/icons/svg/197/197452.svg' },
    },
  ]
  
class Converter extends Component {
    constructor(props){
        super(props);
        this.state={
            currency: 'CAD',
            refresh: false,
            amount: 1
        }
    }

    searchArray=(obj)=>{
        var sortData = [];
      for (var curr in obj) {
          sortData.push({ "currency": curr, "rate": obj[curr]});
      }
      sortData.sort(function(a, b) {
          return b["rate"] - a["rate"];
      });
     
      for(let i =0; i < currencyOptions1.length; i++){
          for(let j =0; j < sortData.length; j++){

          if(currencyOptions1[i].value === sortData[j].currency){
              currencyOptions1[i].rate = sortData[j].rate
          }
      }
  }
      for(let i =0; i < currencyOptions2.length; i++){
          for(let j =0; j < sortData.length; j++){
          if(currencyOptions2[i].value === sortData[j].currency){
              currencyOptions2[i].rate = sortData[j].rate
          }
      }
  }
      for(let i =0; i < currencyOptions3.length; i++){
          for(let j =0; j < sortData.length; j++){
          if(currencyOptions3[i].value === sortData[j].currency){
              currencyOptions3[i].rate = sortData[j].rate
          }
      }
      }

      this.setState({
          refresh: true
      })
    }

    componentWillMount = async() => {
        var response = await fetch("https://jimmy-forexapp.herokuapp.com/rates/" + this.state.currency)
        var json = await response.json()
        
       this.searchArray(json.rates)

      }

      handleChange = async (e, { value }) => {
        
        var response = await fetch("https://jimmy-forexapp.herokuapp.com/rates/" + value)
        var json = await response.json()

        this.searchArray(json.rates)
    
      }

      handleInp = async (e, { value }) => {
        
        this.setState({
            amount: value
        })
    
      }

  render(){
    return (
           <div>

                <Input
                action={<Dropdown onChange={this.handleChange} style={{width: "180px"}} button basic floating options={currencyOptions} defaultValue='CAD' />}
                icon='sync'
                onChange={this.handleInp}
                iconPosition='left'
                placeholder='Amount...'
                />

                <Container fluid style={{paddingTop:30}}>
                <Grid columns={3} divided stackable>
                <Grid.Row>
                <Grid.Column>
                 <List animated divided verticalAlign='middle'>

                 {currencyOptions1.map((item, index) => {
                     return(
                     <List.Item key={index}>
                     <Image avatar src={item.image.src} />
                     <List.Content>
                         <List.Header as='a'>{item.value}</List.Header>
                         {item.text}
                     </List.Content>
                     <List.Content floated='right'>
                     <Header as='h4' color='violet'>
                     {item.rate*this.state.amount}
                        </Header>
                    </List.Content>
                     </List.Item>
                     )
                 })}           
                        
          </List>
          </Grid.Column>
          <Grid.Column>
                 <List animated divided verticalAlign='middle'>

                 {currencyOptions2.map((item, index) => {
               
                     return(
                     <List.Item key={index}>
                     <Image avatar src={item.image.src} />
                     <List.Content>
                         <List.Header as='a'>{item.value}</List.Header>
                         {item.text}
                     </List.Content>
                     <List.Content floated='right'>
                     <Header as='h4' color='violet'>
                     {item.rate*this.state.amount}
                        </Header>
                    </List.Content>
                     </List.Item>
                     )
                 })}           
                        
          </List>
          </Grid.Column> 
          <Grid.Column>
                 <List animated divided verticalAlign='middle'>

                 {currencyOptions3.map((item, index) => {
                     return(
                     <List.Item key={index}>
                     <Image avatar src={item.image.src} />
                     <List.Content>
                         <List.Header as='a'>{item.value}</List.Header>
                         {item.text}
                     </List.Content>
                     <List.Content floated='right'>
                     <Header as='h4' color='violet'>
                        {item.rate*this.state.amount}
                        </Header>
                    </List.Content>
                     </List.Item>
                     )
                 })}           
                        
          </List>
          </Grid.Column>      
                </Grid.Row>
                </Grid>
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
  
  export default connect(mapStateToProps)(Converter)