import React, { Component } from 'react'
import { Dropdown, Grid,Divider,Container,Label, Comment, Header} from 'semantic-ui-react'
import {connect} from 'react-redux';
import { changeCurrency } from '../redux/action';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Converter from './Converter'

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

class ExchangeRates extends Component {
    constructor(props){
        super(props);
        this.state={
            chartData: [],
            date: ''
        }
    }

    componentDidMount = async() => {

        var response = await fetch("https://jimmy-forexapp.herokuapp.com/rates/" + this.props.currency)
        var json = await response.json()
        this.setState({
            date: json.date
        })
        var sortData = [];
        for (var curr in json.rates) {
            sortData.push({ "currency": curr, "rate": json.rates[curr]});
        }
        sortData.sort(function(a, b) {
            return b["rate"] - a["rate"];
        });
        console.log(sortData);

        this.createChart(sortData);
      }
    
      componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }

      createChart = (params)=> {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        
            chart.paddingRight = 20;
            
            chart.data = params
            let total = 0;
    
            for(var i = 0; i < chart.data.length; i++){
                let value = chart.data[i].rate;
                total += value;
            }
        
            let sum = 0;
            for(var i = 0; i < chart.data.length; i++){
                let value = chart.data[i].rate;
                sum += value;   
                chart.data[i].pareto = sum / total * 100;
            }  
    
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "currency";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    
    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "rate";
    series.dataFields.categoryX = "currency";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;
    
    series.tooltip.pointerOrientation = "vertical";
    
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;
    
    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;
    
    series.columns.template.adapter.add("fill", (fill, target)=>{
      return chart.colors.getIndex(target.dataItem.index);
    })
    
    let paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'"
    paretoValueAxis.cursorTooltipEnabled = false;
    
    let paretoSeries = chart.series.push(new am4charts.LineSeries())
    paretoSeries.dataFields.valueY = "pareto";
    paretoSeries.dataFields.categoryX = "currency";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    paretoSeries.strokeOpacity = 0.5;
    
    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    }

  handleChange = async (e, { value }) => {
    
    this.props.dispatch(changeCurrency(value))
    var response = await fetch("https://jimmy-forexapp.herokuapp.com/rates/" + value)
    var json = await response.json()

    var sortData = [];
    for (var curr in json.rates) {
        sortData.push({ "currency": curr, "rate": json.rates[curr]});
    }
    sortData.sort(function(a, b) {
        return b["rate"] - a["rate"];
    });
    console.log(sortData);

    this.createChart(sortData);

  }

  render() {
    return (
      <Container fluid style={{padding:30}}>
      <Grid verticalAlign='middle' divided='vertically' style={{marginTop:20}} columns={2} relaxed='very' stackable >
      <Grid.Row>
        <Grid.Column width={12}>
        
          <Dropdown
            onChange={this.handleChange}
            options={currencyOptions}
            placeholder='Choose a currency'
            selection
            value={this.props.currency}
          />
          <pre>Current value: {this.props.currency}</pre>
          <pre> 
          <Label color='red' horizontal>
          Date:
        </Label>{this.state.date}
        </pre>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        
        </Grid.Column>

        <Grid.Column width={4}>
        <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Jimmy Truong</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>Project Duration: 15 hours</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>Front End: React | Back End: Node, Express</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Currency API: https://exchangeratesapi.io/</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>UI Design: Semantic UI React, Lottie, amcharts</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

  </Comment.Group>
        </Grid.Column>
        </Grid.Row>
        </Grid>
        <Divider horizontal>CONVERTER   </Divider>
        <Converter />
        
        </Container>
    )
  }
}

function mapStateToProps(state){
    return{
        currency: state.Page.currency
    }
  }
  
  export default connect(mapStateToProps)(ExchangeRates)