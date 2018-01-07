import { createFragmentContainer, graphql } from 'react-relay';
import Ticket from './Ticket';

export default createFragmentContainer(Ticket, {
  ticket: graphql`
      fragment TicketContainer_ticket on Ticket {
          id
          realId
          state
          created
          payload {
              message
              reportType
          }
      }
  `,
});