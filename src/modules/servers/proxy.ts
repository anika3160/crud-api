import http from 'http';

let countOfReq:number = -1;

const createProxyServer = (PORT:number, numCPUs:number) => http.createServer((clientReq, clientRes) => {
    countOfReq++;
    const port: number = countOfReq % numCPUs + PORT + 1;
    console.log('Redirect request to port:', port);
    const options = {
        port,
        method: clientReq.method,
        path: clientReq.url,
        headers: {
            ...clientReq.headers,
            host: '127.0.0.1',
        }
    };
      
      const serverReq = http.request(options, (res) => {
        res.pipe(clientRes);
      });
    
      clientReq.pipe(serverReq);
})

export default createProxyServer;
