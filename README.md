# auro-test-dapp-berkeley
## Introduction
auro-test-dapp-berkeley provide mina berkeley DApp feature. that contains:

- requestAccounts
- sendLegacyPayment
- sendLegacyStakeDelegation
- sendTransaction (need run local serve to interact with auro wallet)
- signMessage
- verifyMessage

Production website deployed in https://aurowallet.github.io/auro-test-dapp-berkeley/
this can test DApp features except `mina party` .

## How to run Local Server

```sh
npm install
npm run dev
```
Then you can open `http://localhost:9012/` to test these feature


https://proxy.berkeley.minaexplorer.com/graphql

B62qnVN7nT9B4MjzLgc4ifFgv5RY2tprY1nvMFoechXA3HeVR6Gm9eq

```


"{  account(publicKey: "B62qnVN7nT9B4MjzLgc4ifFgv5RY2tprY1nvMFoechXA3HeVR6Gm9eq", token: "wSHV2S4qX9jFsLjQo8r1BsMLH2ZRKsZx6EJd1sbozGPieEC4Jf") {    publicKey    token    nonce    balance { total }    tokenSymbol    receiptChainHash    timing {      initialMinimumBalance      cliffTime      cliffAmount      vestingPeriod      vestingIncrement    }    permissions {      editState      send      receive      setDelegate      setPermissions      setVerificationKey      setZkappUri      editSequenceState      setTokenSymbol      incrementNonce      setVotingFor      setTiming    }    delegateAccount { publicKey }    votingFor    zkappState    verificationKey {      verificationKey      hash    }    sequenceEvents    provedState    zkappUri  }}"


```