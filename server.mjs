import { createServer } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// Read port from environment variable, default to 9002
const port = parseInt(process.env.PORT, 10) || 9002;

(async () => {
  const server = await createServer({
    // any vite config options, e.g. plugins
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(new URL(import.meta.url).pathname, '../src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: port,
      // We can ignore other CLI flags here
    },
    // We explicitly set the root to the current directory
    root: process.cwd(),
  });

  await server.listen();

  server.printUrls();
})();
