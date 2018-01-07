import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import React from 'react';
import ReactDOM from 'react-dom';
import { installRelayDevTools } from 'relay-devtools';
import modernEnvironment from './Environment';
import TicketsApp from './components/TicketApp/TicketAppContainer';

// Useful for debugging, but remember to remove for a production deploy.
// installRelayDevTools();

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query appQuery {
        tickets {
          ...TicketAppContainer_tickets
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <TicketsApp tickets={props.tickets} />;
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  rootNode
);
