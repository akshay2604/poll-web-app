import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BarChart,Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend} from 'recharts';
import { Carousel } from 'react-bootstrap';
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
      activeVotes : [
        {name: 'Page A',votes: 2400},
        {name: 'Page B',votes: 2210},
        {name: 'Page C',votes: 2290},
      ],
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
        <Header>React Native Bangalore Meetup</Header>
        <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
          {
            Object.keys(questions).map((question, index) => (
              <Carousel.Item>
                <Question>
                  <QuestionText>{question}</QuestionText>
                  {
                    Object.keys(questions[question]).map((choice, index) => 
                      <Choice>
                        <span>{choice}</span>
                        <span>{questions[question][choice].name}</span>
                      </Choice>
                    )
                  }
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
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </div>
  )
}
class ControlledCarousel extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    alert('selected=' + selectedIndex + ', direction=' + e.direction);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={(selectedIndex, e) => this.handleSelect(selectedIndex, e)}>
        <Carousel.Item>

          <div>here the question will go</div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div>here the question will go</div>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div>here the question will go</div>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
};

export default App;
