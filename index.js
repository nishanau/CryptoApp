const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
app.use(express.json())
app.use(cors())

app.use(express.static('build'))
const axios = require('axios');
const path = require('path');
//const bip39 = require('bip39');
//const hdkey = require('ethereumjs-wallet');
const crypto = require('crypto');
const { ethers } = require('ethers');
//const bitcoin = require('bitcoinjs-lib');
const apiKey = process.env.REACT_APP_API_KEY;


// Define a route to fetch data from the CoinGecko API
app.get('/api/home', async (req, res) => {
  try {
    //const { vs_currency, order, per_page, page } = req.query;
    const response = await axios.get(
      //`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1`
      `https://api.coincap.io/v2/assets`
    );
    console.log((response.data.data[1].id));
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/wallet/:walletAddress', async (req, res) => {
  // console.log("backend here")
  try {
    const walletID = req.params.walletAddress;

    //gets balance of the address
    const walletData = await axios.get(

      `https://api.etherscan.io/api?module=account&action=balance&address=${walletID}&tag=latest&apikey=${apiKey}`
    );
    //gets
    const tx = await axios.get(

      `https://api.etherscan.io/api?module=account&action=txlist&address=${walletID}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`
    );
    //console.log(`wallet data: ${Number(walletData.data.result)/1000000000000000000}`);
    // console.log(tx.data.result);
    //const allDetails = {...walletData, ...tx};
    //console.log(allDetails.data);
    const allDetails = {
      balance: Number(walletData.data.result) / 1000000000000000000,
      transactions: tx.data.result.map(item => ({
        hash: item.hash,
        from: item.from,
        to: item.to,
        value: Number(item.value) / 1000000000000000000
      }))
    };
    //console.log(allDetails);
    res.json(allDetails);
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.post('/api/create-wallet', (req, res) => {
  try {
    var id = crypto.randomBytes(32).toString('hex');
    var privateKey = "0x" + id;
    //console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);

    var wallet = new ethers.Wallet(privateKey);
    //console.log("Address: " + wallet.address);

    const publicAddress = wallet.address;
    res.json({ publicAddress, privateKey });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/restore-wallet', (req, res) => {
  const { mnemonic } = req.body;

  try {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    const restoredWallet = {
      publicAddress: wallet.address,

    };
    res.json(restoredWallet);
  } catch (error) {
    console.error('Error restoring wallet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})