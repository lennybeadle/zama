pragma solidity ^0.8.0;

contract OnchainRiddle {
    address public bot;
    string public riddle;
    bytes32 private answerHash;
    address public winner;
    bool public isActive;
    string[] public wrongAnswers;

    event RiddleSet(string riddle);
    event AnswerAttempt(address indexed user, bool correct, string answer);
    event Winner(address indexed user);

    modifier onlyBot() {
        require(msg.sender == bot, "Only bot can call this function");
        _;
    }

    constructor() {
        bot = msg.sender;
    }

    function setRiddle(string memory _riddle, bytes32 _answerHash) external onlyBot {
        require(!isActive, "Riddle already active");
        riddle = _riddle;
        answerHash = _answerHash;
        isActive = true;
        winner = address(0);
        delete wrongAnswers;
        emit RiddleSet(_riddle);
    }

    function submitAnswer(string memory _answer) external {
        require(isActive, "No active riddle");
        require(winner == address(0), "Riddle already solved");

        bool correct = keccak256(abi.encodePacked(_answer)) == answerHash;
        if (correct) {
            winner = msg.sender;
            isActive = false;
            emit Winner(msg.sender);
        } else {
            wrongAnswers.push(_answer);
        }

        emit AnswerAttempt(msg.sender, correct, _answer);
    }

    function getWrongAnswers() external view returns (string[] memory) {
        return wrongAnswers;
    }
}