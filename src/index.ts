#!/usr/bin/env node

import server from './server';
// run the server
(async () => {
  try {
    await server.listen({ port: 8080, host: '0.0.0.0' });
    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
    server.log.info(`server listening on ${port}`);
  } catch (error) {
    console.log('error', error);
    // console.trace(JSON.stringify(error, null, 2));
    process.exit(1);
  }
})();
