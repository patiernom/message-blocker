import React from 'react';
import PropTypes from 'prop-types';
import { Header, Navigation, Drawer, Layout, Icon } from 'react-mdl';
import styles from './Navbar.scss';

class Navbar extends React.Component {
  render() {
    const { title, ticketsCount, children } = this.props;

    return (
      <div className={styles.root}>
        <Layout fixedHeader>
          <Header title={title} >
            <div className='ticketsCount'><span><Icon name='event' /> {ticketsCount}</span></div>
          </Header>
          <Drawer title={title}>
            <Navigation>
              <a href='https://github.com/patiernom/message-blocker' target='_blank' rel='noopener noreferrer'>Help</a>
            </Navigation>
          </Drawer>
          {children}
        </Layout>
      </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  ticketsCount: PropTypes.number,
  children: PropTypes.node.isRequired
};

Navbar.defaultProps = {
  title: '',
  ticketsCount: 0
};

export default Navbar;
