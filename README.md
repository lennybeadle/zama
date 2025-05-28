# 🧩 Onchain Riddle DApp

A decentralized application where players answer riddles on the blockchain. When someone solves the riddle, a new one can be set. The entire game logic is powered by an Ethereum smart contract.

## 📦 Features

- Submit answers via a simple web interface.
- Riddle answer validation on-chain.
- Automatically displays previously submitted wrong answers.
- Integrates with MetaMask.
- Deployed to Sepolia testnet (or run locally using Hardhat).

---

## 🚀 Getting Started

### 1.  Install dependencies

```bash
npm install
```

### 2.  Compile & Deploy Contract

##### Compile
```
npx hardhat compile
```

##### Deploy to Sepolia
```
npx hardhat run scripts/deploy.js --network sepolia
```

### 3.  Run Frontend Locally

##### Serve with live-server
```
npm install -g live-server
cd frontend
live-server
```

##### Or use Python
```
cd frontend
python3 -m http.server 8080
```
