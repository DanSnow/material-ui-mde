import React, {PropTypes, Component} from 'react'

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

const defaultActions = [{
  name: 'blod',
  action: 'wrap',
  text: '****',
  Icon: BoldIcon
}, {
  name: 'italic',
  action: 'wrap',
  text: '__',
  Icon: ItalicIcon
}, {
  name: 'bullted',
  action: 'append',
  text: '- ',
  Icon: BulletedIcon
}, {
  name: 'numbered',
  action: 'append',
  text: '1. ',
  Icon: NumberedIcon
}]

class MarkdownEditor extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.actions !== this.props.actions) {
      this.actions = this.processAction(nextProps.actions)
    }
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

  handleWrap = ({text}) => {
    this.appendOrWrapText(text)
  }

  handleAppend = ({text}) => {
    const {value} = this.state
    this.appendOrWrapText(value ? `\n${text}` : text)
  }

  handleAction = (event) => {
    const {name} = event.currentTarget
    const action = this.actions[name]
    action.handler(action)
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
    const selectedText = value.substr(start, end - start)
    const selectedBefore = value.substr(0, start)
    const selectedAfter = value.substr(end)
    this.setState({
      value: `${selectedBefore}${wrappedText}${selectedText}${wrappedText}${selectedAfter}`
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

  processAction() {
    return defaultActions
      .concat(this.props.actions)
      .reduce((actions, {name, text, action, Icon}) => {
        actions[name] = {
          name,
          text,
          Icon,
          handler: action === 'wrap' ? this.handleWrap : this.handleAppend
        }
        return actions
      }, {})
  }

  renderPreviewButton() {
    const {disablePreview} = this.props
    const {preview} = this.state

    if (disablePreview) {
      return null
    }

    return (
      <ToolbarGroup firstChild>
        <FlatButton
          icon={<EditIcon />}
          secondary={!preview}
          label={preview ? 'Preview' : 'Edit'}
          onTouchTap={this.handlePreviewToggle} />
      </ToolbarGroup>
    )
  }

  render() {
    const {
      disablePreview,
      hintText,
      renderMarkdown,
      rows,
      title,
      previewPlaceHolder,
      previewStyle
    } = this.props
    const {preview, actions, value} = this.state
    return (
      <div>
        <Toolbar>
          {this.renderPreviewButton()}
          <ToolbarGroup lastChild>
            <ToolbarTitle text={title} />
            {
              actions.map((name) => this.actions[name]).map(({name, Icon}) => (
                <IconButton
                  key={name}
                  name={name}
                  disabled={preview}
                  onTouchTap={this.handleAction} >
                  <Icon />
                </IconButton>
              ))
            }
          </ToolbarGroup>
        </Toolbar>
        {
          !disablePreview && preview ? (
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

  actions = this.processAction()

  state = {
    preview: false,
    value: this.props.defaultValue,
    actions: defaultActions.concat(this.props.actions).map((config) => config.name)
  }

  static propTypes = {
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        text: PropTypes.oneOf(['wrap', 'append']).isRequired,
        Icon: PropTypes.element.isRequired
      })
    ).isRequired,
    defaultValue: PropTypes.string.isRequired,
    disablePreview: PropTypes.bool.isRequired,
    hintText: PropTypes.string.isRequired,
    previewPlaceHolder: PropTypes.string.isRequired,
    previewStyle: PropTypes.object,
    rows: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    renderMarkdown: PropTypes.func.isRequired
  }

  static defaultProps = {
    actions: [],
    defaultValue: '',
    disablePreview: false,
    hintText: 'Input here',
    previewPlaceHolder: 'Nothing to preview',
    previewStyle: {
      height: '15em'
    },
    rows: 10,
    title: 'Markdown Editor',
    renderMarkdown
  }
}

export default MarkdownEditor
