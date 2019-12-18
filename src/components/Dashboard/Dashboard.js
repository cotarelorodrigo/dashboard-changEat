import React, { Component } from 'react';
import 'hammerjs';
//import './Dashboard.css'
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartTitle
} from '@progress/kendo-react-charts';

import { 
    Grid, 
    GridColumn as Column 
} from '@progress/kendo-react-grid';

export class DonutChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        donutChartData: this.props.donutChartData
      };
    }

    /* This function's outputted string determines the label contents */
    labelTemplate = (e) => (e.category + '\n'  + (e.percentage*100) +'%');

    render() {
        return (
        <Chart style={{height:300}}>
            <ChartSeries>
            <ChartSeriesItem type="donut" data={this.state.donutChartData} categoryField="dieta" field="percentSold" padding={0}>
                <ChartSeriesLabels color="#fff" background="none" content={this.labelTemplate} />
            </ChartSeriesItem>
            </ChartSeries>
            <ChartLegend visible={false} />
        </Chart>
        );
    }
    
}


export class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          months: this.props.months,
          months_porcentages: this.props.months_porcentages
        };
      }

    render () {
        return (
            <Chart style={{ height: 300 }}>
            <ChartLegend visible={false} />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={this.state.months} startAngle={45} />
            </ChartCategoryAxis>
            <ChartSeries>
            {
                this.state.months_porcentages.map((item, idx) => (
                <ChartSeriesItem key={idx} type="column" data={item.data} name={item.name} gap={2}/>
                ))}
            </ChartSeries>
            <ChartValueAxis skip={4}>
            <ChartValueAxisItem color="#888" skip={2} />
            </ChartValueAxis>
            </Chart>
        );
    }

}

export class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: this.props.data,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 
        };
      } 

    render (){
        return (
            <Chart style={{ height: 350, width: 600 }}>
                <ChartTitle text="Units sold" />
                <ChartCategoryAxis>
                <ChartCategoryAxisItem title={{ text: 'Months'}} categories={this.state.categories} />
                </ChartCategoryAxis>
                <ChartSeries>
                <ChartSeriesItem type="line" data={this.state.data} />
                </ChartSeries>
            </Chart>
        );
    }

}


export class GridContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: this.props.data
        };
      }

    render (){
        return (
            <div>
                <Grid style={{ height: 300, width: 1150 }} data={this.state.data}>
                    <Column field="Email" title="Email" width="200px" />
                    <Column field="Fecha" title="Fecha" width="300px" />
                    <Column field="Productos" title="Products (Unidades)" width="300px" />
                    <Column field="Total gastado" title="Total Gastado" width="200px" />
                    <Column field="Comision" title="Comision" width="100px" />
                </Grid>
            </div>
        );
    }

}