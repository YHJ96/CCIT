import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class MarketCheckBox extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props)
    const { cookies } = props
    this.index = props.index;
    this.state = {
      isChecked: false || cookies.get(`${this.index}check`, {doNotParse : false})
    }
  }

  toggleCheckboxChange = () => {
    const { toggleCheckbox } = this.props;
    const { cookies } = this.props;

      this.setState(({isChecked}) => ({
        isChecked: !isChecked,
      }),()=>{
        cookies.set(`${this.index}check`, this.state.isChecked, {path : '/'})
      })
      toggleCheckbox();
  }

  render() {
    return (
      <div>
          <input
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.toggleCheckboxChange}
            />
      </div>
    );
  }
}

export default withCookies(MarketCheckBox);