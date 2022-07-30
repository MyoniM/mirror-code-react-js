import { io } from "socket.io-client";

const URL = "http://localhost:8080";
const initSocket = () => io(URL);

export default initSocket;
