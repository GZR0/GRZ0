// GZRO Gravity example api Javascript.
// Copyricht (C) 2019 - Gravity GZRO Developers

// Feel free to use this example for implementation in your
// own games. If you have any questions or suggestions,
// please join our community on Telegram or Discord.
// We are currently (2019) in the process of setting up
// other support channels and communities for game developers.

// Set variables to reflect your setup. On our Github repo
// you can find how to set up your Gravity GZRO RPC server /
// headless wallet. We strongly suggest to run the RPC server
// on the same host as the api, so you won't send any Gravity
// RPC traffic over the network.

// Path to your Gravity GZRO RPC server (gravityd) 
var rpcpath = 'localhost';
// Portnumber for your Gravity GZRO RPC server
var rpcport = '8332';
// Username for your Gravity GZRO RPC server
var rpcuser = '<YOUR RPCUSER>';
// Password for your Gravity GZRO RPC server
var rpcpass = '<YOUR RPCPASSWORD>';
// Portnumber for this API nodejs server
var apiport = '3000';


// End of Gravity GZRO variables setup.

var rpcconnectstring = 'http://' + rpcuser + ":" + rpcpass + "@" + rpcpath + ":" + rpcport;
var srpcconnectstring = 's' + rpcconnectstring;

// Variables needed to run the api.
var express = require("express");
var app = express();
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies


// Variables specific to our implementation.
const BitcoinRpc = require('bitcoin-rpc-promise');
let btc = new BitcoinRpc(rpcconnectstring);


// API endpoints, add your specific implementations here.
app.get("/test", (req, res, next) => {
	// TODO: Implement test-routines to check rpc server
	// and report back status (connection, sync status,
	// balance, accounts list, balance per account.)
});

app.get("/docs", (req, res, next) => {

});

app.post("/getaddressesbyaccount", (req, res, next) => {
    btc.getaddressesbyaccount(req.body.account).then(result => {
  	console.log(result);
  	var addresses = result;
  	res.statusCode = 200;
	res.json (addresses);
	res.end;
	});

	// TODO: Implement error handling
});

app.post("/getbalance", (req, res, next) => {
    btc.getbalance(req.body.account).then(result => {
 
  	var balance = result;
  	res.statusCode = 200;
	res.json (balance);
	res.end;
	});

	// TODO: Implement error handling
});

app.get("/getinfo", (req, res, next) => {

	btc.getinfo().then(result => {
		// console.log(result);
		res.send(result);
	});
});

// Payment example. Don't make this too flexible, as you
// don't want people to be able to use this api outside of
// your specific use case.
// TODO: Implement Authorization over SSL to use the api.

app.get("/pay1gzro", (req, res, next) => {
	btc.sendtoaddress('GfqGaVyBMUgMwjLQrck3x2VK514R7dmrMt', 1);

	// TODO: Implement result (txID).

	res.json("Payment: done");
});

// Start the actual server
// TODO: Flexibilize using var portnumber
app.listen(apiport, () => {
 console.log("Server running on port " + apiport);
});