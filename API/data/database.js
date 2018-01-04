import low from 'lowdb';
import Memory from 'lowdb/adapters/Memory';
const data = require('../data/response.json');

const db = low(new Memory());
db
  .defaults({ elements: data.elements })
  .write();

const getElements = async () => {
  const query = db.get('elements');
  const chunk = query.value();
  const count = query.size().value();
  const nextOffset = '00240010065245504f525412001011c347a7223a4b6f8b26e492474873c1f07fffffe6f07fffffe6a3539452cd1fbcc586b66baa8f01a76c0004';

  return {
    size: count,
    nextOffset: nextOffset,
    elements: chunk
  }
};

const getElement = async (id) => {
  return db
    .get('elements')
    .find(element => element.id === id)
    .value();
};

const changeElementState = async (id, ticketState) => {
  return db
    .get('elements')
    .find(element => element.id === id)
    .assign({ state: ticketState })
    .write()
};

export {
  getElements,
  getElement,
  changeElementState
}