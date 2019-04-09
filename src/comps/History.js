import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Dropdown, Grid,Button,Icon,Label, Container,Checkbox} from 'semantic-ui-react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

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

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: '',
      beginDate: '',
      Bcurrency:'',
      Qcurrency:'',
      value:'',
      
    };
  }
  
  getDateStart = (num) =>{
    //Lastweek

    var startDate = new Date();
    startDate.setDate( startDate.getDate() - num);
    var lastdd = startDate.getDate();
    var lastmm = startDate.getMonth() + 1;
    var lastyyyy = startDate.getFullYear();
    if (lastdd < 10) {
      lastdd = '0' + lastdd;
    }

    if (lastmm < 10) {
      lastmm = '0' + lastmm;
    }
    startDate = lastyyyy + '-' + lastmm + '-' + lastdd;

    console.log(startDate)
    this.setState({
      beginDate: startDate
    })
  }

  createChart = (ratesData)=> {
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    
    chart.data = generateChartData(ratesData);
    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "rate";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12,12,12,12)
    
    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    
    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    
    function generateChartData(ratesData) {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - ratesData.length);

        for (var i = 0; i < ratesData.length; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);
          
            chartData.push({
                date: newDate,
                rate: ratesData[i].rate
            });
        }
        return chartData;
    }
}

  componentWillMount = () => {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }
      today = yyyy + '-' + mm + '-' + dd;

      this.setState({
        currentDate: today
      })

  }

  getPeriod= (e, { value }) => {
    
    this.setState({ value })
    console.log(value)
    this.getDateStart(value)
    
  }

  handleChangeBase = (e, { value }) => { 
    this.setState({
      Bcurrency:value
    })
  }
  handleChangeQuote = (e, { value }) => { 
    this.setState({
      Qcurrency:value
    })
  }
  retrieveData = async() =>{
      if(!this.state.currentDate || !this.state.beginDate || !this.state.Bcurrency || !this.state.Qcurrency){
        alert("Please fill out the form")

        return false
      }

        var DataObj ={
          curDate : this.state.currentDate,
          staDate : this.state.beginDate,
          baseCurr : this.state.Bcurrency,
          quoCurr : this.state.Qcurrency
        }

        let myObj = JSON.stringify(DataObj);
        console.log(myObj)
        var response = await fetch("https://jimmy-forexapp.herokuapp.com/history/" + myObj)
        var json = await response.json()
        var sortData = [];

        for (var curr in json.rates) {
            sortData.push({ "date": curr, "rate": Number(Object.values(json.rates[curr]))});
        }

        this.createChart(sortData);
  }

  render() {

    return (
      <Container fluid style={{padding:30}}>
      <Grid verticalAlign='middle' divided='vertically' style={{marginTop:20}} columns={2} relaxed='very' stackable >
      <Grid.Row>
        <Grid.Column>
        <pre>Choose currency pair</pre>
        <Grid.Row>
          <Dropdown
            onChange={this.handleChangeBase}
            options={currencyOptions}
            placeholder='Base currency'
            selection
            value={this.state.Bcurrency}
          />

<Icon name='exchange' style={{margin: 20}}/>

          <Dropdown
            onChange={this.handleChangeQuote}
            options={currencyOptions}
            placeholder='Quote currency'
            selection
            value={this.state.Qcurrency}
          />
          </Grid.Row>
          
          <pre>Choose reporting period</pre>
          <Grid relaxed columns={4}>
          <Grid.Column>
          <Checkbox
            radio
            label='Last 7 days'
            name='checkboxRadioGroup'
            value='7'
            checked={this.state.value === '7'}
            onChange={this.getPeriod}
          />
          </Grid.Column>
          <Grid.Column>
          <Checkbox
            radio
            label='Last 1 month'
            name='checkboxRadioGroup'
            value='30'
            checked={this.state.value === '30'}
            onChange={this.getPeriod}
          />
          </Grid.Column>
          <Grid.Column>
          <Checkbox
            radio
            label='Last 6 months'
            name='checkboxRadioGroup'
            value='180'
            checked={this.state.value === '180'}
            onChange={this.getPeriod}
          />
          </Grid.Column>
          <Grid.Column>
          <Checkbox
            radio
            label='Last 1 year'
            name='checkboxRadioGroup'
            value='365'
            checked={this.state.value === '365'}
            onChange={this.getPeriod}
          />
          </Grid.Column>
          </Grid>
          <pre> 
          <Label color='red' horizontal>
          Date:
        </Label>{this.state.beginDate}
        </pre>
        <Button  positive onClick={this.retrieveData}>RETRIEVE DATA</Button>
    
        </Grid.Column>
        
        </Grid.Row>
        </Grid>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>

        <pre>Base Currency: 
          <Label color='blue' horizontal>
             {this.state.Bcurrency}
          </Label>
        </pre>

        <pre>Quote Currency: 
          <Label color='violet' horizontal>
             {this.state.Qcurrency}
          </Label>
        </pre>
  
        </Container>
    );
      }

}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps)(History)
