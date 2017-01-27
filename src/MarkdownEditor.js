import React, {PropTypes, Component} from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'

import Toolbar from 'material-ui/Toolbar/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'
import BoldIcon from 'material-ui/svg-icons/editor/format-bold'
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic'
import BulletedIcon from 'material-ui/svg-icons/editor/format-list-bulleted'
import NumberedIcon from 'material-ui/svg-icons/editor/format-list-numbered'

const renderMarkdown = (text) => {
  const Remarkable = require('react-remarkable')
  return (
    <Remarkable source={text} />
  )
}

class MarkdownEditor extends Component {
  shouldComponentUpdate(_nextProps, nextState) {
    return !shallowEqual(this.state, nextState)
  }

  handlePreviewToggle = () => {
    this.setState({preview: !this.state.preview})
  }

  getTextField = (textField) => {
    this.textField = textField
  }

  handleSelect = (event) => {
    this.selectionStart = event.target.selectionStart
    this.selectionEnd = event.target.selectionEnd
  }

  handleBold = () => {
    this.appendOrWrapText('****')
  }

  handleItalic = () => {
    this.appendOrWrapText('__')
  }

  handleBulleted = () => {
    const {value} = this.state
    this.appendText(value ? '\n- ' : '- ')
  }

  handleNumbered = () => {
    const {value} = this.state
    this.appendText(value ? '\n1. ' : '1. ')
  }

  appendOrWrapText(addText) {
    if (this.isSelection()) {
      this.wrapText(addText)
    } else {
      this.appendTextAndMoveCursor(addText)
    }
  }

  wrapText(wrappedText) {
    wrappedText = wrappedText.substr(0, wrappedText.length / 2)
    const start = this.selectionStart
    const end = this.selectionEnd
    const {value} = this.state
    const selectedText = value.substr(start, end)
    const selectedBefore = value.substr(0, start)
    const selectedEnd = value.substr(end)
    this.setState({
      value: `${selectedBefore}${wrappedText}${selectedText}${wrappedText}${selectedEnd}`
    }, () => {
      this.moveCursor(end + wrappedText.length)
    })
  }

  appendTextAndMoveCursor(appendText) {
    const {value} = this.state
    this.setState({value: `${value}${appendText}`}, () => {
      this.moveCursorBack(appendText.length / 2)
    })
  }

  appendText(appendText) {
    const {value} = this.state
    this.setState({value: `${value}${appendText}`}, () => {
      this.moveCursorBack(0)
    })
  }

  moveCursorBack(count) {
    const {value} = this.state
    this.moveCursor(value.length - count)
  }

  moveCursor(pos) {
    const {preview} = this.state
    if (preview) {
      return
    }

    this.textField.getInputNode().setSelectionRange(pos, pos)
    this.textField.focus()
  }

  isSelection() {
    if (typeof this.selectionStart === 'undefined') {
      return false
    }
    return this.selectionStart !== this.selectedEnd
  }

  handleChange = (event) => {
    const {onChange} = this.props
    const {value} = event.target
    this.setState({
      value
    })

    if (onChange) {
      onChange(value)
    }
  }

  render() {
    const {hintText, renderMarkdown, rows, previewPlaceHolder, previewStyle} = this.props
    const {preview, value} = this.state
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <FlatButton
              icon={<EditIcon />}
              secondary={!preview}
              label={preview ? 'Preview' : 'Edit'}
              onTouchTap={this.handlePreviewToggle} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle>
              Markdown Editor
            </ToolbarTitle>
            <IconButton
              disabled={preview}
              onTouchTap={this.handleBold}>
              <BoldIcon />
            </IconButton>
            <IconButton
              disabled={preview}
              onTouchTap={this.handleItalic}>
              <ItalicIcon />
            </IconButton>
            <IconButton
              disabled={preview}
              onTouchTap={this.handleBulleted}>
              <BulletedIcon />
            </IconButton>
            <IconButton
              disabled={preview}
              onTouchTap={this.handleNumbered}>
              <NumberedIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        {
          preview ? (
            <div style={previewStyle}>
              {renderMarkdown(value || previewPlaceHolder)}
            </div>
          ) : (
            <TextField
              ref={this.getTextField}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
              value={value}
              multiLine
              rows={rows}
              hintText={hintText}
              fullWidth />
          )
        }
      </div>
    )
  }

  state = {
    preview: false,
    value: this.props.defaultValue
  }

  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    hintText: PropTypes.string.isRequired,
    previewPlaceHolder: PropTypes.string.isRequired,
    previewStyle: PropTypes.object,
    rows: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    renderMarkdown: PropTypes.func.isRequired
  }

  static defaultProps = {
    defaultValue: '',
    hintText: 'Input here',
    previewPlaceHolder: 'Nothing to preview',
    previewStyle: {
      height: '15em'
    },
    rows: 10,
    renderMarkdown
  }
}

export default MarkdownEditor
