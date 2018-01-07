import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:9000/';

class Ticket {
  constructor(id, state, payload, created) {
    this.source = id;
    this.state = state;
    this.payload = payload;
    this.created = created;
  }
}

const fetchRequest = async (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      return json;
    });
};

const getTickets = async () => {
  return await fetchRequest('tickets').then(json => json.elements);
};

const getTicket = async (id) => {
  return await fetchRequest(`ticket/${id}`).then(json => json);
};

const changeTicketStatus = async (id, status) => {
  const data = { "ticketState" : status };
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  return await fetchRequest(`ticket/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: headers}).then(json => json);
};

export {
  Ticket,
  getTickets,
  getTicket,
  changeTicketStatus,
};
