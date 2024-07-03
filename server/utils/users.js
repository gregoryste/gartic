const moment = require('moment');
const users = [];
const rooms = [];

function userJoin(id, username, room) {
  let editor = users.length >= 1 ? false : true;
  const user = {id, username, room, editor: editor};

  users.push(user);

  return user;
}

function roomJoin(id, room, type) {
  const data = { id, room, type};

  rooms.push(data);

  return room;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  let currentUser = users.find(user => user.id === id);

  if (index !== -1) {
    users.splice(index, 1)[0];
  }

  if(currentUser){
    deleteEmptyRooms(currentUser.room);
  }

  return currentUser;
}

function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

function getCurrentRooms() {
  let currentRooms = [];

  rooms.forEach(room => {
    let quantity = users.filter(user => user.room === room.room).length;

    let data = {
      id: room.id,
      room: room.room,
      type: room.type,
      quantity: quantity
    }

    currentRooms.push(data);
  });

  return currentRooms;
}

function deleteEmptyRooms(id){
  let data = users.find(user => user.room === id);

  if(!data){
    let index = rooms.findIndex(item => item.room === id);

    if (index !== -1) {
      rooms.splice(index, 1)[0];
    }
  }
}

function setEditorUser(room, index){
  let userRooms = getRoomUsers(room);

  userRooms[index].editor = true
}

module.exports = {
  userJoin,
  roomJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getCurrentRooms,
  setEditorUser
};