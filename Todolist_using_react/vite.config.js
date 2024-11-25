import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import detect from 'detect-port';


const DEFAULT_PORTS = [ 3000, 4000,5174];

export default async () => {
  const availablePort = await findAvailablePort(DEFAULT_PORTS);

  return defineConfig({
    plugins: [react()],
    server: {
      port: availablePort,
    },
  });
};

async function findAvailablePort(ports) {
  for (const port of ports) {
    const availablePort = await detect(port);
    if (availablePort === port) {
      return port;
    }
  }
  console.error('No available ports found!');
  process.exit(1);
}
