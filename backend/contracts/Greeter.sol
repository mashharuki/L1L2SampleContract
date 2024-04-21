// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./interface/ICrossDomainMessenger.sol";

contract Greeter {
  // ETH Sepolia messenger - L1 0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef
  // OP Sepolia messenger  - L2 0x4200000000000000000000000000000000000007
  address public immutable MESSENGER;
  
  address public remote_greeter;
  mapping(address => string) public greetings;

  constructor(address messenger) {
    MESSENGER = messenger;
  }

  function set_remote_greeter(address _remote_greeter) external {
    remote_greeter = _remote_greeter;
  }

  /**
   * メッセージを登録するメソッド
   */
  function set(address sender, string memory greeting) external {
    require(msg.sender == MESSENGER, "Greeter: Caller must be the CrossDomainMessenger");
    require(
      ICrossDomainMessenger(MESSENGER).xDomainMessageSender() == remote_greeter,
      "Greeter: Remote sender must be the remote greeter"
    );

    greetings[sender] = greeting;
  }

  function send(string memory greeting) external {
    // 通信先のブロックチェーンにデプロイしてあるコントラクトのsetメソッドを呼び出す。
    ICrossDomainMessenger(MESSENGER).sendMessage({
      target: remote_greeter,
      message: abi.encodeCall(this.set, (msg.sender, greeting)),
      // TODO: gas fee
      gasLimit: 200000
    });
  }
}
