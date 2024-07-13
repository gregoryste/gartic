export const users = [];
import { rooms, deleteEmptyRooms } from "./rooms.js"

export function userJoin(id, username, room) {
  let editor = users.length >= 1 ? false : true;
  const user = {id, username, room, editor: editor};

  users.push(user);

  return user;
}

export function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

export function getCurrentUserEditor(idRoom){
  return users.find(user => user.room === idRoom && user.editor === true);
}

export function userLeave(id) {
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

export function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}
