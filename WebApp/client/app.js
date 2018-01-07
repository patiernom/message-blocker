import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import React from 'react';
import ReactDOM from 'react-dom';
import { installRelayDevTools } from 'relay-devtools';

// Useful for debugging, but remember to remove for a production deploy.
// installRelayDevTools();

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render(<div>Loading</div>, rootNode);
