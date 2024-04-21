# L1L2SampleContract

L1 と L2 がどのようにやり取りされているか検証するための学習用リポジトリです。

## 動かし方

- インストール

  ```bash
  yarn
  ```

- デプロイ(Lock コントラクト)

  Sepolia

  ```bash
  yarn deploy:sepolia
  ```

  OptimismSepolia

  ```bash
  yarn deploy:optimismSepolia
  ```

- デプロイ(Greeter コントラクト)

  Sepolia

  ```bash
  yarn deployGreeter:sepolia
  ```

  OptimismSepolia

  ```bash
  yarn deployGreeter:optimismSepolia
  ```

- VerifyContract

  Sepolia 側が verify されていなかった以下のコマンドを実行

  ```bash
  npx hardhat verifyCotnract --network sepolia
  ```

- デプロイ後にやること

  それぞれのコントラクトの`send`メソッドを呼び出して L1 から L2 にメッセージが送れられているか(正確には通信先のブロックチェーンのコントラクトのメソッドが呼び出されているか)確認する。

  うまくいけばメッセージが届いているはず

- task で message を送る方法

  ```bash
  npx hardhat sendMessage --message test --network sepolia
  ```

### 参考文献

1. [SampleCode](https://github.com/t4sk/notes/blob/main/op/contracts/Greeter.sol)
2. [YouTube - Send Message from L1 to L2 | Optimism](https://www.youtube.com/watch?v=SKl5pEs8reY&t=9s)
