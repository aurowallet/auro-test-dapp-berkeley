# auro-test-dapp-berkeley-qa
## Introduction
auro-test-dapp-berkeley-qa provide mina berkeley-qa DApp feature. that contains:

- requestAccounts
- sendLegacyPayment
- sendLegacyStakeDelegation
- sendTransaction (need run local serve to interact with auro wallet)
- signMessage
- verifyMessage

Production website deployed in https://aurowallet.github.io/auro-test-dapp-berkeley-qa/
this can test DApp features except `mina party` .

`mina party`  need start local feature. 
## How to run Local Server

```sh
npm install
npm run dev
```
Then you can open `http://localhost:9012/` to test these feature

