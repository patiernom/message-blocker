import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import { ListItem, ListItemContent, Button, Grid, Cell, Card, CardText, CardActions } from 'react-mdl';
import 'react-mdl/extra/material';
import changeStatusTicketMutation from '../../mutations/changeStatusTicketMutation';
import styles from './Ticket.scss';

const isBlocked = state => state === 'BLOCKED';
const isClosed = state => state === 'CLOSED';

class Ticket extends React.Component {
  onBlockClick = () => {
    changeStatusTicketMutation.commit(
      this.props.relay.environment,
      "BLOCKED",
      this.props.ticket,
    );
  };

  onResolveClick = () => {
    changeStatusTicketMutation.commit(
      this.props.relay.environment,
      "CLOSED",
      this.props.ticket,
    );
  };

  render() {
    return (
      <ListItem className={styles.root} key={this.props.ticket.id}>
        <ListItemContent>
          <Card shadow={0} className={classnames({blocked: isBlocked(this.props.ticket.state), closed: isClosed(this.props.ticket.state) })}>
            <CardText>
              <Grid>
                <Cell col={6} className={'field'}>
                  <span className={'label'}>Id:</span>
                  <div className={'id'}>{this.props.ticket.realId}</div>
                </Cell>
                <Cell col={6} className={'field'}>
                  <span className={'label'}>Type:</span>
                  {this.props.ticket.payload.reportType}
                </Cell>
                <Cell col={6} className={'field'}>
                  <span className={'label'}>State:</span>
                  {this.props.ticket.state}
                </Cell>
                <Cell col={6} className={'field'}>
                  <span className={'label'}>Message:</span>
                  <span className={'message'}>{`${this.props.ticket.payload.message}`}</span>
                </Cell>
                <Cell col={6} className={'field'}>
                  <a href={'#detail'}>Details</a>
                </Cell>
                <Cell col={6} className={'time'}>
                  <span className={'label'}>Created:</span>
                  {moment(this.props.ticket.created).format('MMMM Do YYYY, h:mm:ss a')}
                </Cell>
              </Grid>
            </CardText>
            <CardActions border>
              <Button disabled={isBlocked(this.props.ticket.state)} raised accent onClick={this.onBlockClick}>Block</Button>
              <Button disabled={isClosed(this.props.ticket.state)} raised colored onClick={this.onResolveClick}>Resolve</Button>
            </CardActions>
          </Card>
        </ListItemContent>
      </ListItem>
    );
  }
}

Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired
};

Ticket.defaultProps = {};

export default Ticket;
