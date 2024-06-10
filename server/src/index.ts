// Local Imports
import { Server } from './server';

/**
 * Starts the server.
 * 
 * @returns {void}
 */
const main = (): void => {
  const server = new Server();
  server.start();
};

main();
