import { io } from "socket.io-client";
import serverConfig from "./_data/ServerConfig";

const RequestSocketIOServer = () => {
    return io(`http://${serverConfig.hostname}:${serverConfig.port}` , {
        withCredentials: false,
        extraHeaders: {
          "my-custom-header": "abcd"
        } 
      });
}

export default RequestSocketIOServer;