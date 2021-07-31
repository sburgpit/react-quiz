import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Lodaer'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'
import {connect} from 'react-redux'

class Quiz extends Component {

  componentWillUnmount(){
    this.props.retryQuiz()
  }

  componentDidMount(){
    this.props.fetchQuizById(this.props.match.params.id)
  }

  render(){
    
    return(
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>

          {
            this.props.loading || !this.props.quiz
              ? <Loader/>
              : this.props.isFinished
                ? <FinishedQuiz
                    results={this.props.results}
                    quiz={this.props.quiz}
                    onRetry={this.props.retryQuiz}
                  />
                : <ActiveQuiz
                    question={this.props.quiz[this.props.activeQuestion].question}
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    onAnswerClick={this.props.quizAnswerClick}
                    quizLength={this.props.quiz.length}
                    answerNumber={this.props.activeQuestion + 1}
                    state={this.props.answerState}
                  />
          }
        </div>
      </div>
    )

  }
}

function mapStateToProps(state){
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
