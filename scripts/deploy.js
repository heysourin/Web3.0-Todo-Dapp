const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");

  const ToDoListDeploy = await ToDoList.deploy();

  await ToDoListDeploy.deployed();

  console.log(`Contract Deployed to: ${ToDoListDeploy.address}`);

  console.log(`${ToDoListDeploy}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
