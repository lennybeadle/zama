const hre = require("hardhat");

async function main() {
  const OnchainRiddle = await hre.ethers.getContractFactory("OnchainRiddle");
  const riddle = await OnchainRiddle.deploy();
  await riddle.deployed();
  console.log("OnchainRiddle deployed to:", riddle.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});