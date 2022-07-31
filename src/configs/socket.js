import { io } from "socket.io-client";

const URL = "https://stormy-ocean-56729.herokuapp.com";
const initSocket = () => io(URL);

export default initSocket;
