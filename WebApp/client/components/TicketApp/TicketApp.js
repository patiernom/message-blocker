import React from 'react';
import PropTypes from 'prop-types';
import { Content } from 'react-mdl';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import 'react-mdl/extra/material';
import Tickets from '../Tickets/TicketsContainer';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './App.scss';

class TicketApp extends React.Component {
  render() {
    const hasTickets = this.props.tickets.length > 0;
    const ticketsCount = this.props.tickets.length;
    const title = 'Message Blocker';

    return (
      <div className={styles.root}>
        <Navbar title={title} ticketsCount={ticketsCount}>
          <Content>
            <div className={styles.content}>
              {hasTickets &&
                <Tickets tickets={this.props.tickets}/>
              }
            </div>
          </Content>
          <Footer />
        </Navbar>
      </div>
    );
  }
}

TicketApp.propTypes = {
  tickets: PropTypes.array.isRequired,
  relay: PropTypes.object.isRequired
};

TicketApp.defaultProps = {};

export default TicketApp;
