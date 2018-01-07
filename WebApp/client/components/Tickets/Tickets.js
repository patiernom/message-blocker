import React from 'react';
import PropTypes from 'prop-types';
import { List, Grid, Cell } from 'react-mdl';
import Ticket from '../Ticket/TicketContainer';
import styles from './Tickets.scss';

class Tickets extends React.Component {
  renderTickets() {
    return this.props.tickets.map(ticket =>
      <Ticket
        key={`${ticket.id}`}
        ticket={ticket}
      />
    );
  }
  render() {
    return (
      <section className={styles.root}>
        <Grid>
          <Cell col={12}>
            <List>
              {this.renderTickets()}
            </List>
          </Cell>
        </Grid>
      </section>
    );
  }
}

Tickets.propTypes = {
  tickets: PropTypes.array.isRequired
};

Tickets.defaultProps = {};

export default Tickets;
