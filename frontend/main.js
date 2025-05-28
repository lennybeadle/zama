const contractAddress = "CONTRACT_ADDRESS";
const abi = [
  "function riddle() view returns (string)",
  "function winner() view returns (address)",
  "function getWrongAnswers() view returns (string[] memory)",
  "function submitAnswer(string _answer)"
];

let provider;
let signer;
let contract;

document.getElementById("submitBtn").addEventListener("click", submitAnswer);

async function init() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  const riddleText = await contract.riddle();
  document.getElementById("riddle").innerText = `what is the name of the only son of Bob's father?`;

  const wrongs = await contract.getWrongAnswers();
  document.getElementById("wrongAnswers").innerText = wrongs.join(", ");
}

async function submitAnswer() {
  const answer = document.getElementById("answerInput").value.trim();
  if (!answer) return alert("Please enter an answer.");

  const tx = await contract.submitAnswer(answer);
  await tx.wait();
  alert("Answer submitted!");
  location.reload();
}

window.onload = init;