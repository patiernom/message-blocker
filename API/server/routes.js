import {
  getElements,
  getElement,
  changeElementState
} from '../data/database';

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    reply.send({data: 'no data for this route'});
  });

  fastify.get('/tickets', async (request, reply) => {
    const data = await getElements();

    reply.send(data);
  });

  fastify.get('/ticket/:ticketId', async (request, reply) => {
    const ticketId = request.params.ticketId;
    const data = await getElement(ticketId);

    reply.send(data);
  });

  fastify.put('/ticket/:ticketId', async (request, reply) => {
    const ticketId = request.params.ticketId;
    const payload = request.body;
    const response = await changeElementState(ticketId, payload.ticketState);

    if (response.id) {
      reply.send(response)
    } else {
      reply
        .code(404)
        .send({ message: 'ticket not found' })
    }
  });
}

export default routes;