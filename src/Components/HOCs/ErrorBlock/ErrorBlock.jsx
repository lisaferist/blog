import { Component } from 'react'
import './ErrorBlock.scss'

class ErrorBlock extends Component {
  state = {
    error: null,
    errorMessage: null,
  }

  componentDidCatch(error) {
    this.setState({ error: true, errorMessage: error.message })
  }

  render() {
    const { children } = this.props
    const { error, errorMessage } = this.state
    if (error) {
      return (
        <div className="error-block">
          <p className="error-block__text">{errorMessage}</p>
        </div>
      )
    }
    return children
  }
}

export default ErrorBlock
