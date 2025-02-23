export const rooms = [];
import { subjectWords } from "./words.js";
import { users } from "./users.js";

export function roomJoin(id, room, type) {
  const data = { id, room, type};

  rooms.push(data);

  return room;
}

export function verifyWordSelected(data){
  let currentRoom = getCurrentRooms(data.idRoom);
  return data.message == currentRoom[0].currentWord ? "right" : "wrong";
}

export function getCurrentRooms(id = null) {
  let currentRooms = [];

  if(id){
    return rooms.filter(room => room.id === id)[0];
  }

  rooms.forEach(room => {
    let quantity = users.filter(user => user.room === room.room).length;

    let data = {
      id: room.id,
      room: room.room,
      type: room.type,
      currentWord: room.currentWord,
      quantity: quantity
    }

    currentRooms.push(data);
  });

  return currentRooms;
}

export function deleteEmptyRooms(id){
  let data = users.find(user => user.room === id);

  if(!data){
    let index = rooms.findIndex(item => item.room === id);

    if (index !== -1) {
      rooms.splice(index, 1)[0];
    }
  }
}

export function setWordRoom(id){
  let wordSelected;
  let currentRoom = rooms.filter(room => room.room === id)[0];

  if(currentRoom){
    wordSelected = generateWord(currentRoom.type);
    currentRoom.currentWord = wordSelected;
  }

  return wordSelected;
}

const generateWord = (type) => {
  let nameTypeRoom = type.toLowerCase();
  let typeRoom = subjectWords[nameTypeRoom];
  let size = typeRoom.length - 1;
  let numberRandom = Math.floor(Math.random() * (size - 0));
  
  return typeRoom[numberRandom];
}