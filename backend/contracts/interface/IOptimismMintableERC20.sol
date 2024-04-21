// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./IERC165.sol";

interface IOptimismMintableERC20 is IERC165 {
  function remoteToken() external view returns (address);
  // Local bridge
  function bridge() external view returns (address);
  function mint(address dst, uint256 amount) external;
  function burn(address src, uint256 amount) external;
}