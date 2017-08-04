import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BarChart,Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend} from 'recharts';
import { Carousel, ListGroup, ListGroupItem } from 'react-bootstrap';
var firebase = require("firebase/app");

  var config = {
    apiKey: "AIzaSyAG7CxWol6qxwumpXgacaS3IHiKJLHz4kM",
    authDomain: "surveyapp-7dbb7.firebaseapp.com",
    databaseURL: "https://surveyapp-7dbb7.firebaseio.com",
    projectId: "surveyapp-7dbb7",
    storageBucket: "surveyapp-7dbb7.appspot.com",
    messagingSenderId: "245740130511"
  };
  firebase.initializeApp(config);
  console.log(firebase);
// import Question from './questions';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions : {
        'who will die next': {
          'a': {
            'name': 'Tyrion',
            'votes': 3
          },
          'b': {
            'name': 'Arya',
            'votes': 5
          },
          'c': {
            'name': 'LittleFinger',
            'votes': 8
          },
        },
        'who will marry next': {
          'a': {
            'name': 'Tyrion',
            'votes': 4
          },
          'b': {
            'name': 'Arya',
            'votes': 7
          },
          'c': {
            'name': 'LittleFinger',
            'votes': 50
          }
        },
        'who will kill next': {
          'a': {
            'name': 'Tyrion',
            'votes': 3
          },
          'b': {
            'name': 'Arya',
            'votes': 9
          },
          'c': {
            'name': 'LittleFinger',
            'votes': 21
          },
        }
      },
      isGraphVisible: false,
      activeVotes : [],
      index: 0,
      direction: null
    }
  }
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
        isGraphVisible: false
      });
    }
    handleGraphClick(val, question) {
      const { questions } = this.state;
      let activeVotes = [];
      var obj;
      this.setState({isGraphVisible: val});
      Object.keys(questions[question]).forEach((choice, index) => {
        obj = {
          name: questions[question][choice].name,
          votes: questions[question][choice].votes
        }
        console.log(obj);
        activeVotes.push(obj)
      })
      console.log(activeVotes);
      this.setState({
        activeVotes:activeVotes
      })
    }
  render() {
    const { questions } = this.state
    return (
      <Container>
        <h2>React Native Bangalore Meetup</h2>
        <Carousel style={{border: '1px solid blue', width: '80%'}} activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
          {
            Object.keys(questions).map((question, index) => (
              <Carousel.Item>
                <Question>
                  <QuestionText>Q{index+1} {question}</QuestionText>
                  <br/>
                    <ListGroup style={{border: '1px solid red'}}>
                      {
                        Object.keys(questions[question]).map((choice, index) => 
                            <ListGroupItem style={{border: '1px solid green'}}>{choice} {questions[question][choice].name}</ListGroupItem>
                        )
                      }
                  </ListGroup>
                </Question>
                    <Graph active={(val) => this.handleGraphClick(val, question)}>
                       {this.state.isGraphVisible && <ShowGraph data={this.state.activeVotes}/>}
                    </Graph>
              </Carousel.Item>
            ))
          }
        </Carousel>
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
    <div className="Question">{props.children}</div>
  );
}
const QuestionText = (props) => {
    return(
      <div className="QuestionText">{props.children}</div>
    );
}
const Choice = (props) => {
    return(
      <div>{props.children}</div>
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
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </div>
  )
}

export default App;
