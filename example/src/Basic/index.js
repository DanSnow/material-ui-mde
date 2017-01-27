import React from 'react'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import MarkdownEditor from 'material-ui-mde'

function Basic() {
  return (
    <Card>
      <CardTitle title='Example for material-ui-mde' />
      <CardText>
        <MarkdownEditor />
      </CardText>
    </Card>
  )
}

export default Basic
