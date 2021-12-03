const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');
const { exit } = require('process');

const provider = new HDWalletProvider(
    'goose bracket daring cheap exact titel simple inhale found sieg sad result',
    'https://rinkeby.infura.io/v3/6ae83127b187497a88aab0b136df12f8'
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname,'bin','EducToken.abi');
const abi = fs.readFileSync(abiPath,'utf8');

const bytecodePath = path.resolve(__dirname,'bin','EducToken.bin');
const bytecode = fs.readFileSync(bytecodePath,'utf8');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploye from account ',accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({data: bytecode})
    .send({from: accounts[0],gas: '1000000'});
    console.log("Contract deployed to ", result.options.address);
    exit(0);
}
deploy();