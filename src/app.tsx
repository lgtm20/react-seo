import React from 'react'
import ReactDom from 'react-dom'
import { Helmet } from 'react-helmet'
import { env } from './config'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          <link rel="canonical" href={env.CANONICAL_URL} />
        </Helmet>
        <div>Hello world!</div>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root') as HTMLElement)
