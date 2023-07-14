import React from 'react';
import './TaskFilterElement.css';
import PropTypes from 'prop-types';

class TaskFilterElement extends React.Component {
  render() {
    let addClass = '';
    if (this.props.isSelected) {
      addClass += 'selected';
    }

    return (
      <li>
        <button type="button" className={addClass} onClick={this.props.selectedButton}>
          {this.props.value}
        </button>
      </li>
    );
  }
}

TaskFilterElement.defaultProps = {
  isSelected: false,
  selectedButton: () => {},
  value: 'Button',
};
TaskFilterElement.propTypes = {
  isSelected: PropTypes.bool,
  selectedButton: PropTypes.func,
  value: PropTypes.string,
};

export default TaskFilterElement;
