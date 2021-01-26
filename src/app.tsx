import React, { Component, ReactPropTypes } from 'react'
import ReactDom from 'react-dom'
import { Helmet } from 'react-helmet'
import { env } from './config'

class App extends Component {
  timeout: NodeJS.Timeout
  state: {
    counter: number
    result: JSON | null
  }

  constructor(props: ReactPropTypes) {
    super(props)
    this.state = { counter: 0, result: null }
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      const counter = this.state.counter
      this.setState({ counter: counter + 1 })
    }, 1000)
    this.fetch()
  }

  fetch() {
    let path = window.location.pathname
    if (!path || path === '/') {
      path = '/request'
    }
    fetch(`https://mockbin.com${path}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result: result,
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        },
      )
  }

  componentDidUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    const counter = this.state.counter
    const result = this.state.result
    return (
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>React SEO</title>
          <link rel="canonical" href={env.CANONICAL_URL} />
        </Helmet>
        <section>
          <p>
            <pre>Counter: {counter}</pre>
          </p>
        </section>
        <section>
          <p>
            <pre>Result: {JSON.stringify(result, null, 2)}</pre>
          </p>
        </section>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root') as HTMLElement)
