var generalTexts: {
    services: {
        fsuipc: string,
        phidgets: string,
    },
    conStates: { 
        headline: string,
        fsuipc: {
            webService: {
                notStarted: string,
                serviceLoading: string,
                started: string, 
                closed: string,
            },
            programError: string,
        },
        phidgets: {
            webService: {
                notStarted: string,
                serviceLoading: string,
                started: string, 
                closed: string,
            },
            programError: string,
        },
    },
    conButton: {
        connect: string, 
        disconnect: string,
    },
    mixedTexts: {
        noData: string,
        noInfo: string,
    }
} = {
    services: {
        fsuipc: "fsuipc",
        phidgets: "phidgets",
    },
    conStates: {
        headline: "Connenction Status",
        fsuipc: {
            webService: {
                notStarted: "Service Not Started",
                serviceLoading: "Service Is ",
                started: "Service Started",
                closed: "Connection Closed",
            },
            programError: "Scanning Network",            
        },
        phidgets: {
            webService: {
                notStarted: "Service Not Started",
                serviceLoading: "Service Is ",
                started: "Service Started",
                closed: "Connection Closed",
            },
            programError: "Scanning Network",            
        },
    },
    conButton: {
        connect: "Connect", 
        disconnect: "Disconnect",
    },
    mixedTexts: {
        noData: "No Data",
        noInfo: "No Info",
    }
};

export default generalTexts;