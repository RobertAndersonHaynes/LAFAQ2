import React from 'react';
import Question from '../components/Question';
import TextField from '../components/TextField';
import FormContainer from './FormContainer'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedQuestion: null,
      questions: [],
    }

    this.toggleQuestionSelect = this.toggleQuestionSelect.bind(this);

    this.addNewQ = this.addNewQ.bind(this);
  }

  componentDidMount(){
    fetch('/api/v1/questions')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {

        this.setState({ questions: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewQ(formPayload) {
    // debugger;
    fetch(`/api/v1/questions`, {
      method: 'POST',
      body: JSON.stringify(formPayload)
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status}`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    // this.handlePayload(formPayload);
    .then(response => response.json())
    .then(body => {
      this.setState({ questions: this.state.questions.concat(body) })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  toggleQuestionSelect(id) {
    if (id === this.state.selectedQuestion) {
      this.setState({ selectedQuestion: null})
    } else {
      this.setState({ selectedQuestion: id })
    }
  }


  render() {

    let questions = this.state.questions.map(question => {
      let selected;
      if (this.state.selectedQuestion === question.id) {
        selected = true
      }

      let handleClick = () => { this.toggleQuestionSelect(question.id) }

      return(
        <Question
          key={question.id}
          question={question.question}
          answer={question.answer}
          selected={selected}
          handleClick={handleClick}
        />
      )
    })

    return(
      <div className='page'>
        <h1>We're Here To Help</h1>
        <div className='question-list'>
          {questions}
          <FormContainer
          addNewQ={this.addNewQ}
        />
        </div>
      </div>
    )
  }
}

export default App;
