// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IL1StandardBridge {
  // Calls same internal function as bridgeERC20To
  function depositERC20To(
    address l1_token,
    address l2_token,
    address to,
    uint256 amount,
    uint32 min_gas_limit,
    bytes calldata data
  ) external;

  function bridgeERC20To(
    address local_token,
    address remote_token,
    address to,
    uint256 amount,
    uint32 min_gas_limit,
    bytes calldata data
  ) external;
}