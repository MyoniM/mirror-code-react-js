import { io } from "socket.io-client";
import { devBackendApi, prodBackendApi } from "../constants/baseUrl";

const initSocket = () => io(prodBackendApi);

export default initSocket;
