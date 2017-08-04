import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BarChart,Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend} from 'recharts';

// import Question from './questions';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [
        {
          questionText: 'Who will die next in game of thrones?',
          choices: ['Tyrion','Arya','Littlefinger']
        },
        {
          questionText: 'Who will live next in game of thrones?',
          choices: ['Tillu','Millu','Killu']
        },
        {
          questionText: 'Who will kill next in game of thrones?',
          choices: ['Talla','Malla','Kalla']
        }
      ],
      selectedIndex: 0,
      isGraphVisible: false,
      data : [
        {name: 'Page A', pv: 2400, amt: 2400},
        {name: 'Page B', pv: 1398, amt: 2210},
        {name: 'Page C', pv: 9800, amt: 2290},
      ]
    }
  }
  render() {
    return (
      <Container>
        <Header>React Native Banglore Meetup</Header>
        <Question>
          <QuestionText>{this.state.questionList[this.state.selectedIndex].questionText}</QuestionText>
          {
            this.state.questionList[this.state.selectedIndex].choices.map((choice, index) => 
              <Choice>{index+1} {choice}</Choice>
            )
          }
        </Question>
        <Counter increment={() => this.setState({selectedIndex: this.state.selectedIndex + 1, isGraphVisible: false})}>{this.state.selectedIndex}</Counter>
        <Graph active={(val) => this.setState({isGraphVisible: val})}>
          {this.state.isGraphVisible && <ShowGraph data={this.state.data}/>}
        </Graph>
      </Container>
    );
  }
}
const Container = (props) => {
  return(
    <div className="App">{props.children}</div>
  );
}
const Header = (props) => {
  return(
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>{props.children}</h2>
    </div>
  )
}
const Question = (props) => {
    return(
      <div>{props.children}</div>
    );
}
const QuestionText = (props) => {
    return(
      <div>{props.children}</div>
    );
}
const Choice = (props) => {
    return(
      <div>{props.children}</div>
    )
}
const Counter = (props) => {
  return(
    <div>
      <button onClick={() => props.increment()}>+</button>
      <span>{props.children}</span>
    </div>
  )
}
const Graph = (props) => {
  return(
    <div>
      <div>
        <button onClick={() => props.active(true)}>Click to show Graph</button>
        <button onClick={() => props.active(false)}>Click to hide Graph</button>
      </div>
      <div>{props.children}</div>
    </div>
  )
}
const ShowGraph = (props) => {
  return(
    <div>
       <BarChart width={730} height={250} data={props.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}

export default App;
