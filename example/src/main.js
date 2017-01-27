import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEvent from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import MarkdownEditor from 'material-ui-mde'
import 'ress'

injectTapEvent()

const App = (
  <MuiThemeProvider>
    <Card>
      <CardTitle title='Example for material-ui-mde' />
      <CardText>
        <MarkdownEditor />
      </CardText>
    </Card>
  </MuiThemeProvider>
)

ReactDOM.render(
  App,
  document.getElementById('root')
)
