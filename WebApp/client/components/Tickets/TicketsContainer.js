import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import Tickets from './Tickets';

export default createFragmentContainer(Tickets, {
  tickets: graphql`
      fragment TicketsContainer_tickets on Ticket @relay(plural:true) {
          id
          realId
          state
          created
          payload {
              message
              reportType
          }
          ...TicketContainer_ticket
      }
  `,
});