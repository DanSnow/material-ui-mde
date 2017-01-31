import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEvent from 'react-tap-event-plugin'
import Router from 'react-router/HashRouter'
import Miss from 'react-router/Miss'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Redirect from 'react-router/Redirect'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import 'ress'

import Layout from './Layout'
import Basic from './Basic'
import LivePreview from './LivePreview'

injectTapEvent()

function RedirectToBasic () {
  return (
    <Redirect to='/basic' />
  )
}

function App () {
  return (
    <div>
      <Drawer open>
        <MenuItem containerElement={<Link to='/basic' />}>
          Basic
        </MenuItem>
        <MenuItem containerElement={<Link to='/live-preview' />}>
          Live Preview
        </MenuItem>
      </Drawer>
      <Layout>
        <Match exactly pattern='/' component={RedirectToBasic} />
        <Match pattern='/basic' component={Basic} />
        <Match pattern='/live-preview' component={LivePreview} />
        <Miss component={RedirectToBasic} />
      </Layout>
    </div>
  )
}

const Provider = (
  <MuiThemeProvider>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(
  Provider,
  document.getElementById('root')
)
