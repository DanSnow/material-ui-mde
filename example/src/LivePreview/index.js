import React, {Component} from 'react'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import Remarkable from 'react-remarkable'
import MarkdownEditor from 'material-ui-mde'
import markdown from '../default-content'

class LivePreview extends Component {
  handleChange = (markdown) => {
    this.setState({markdown})
  }

  render () {
    const {markdown} = this.state

    return (
      <Card>
        <CardTitle title='Live Preview' />
        <CardText>
          <MarkdownEditor disablePreview onChange={this.handleChange} defaultValue={markdown} />
          <Remarkable source={markdown} />
        </CardText>
      </Card>
    )
  }

  state = {
    markdown
  }
}

export default LivePreview
