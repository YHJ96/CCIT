import React, { Component } from 'react';

class Checkbox extends Component {

  constructor(props){
    super(props)
    this.state = {
      isChecked: false,
    }
  }

  toggleCheckboxChange = () => {
    const { toggleCheckbox } = this.props;
      this.setState(({isChecked}) => ({
        isChecked: !isChecked,
      }))
      toggleCheckbox();
  }

  render() {
    const { isChecked } = this.state;
    return (
      <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
            />
      </div>
    );
  }
}

export default Checkbox;