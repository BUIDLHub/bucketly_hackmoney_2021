const ERC20ABI = require('../abi/ERC20ABI.json');
const {ethers} = require("hardhat");

const balanceOf = async function({owner, token}) {
    let con = new ethers.Contract(token, ERC20ABI, ethers.provider);
    return con.balanceOf(owner);
}

const transfer = async function({source, dest, token, amount}) {
    let con = new ethers.Contract(token, ERC20ABI, ethers.provider);
    console.log("Transferring", amount.toString(), "of", token, "from", source.address, "to", dest);
    return con.connect(source).transfer(dest, amount);
}

module.exports = {
    balanceOf,
    transfer
}