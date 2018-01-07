import {
  commitMutation,
  graphql,
} from 'react-relay';

const mutation = graphql`
  mutation changeStatusTicketMutation($input: StatusTicketInput!) {
    changeStatusTicket(input:$input) {
      ticket {
        id
        state
        payload {
          message
          source
        }
      }
    }
  }
`;

function getOptimisticResponse(status, ticket) {
  return {
    changeStatusTicket: {
      ticket: {
        id: ticket.id,
        state: status,
      },
    },
  };
}

function commit(
  environment,
  status,
  ticket
) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {status, id: ticket.id},
      },
      optimisticResponse: getOptimisticResponse(status, ticket),
    }
  );
}

export default {commit};
