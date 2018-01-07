import React from 'react';
import PropTypes from 'prop-types';
import { Footer as MDLFooter, FooterSection } from 'react-mdl';
import styles from './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <MDLFooter className={styles.root} size='mini'>
        <FooterSection type='middle'>
          <span>Handcrafted with ♥ by <a href='https://github.com/patiernom' target='_blank' rel='noopener noreferrer'>patiernom</a></span>
        </FooterSection>
      </MDLFooter>
    );
  }
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
