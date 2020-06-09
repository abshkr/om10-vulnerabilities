import React from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'

const CustomReactSelectOption = createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
  },
  handleMouseUp(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  },
  handleMouseEnter(event) {
    this.props.onFocus(this.props.option, event)
  },
  handleMouseMove(event) {
    if (this.props.isFocused) return
    this.props.onFocus(this.props.option, event)
  },
  render() {
    return (
      <div
        className={this.props.className}
        onMouseUp={this.handleMouseUp} // Mouse Up instead of Mouse Down
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}
        role="listitem"
      >
        {this.props.children}
      </div>
    )
  },
})

export default CustomReactSelectOption
