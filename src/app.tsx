import React, { Component, ReactPropTypes } from 'react'
import ReactDom from 'react-dom'
import { Helmet } from 'react-helmet'
import { env } from './config'

class App extends Component {
  timeout: NodeJS.Timeout
  state: { textIdx: number }
  textArray: string[]

  constructor(props: ReactPropTypes) {
    super(props)
    this.state = { textIdx: 0 }
    this.textArray = [
      'eat',
      'sleep',
      'drink',
      'snore',
      'foo',
      'buzz',
      'whatever',
    ]
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      const idx = this.state.textIdx
      this.setState({ textIdx: idx + 1 })
    }, 1500)
  }

  componentDidUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    const text = this.textArray[this.state.textIdx % this.textArray.length]
    return (
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>React SEO</title>
          <link rel="canonical" href={env.CANONICAL_URL} />
        </Helmet>
        <div>Hello world!</div>
        <section>
          <h1>I&apos;m a React developer</h1>
          <p>
            I like to <span>{text}</span>
          </p>
        </section>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root') as HTMLElement)
