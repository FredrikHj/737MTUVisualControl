import { io } from "socket.io-client";
import serverConfig from "./_data/ServerConfig";

const RequestMTUServer = () => {
    return io(`http://${serverConfig.hostname}:${serverConfig.port}` , {
        withCredentials: false,
        extraHeaders: {
          "my-custom-header": "abcd"
        } 
      });
}

export default RequestMTUServer;