var serviceServerConfig: {
    fsuipc: {
        name: string,
        hostname: string,
        port:  number,
    },
    phidgets: {
        hostname: string,
        port:  number,
    },
} = {
    fsuipc:  {
        name: "fsuipc",
        hostname: "localhost",
        port:  2048,
    },
    phidgets: {
        hostname: "localhost",
        port:  5661,
    },
};

export default serviceServerConfig;