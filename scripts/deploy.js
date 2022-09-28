const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");

  const ToDoListDeploy = await ToDoList.deploy();

  await ToDoListDeploy.deployed();

  console.log(`Contract Deployed to: ${ToDoListDeploy.address}`);

  console.log(ToDoListDeploy);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
