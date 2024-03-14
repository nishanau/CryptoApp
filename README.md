# Crypto Wallet Web Application

This is a small web application created using Node.js and React that allows users to create and restore crypto wallets. Additionally, it fetches real-time cryptocurrency prices from APIs on the internet. Currently, the wallets created are only on the Ethereum blockchain.

## Features

- **Create Crypto Wallets**: Users can create Ethereum wallets using this application.
- **Restore Wallets**: Users have the ability to restore their Ethereum wallets.
- **Real-time Cryptocurrency Prices**: The application fetches real-time cryptocurrency prices from various APIs to provide up-to-date information to the users.

## Technologies Used

- **Node.js**: For server-side scripting.
- **React**: For building the user interface.
- **Ethereum Blockchain**: Used for creating and managing crypto wallets.
- **APIs**: Utilized to fetch real-time cryptocurrency prices.

## Setup Instructions

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/nishanau/crypto-wallet-backend.git
   ```

2. Navigate to the project directory.
   ```bash
   cd crypto-wallet-backend
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Start the server.
   ```bash
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Upon opening the application, users are presented with options to create a new wallet or restore an existing one.
- When creating a new wallet, users are prompted to enter necessary information such as name, password, etc.
- When restoring a wallet, users need to provide the required details for wallet restoration.
- After creating or restoring a wallet, users can view their wallet details and real-time cryptocurrency prices.

## Credits

This application utilizes the following APIs for fetching cryptocurrency prices:

- [CoinGecko API](https://www.coingecko.com/en/api): Provides cryptocurrency data including prices, market cap, volume, and more.
- [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/): Offers cryptocurrency market data, including price, volume, market cap, and other statistics.

## Contributions

Contributions are welcome! If you'd like to contribute to this project, feel free to fork the repository and submit a pull request with your changes.
