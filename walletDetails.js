const express = require('express');
const Web3 = require('web3'); // You need to install the web3 library
const app = express();
const port = 3001;

// Initialize Web3 with your Infura endpoint
const infuraUrl = 'https://mainnet.infura.io/v3/caab2590df47438ba1a3c29a1baaa045';
//const web3 = new Web3('https://mainnet.infura.io/v3/caab2590df47438ba1a3c29a1baaa045');
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// Define an API route to fetch wallet data
app.get('/wallet/:address', async (req, res) => {
  const { address } = req.params;

  try {
    // Use Web3 to fetch wallet data from the blockchain
    const balance = await web3.eth.getBalance(address);
    const transactionCount = await web3.eth.getTransactionCount(address);
    const transactions = await web3.eth.getTransactionsByAccount(address);

    // Prepare the response data
    const walletData = {
      address,
      balance,
      transactionCount,
      transactions,
    };

    res.json(walletData);
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    res.status(500).json({ error: 'Error fetching wallet data' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
