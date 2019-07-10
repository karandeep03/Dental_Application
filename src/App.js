import React from 'react';
import './App.css';
import Highcharts from 'highcharts';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {

      },
      series: [
        {
          name: 'Gases',
            data: [
              {
                name: 'Argon',
                x: 2,
                y: 0.9,
                color: '#3498db'
              },
              {
                name: 'Nitrogen',
                x: 1,
                y: 78.1,
                color: '#9b59b6'
              },
              {
                name: 'Oxygen',
                x: 3,
                y: 20.9,
                color: '#2ecc71'
              },
              {
                name: 'Trace Gases',
                x: 5,
                y: 0.1,
                color: '#f1c40f'
              }
            ]
        }
      ]
    }
  }

  highChartsRender() {
    Highcharts.chart({
      chart: {
        type: 'bar',
        renderTo: 'charts'
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'Earth\'s Atmospheric Composition',
        style: {
          fontSize: '10px'
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            format: '{point.name}: {point.percentage:.1f}%'
          },
          innerSize: '80%'
        }
      },
      series: this.state.series
    })
  }

  generateData() {
    let data = {};

    let m = new Date(2018, 5);

    while (m < Date.now()) {
      data[m] = [];
      let n = new Date(m);
      while (n.getMonth() === m.getMonth()) {
        data[m].push(Math.floor(Math.random() * (24 - 8)) + 8);
        n.setDate(n.getDate() + 1);
      }

      m.setMonth(m.getMonth() + 1);
    }
    // console.log(data);
    return data;
  }

  componentDidMount() {
    // this.highChartsRender();

    let promise = new Promise((resolve, reject) => {
      resolve(this.generateData());
    })
  
    promise.then(data => {
      this.setState({
        data
      })
    })
  }

  render() {
    let data = this.state.data;
    let counter = [];
    return (
      <div className="App">
        <header className="App-header" id='charts'>
          {
            Object.keys(data).map((key, index) => {
              counter[index] = 0
              return (
                <div>
                  <p>{key}</p>
                  <p>Month: {index+1}</p>
                  {
                    data[key].map(hrs => {
                    return(
                      <div>
                      {hrs>=22 ? hrs+'hrs: ' + ++counter[index] + 'Goal Achieved' : null}
                      </div>
                    ) 
                    })
                  }
                  <hr />
                  <br />
                </div>
              )
            })
          }
          <p>{counter.map(el => {
            console.log(el)
          })}</p>              
        </header>
      </div>
    );
  }
}

export default App;
