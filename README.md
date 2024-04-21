# L1L2SampleContract

L1 と L2 がどのようにやり取りされているか検証するための学習用リポジトリです。

## 動かし方

- インストール(コントラクト側)

  ```bash
  cd backend
  yarn
  ```

- インストール(スクリプト側)

  ```bash
  cd scripts  
  yarn
  ```

- 初期設定

  デプロイしたコントラクトのアドレス情報を保管するための json ファイルをネットワーク毎に作成する。

  すでにこの json ファイルが生成されている場合はこのコマンドを実行しないこと！！

  データがなくなります！！

  ```bash
  yarn reset --network sepolia
  ```

  ```bash
  yarn reset --network optimismSsepolia
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

- デプロイ(Wallet コントラクト)

  Sepolia

  ```bash
  yarn deployWallet:sepolia
  ```

  OptimismSepolia

  ```bash
  yarn deployWallet:optimismSepolia
  ```

- VerifyContract

  Sepolia 側が verify されていなかった以下のコマンドを実行

  ```bash
  npx hardhat verifyContract --name Greeter --network sepolia
  ```

  ```bash
  npx hardhat verifyContract --name Wallet --network sepolia
  ```

- デプロイ後にやること

  それぞれのコントラクトの`send`メソッドを呼び出して L1 から L2 にメッセージが送れられているか(正確には通信先のブロックチェーンのコントラクトのメソッドが呼び出されているか)確認する。

  うまくいけばメッセージが届いているはず

- task で message を送る方法

  ```bash
  npx hardhat sendMessage --message test --network sepolia
  ```

  ```bash
  npx hardhat sendMessage --message test --network optimismSepolia
  ```

- L2からL1にメッセージを送る場合

  OptisismからSepoliaに対してメッセージを送る際にはコントラクトのメソッドを呼び出した後に別のスクリプトを実行してトランザクションをfinalizedさせる必要あり

  ```bash
  yarn finalize
  ```

- L1 から L2にETHを送る方法

  amount に指定した分だけ targetにしたアドレスに送金される。

  ```bash
  npx hardhat sendEth --target 0xD3095061512BCEA8E823063706BB9B15F75b187b --amount 0.001 --network sepolia
  ```

### 参考文献

1. [SampleCode](https://github.com/t4sk/notes/blob/main/op/contracts/Greeter.sol)
2. [YouTube - Send Message from L1 to L2 | Optimism](https://www.youtube.com/watch?v=SKl5pEs8reY&t=9s)
3. [Youtube - Send Message from L2 to L1 | Optimism](https://www.youtube.com/watch?v=zOE1-ZILobY&list=RDCMUCJWh7F3AFyQ_x01VKzr9eyA&index=3)
