// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface ICrossDomainMessenger {
  function xDomainMessageSender() external view returns (address);
  function sendMessage(address target, bytes calldata message, uint32 gasLimit) external payable;
}