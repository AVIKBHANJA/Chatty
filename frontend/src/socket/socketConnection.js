import io from "socket.io-client";
import { BASE_URL } from "../utils/axios";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;

  socket = io(BASE_URL, {
    auth: {
      token: jwtToken,
    },
  });

  return socket;
};

export const sendDirectMessage = (data) => {
  // ? DATA FORMAT

  // const { message, conversationId } = data;
  // where message is 👇
  // const { author, content, media, audioUrl, documentUrl, type, giphyUrl } = message;

  socket.emit("new-message", data);
};

export const getDirectChatHistory = (data) => {
  // ? DATA FORMAT

  console.log(data, 'direct-chat-history');

  // const { conversationId } = data;

  socket.emit("direct-chat-history", data);
};

export const emitStartTyping = (data) => {
  // ? DATA FORMAT

  // const { userId, conversationId } = data;

  // This is the userId of the other participant in the conversation who should receive typing status

  socket.emit("start-typing", data);
};

export const emitStopTyping = (data) => {
  // ? DATA FORMAT

  // const { userId, conversationId } = data;

  // This is the userId of the other participant in the conversation who should receive typing status

  socket.emit("stop-typing", data);
};

export default socket;
