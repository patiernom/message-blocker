import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import TicketApp from './TicketApp';

export default createFragmentContainer(TicketApp, {
  tickets: graphql`
      fragment TicketAppContainer_tickets on Ticket @relay(plural:true) {
          ...TicketsContainer_tickets
      }
  `,
});