import React from 'react';
import { Menu } from 'antd';
import '../../../less/app.less';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
    } = this.props;
    return (
      <div>
        <div className="title">
          <span
          >&nbsp;{title}</span>
        </div>
        <Menu
          className="menu"
          mode="horizontal"
          style={{ bottomBorder: '0', lineHeight: '70px' }}
          theme="dark"
        >
        </Menu>
      </div>
    );
  }}

Header.propTypes = {
  title: React.PropTypes.node,
};

export default Header;
