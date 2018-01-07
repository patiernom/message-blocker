import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  connectionFromPromisedArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  Ticket,
  getTickets,
  getTicket,
  changeTicketStatus,
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Ticket') {
      return getTicket(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Ticket) {
      return GraphQLTicket;
    }
    return null;
  }
);

const payloadType = new GraphQLObjectType({
  name: 'Payload',
  fields: () => ({
    source: { type: GraphQLString },
    message: { type: GraphQLString },
    reportType: { type: GraphQLString },
  })
});

const GraphQLTicket = new GraphQLObjectType({
  name: 'Ticket',
  fields: {
    id: globalIdField('Ticket'),
    realId: {
      type: GraphQLString,
      resolve: (obj) => obj.id,
    },
    source: {
      type: GraphQLString,
      resolve: (obj) => obj.text,
    },
    state: {
      type: GraphQLString,
      resolve: (obj) => obj.state,
    },
    payload: {
      type: payloadType,
      resolve: (obj) => obj.payload,
    },
    created: {
      type: GraphQLString,
      resolve: (obj) => obj.created,
    }
  },
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    tickets: {
      type: new GraphQLList(GraphQLTicket),
      resolve: async () => await getTickets(),
    },
    ticket: {
      type: GraphQLTicket,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (obj, {...args}) => await getTicket(args.id),
    },
    node: nodeField,
  },
});

const GraphQLChangeStatusTicketMutation = mutationWithClientMutationId({
  name: 'StatusTicket',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    ticket: {
      type: GraphQLTicket,
      resolve: async ({ localTicketId }) => {
        const ticket = await getTicket(localTicketId);
        return ticket;
      }
    },
  },
  mutateAndGetPayload: ( { id, status } ) => {
    const localTicketId = fromGlobalId(id).id;
    changeTicketStatus(localTicketId, status);
    return { localTicketId };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    changeStatusTicket: GraphQLChangeStatusTicketMutation
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
