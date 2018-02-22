import React from 'react';
import Question from '../components/Question';
import TextField from '../components/TextField';

class FormContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      question: '',
      answer: ''
    }

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

  }

  handleQuestionChange(event) {
    this.setState({question: event.target.value});
  }

  handleAnswerChange(event) {
    this.setState({answer: event.target.value});
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({
      question: '',
      answer: ''
    })
  }

handleSubmit(event) {
  event.preventDefault();
  let formPayload = {
    question: this.state.question,
    answer: this.state.answer
    }
    this.props.addNewQ(formPayload);
    this.handleClearForm(event);
}


render(){


return(
<div>
  <h2>Submit a New FAQ</h2>
  <form className="form" onSubmit={this.handleSubmit}>
    <TextField
      label='Question'
      name='question'
      onChange={this.handleQuestionChange}
      value={this.state.question}
      type="text"
    />
    <TextField
      label='Answer'
      name='answer'
      onChange={this.handleAnswerChange}
      value={this.state.answer}
      type="text"
    />
    <input type="submit" className="button" value="Submit"/>
  </form>
</div>
  )
}
}

export default FormContainer;
