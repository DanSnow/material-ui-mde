import React from 'react'
import Card from 'material-ui/Card/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import MarkdownEditor from 'material-ui-mde'

const content = `\
material-ui-mde
===============

MarkdownEditor build on material-ui
`

function Basic() {
  return (
    <Card>
      <CardTitle title='Basic Example' />
      <CardText>
        <MarkdownEditor defaultValue={content} />
      </CardText>
    </Card>
  )
}

export default Basic
