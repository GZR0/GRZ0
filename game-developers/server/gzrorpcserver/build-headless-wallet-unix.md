# Install a headless Gravity GZRO wallet on Unix / Linux

_(Validated on Linux Ubuntu 18.04.1 64bit)_


**Prerequirements:**
	Ubuntu or compatible flavored Linux server with root access.
	Cloned GZRO github repository in your preffered folder (git clone http://github.com/GZR0/GRZ0)
  
  Follow all steps to create a headless Gravity GZRO server. If you want to, you can use a previously exported wallet by replacing the `wallet.dat` file in the `.gravity` folder. The Gravity GZRO server needs access to the Internet on port 8333 for communication to other nodes. If you want to accesss the server through RPC, you need to open port 8332 (TCP) too. Be aware: Offering outside access to RPC will expose your server to outside brute-force attacks. You'll probably want to setup your application inside the same network (or even on the same server) and keep all direct communications to the Gravity GZRO server off the Internet.
  
  For readability, we assume that you cloned the GZRO repository in your homedir. If you prefer a different location, adjust the path references (~/GZR0) accordingly.
  
  By default, the data files are stored in ~/.gravity. If you want to use a different directory for your datafiles, indicate at startup by using the datadir argument (./gravityd -datadir=<path).

1. Install all updates.

	`sudo apt-get update && sudo apt-get upgrade` 

2. Install general dependencies.

	`sudo apt-get install git build-essential libtool autotools-dev autoconf pkg-config libssl-dev libcrypto++-dev libevent-dev libminiupnpc-dev libgmp-dev libboost-all-dev devscripts libdb++-dev libsodium-dev`
	
3. Install QT dependencies.

	 `sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler libcrypto++-dev libminiupnpc-dev qt5-default`

4. Install the Bitcoin PPA files, we need these for compiling the code. You need to create and edit a file in your sources.list.d folder. The following commands will get that done.

	`cd /etc/apt/sources.list.d/`
	
	`sudo nano bitcoin.list`

5. Nano editor is now open, editting the file bitcoin.list. You need to add the following line to this file.

	`deb-src http://ppa.launchpad.net/bitcoin/bitcoin/ubuntu artful main`

6. Close nano editor by pressing CTRL+X and "Y" to confirm the write operation.

7. Now, download the public key for the PPA packages. This way, the system verifies the packages have not been tampered with.

	`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv C70EF1F0305A1ADB9986DBD8D46F45428842CE5E`

8. Run the apt-get update tool.

	`sudo apt-get update`

9. Now, download the GZRO Gravity source code into a folder. Note the spelling of the github-link! Suggestion: Put the source code in the current user's home directory for future reference.

	`cd ~`
	
	`git clone https://github.com/GZR0/GRZ0.git`

10. You need a specific version of libssl-dev. Issue a dpkg command to determine your current libssl-dev.

	`sudo dpkg -l | grep libssl`

11. If your libssl-dev version is later than 1.0, then remove it and install a 1.0 version, using the commands below. If your current installation is 1.0, then proceed with step 12.
	
	`sudo apt-get remove libssl-dev`
	
	`sudo apt-get install libssl1.0-dev`
	
12. If you want to install Gravity GZRO wallet including GUI, then issue the qmake and make command to install the wallet. Building the wallet application might take a while (depending on your CPU, up to one hour). You might also see a few non-critical warnings during the install. Don't worry about them, the Gravity GZRO Development team is working on a fix. If you want to skip this and only need the Gravity GZRO headless server (daemon), then proceed with step 15. 

	`cd ~/GRZ0`
	
	`sudo qmake && sudo make` 
	
13. This completes the installation of the Gravity GZRO Wallet, including GUI. You can verify the install by starting the wallet application. That will also create the database and other application data in your home folder (~\.gravity).

	`./gravity-qt`

14. If you want to use a previously exported wallet, you can now copy and overwrite the `wallet.dat` file in the `.gravity` folder.

15. Change to the /src folder and issue the make-command to build the headless Gravity GZRO wallet. You might see a few non-critical warnings during the install. Don't worry about them, the Gravity GZRO Development team is working on a fix. 

	`cd ~/GZR0/src`
	
	`sudo make -f makefile.unix`
	
16. Start the server.

	`./gravityd`
	
17. The Gravity GZRO daemon will present a rpc username and random password for you to use in the configuration file. 
	
	`nano ~/.gravity/gravity.conf`
	
	paste the username and password and press CTRL+X followed by Y to write and close the file. Then, remove the write rights on the file.
	
	`chmod -w ~/.gravity/gravity.conf`
	
18. Start the server.

	`./gravityd`

19. Open a different terminal and issue a command to check the status of the server.

	`./gravityd getinfo`
	
	The output should be something like:
	
	```
	{
    "version" : "v1.0.0.0",
    "protocolversion" : 60013,
    "walletversion" : 60000,
    "balance" : 0.00000000,
    "newmint" : 0.00000000,
    "stake" : 0.00000000,
    "blocks" : 1425,
    "timeoffset" : 0,
    "moneysupply" : 2072705207.47802973,
    "connections" : 2,
    "proxy" : "",
    "ip" : "<your IP address>",
    "difficulty" : {
        "proof-of-work" : 0.00024414,
        "proof-of-stake" : 0.15059147
    },
    "testnet" : false,
    "keypoololdest" : 1558815419,
    "keypoolsize" : 101,
    "paytxfee" : 0.00010000,
    "mininput" : 0.00000000,
    "errors" : ""
	}
	```

20. Congratulations, your server is now up and running. Good luck on building your Gravity GZRO app!
