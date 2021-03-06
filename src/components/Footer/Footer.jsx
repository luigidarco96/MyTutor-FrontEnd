/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer
        className='footer custom-footer'
      >
        <p className='copyright' style={{ color: '#FFFFFF', margin: 0 }}>
          &copy; {new Date().getFullYear()}{' '}
          <a href='/' style={{ color: '#FFFFFF' }}>
            MyTutor
          </a>
        </p>
      </footer>
    );
  }
}

export default Footer;
