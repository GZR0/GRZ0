Copyright (C) 2019 - Gravity GZRO Developers

# Server API Readme.md

## Installation
1. Install nodejs with `sudo apt-get install nodejs`
2. Copy the contents of this directory to your server (for instance, in /opt/GZRO-api) and move into that directory.
3. Run `sudo npm install` to install all dependencies.
4. Change the configuration in apiserver.js to reflect your RPC server setup. If you don't have your GZRO RPC server running yet, follow the steps in the file `build-headless-wallet-unix.md`. You can find this in the doc section of the Github repository.
5. To start the server, use `node apiserver.js`.
6. If you want to start the api-server automatically, follow these steps;
7. Check the `gzroapi.service` file and change paths to reflect your server configuration.
8. Copy the gzroapi.service file to your /etc/systemd/system directory.
9. Run `systemctl start gzroapi` to run your api server.
10. Use `systemctl enable gzroapi` to enable automatic start on server boot.

## Configuration of traffic
It is highly recommended to run this apiserver on the same node as your Gravity GZRO RPC server. That way, your RPC connection string (which includes the rpc password) is not sent over the Internet. You can use an applcation like nginx to direct the traffic on your server.