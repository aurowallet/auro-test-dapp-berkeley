import { getZkbody } from './zk/zkApp';

let account

const initializeMina = async () => {

 


  const onboardButton = document.getElementById('connectButton')
  const getAccountsButton = document.getElementById('getAccounts')
  const getAccountsResults = document.getElementById('getAccountsResult')

  onboardButton.onclick = async () => {
    if (!window.mina) {
      alert("No provider was found 请先安装 Auro Wallet")
    } else {
      onboardButton.innerText = 'Onboarding in progress'
      let data = await window.mina.requestAccounts().catch(err => err)
      if (data.message) {
        onboardButton.innerText = data.message
      } else {
        let approveAccount = data
        account = approveAccount
        document.getElementById('accounts').innerHTML = approveAccount;
        onboardButton.innerText = 'Connected'
        onboardButton.disabled = true
      }
    }
  }


  const initAccount = async ()=>{
    if (window.mina) {
      let data = await window.mina.requestAccounts().catch(err => err)
      let approveAccount = data
      if (data.message) {
        getAccountsResults.innerHTML = data.message
      } else {

        account = approveAccount
        document.getElementById('accounts').innerHTML = approveAccount;
        onboardButton.innerText = 'Connected'
        onboardButton.disabled = true

        getAccountsResults.innerHTML = approveAccount;
      }
    }
  }

  initAccount()
  /**
   * get account
   */
  getAccountsButton.onclick = async () => {
    if (window.mina) {
      let data = await window.mina.requestAccounts().catch(err => err)
      let approveAccount = data
      if (data.message) {
        getAccountsResults.innerHTML = data.message
      } else {
        getAccountsResults.innerHTML = approveAccount;
      }
    }
  }


  const sendButton = document.getElementById('sendButton')
  const sendAmountInput = document.getElementById('sendAmountInput')
  const receiveAddressInput = document.getElementById('receiveAddressInput')
  const sendFeeInput = document.getElementById('sendFee')
  const sendMemoInput = document.getElementById('sendMemo')
  const sendResultDisplay = document.getElementById('sendResultDisplay')

  /**
   * transfer 
   */
  sendButton.onclick = async () => {

    let sendResult = await window.mina.sendLegacyPayment({
      amount: sendAmountInput.value,
      to: receiveAddressInput.value,
      fee: sendFeeInput.value,
      memo: sendMemoInput.value
    }).catch(err => err)

    if (sendResult.hash) {
      sendResultDisplay.innerHTML = sendResult.hash
    } else {
      sendResultDisplay.innerHTML = sendResult.message
    }
  }

  /**
   * staking
   */
  const stakingButton = document.getElementById('stakingButton')
  const vaildatorAddressInput = document.getElementById('vaildatorAddressInput')
  const stakeFeeInput = document.getElementById('stakeFee')
  const stakeMemoInput = document.getElementById('stakeMemo')
  const stakingResultDisplay = document.getElementById('stakingResultDisplay')

  stakingButton.onclick = async () => {
    let stakingResult = await window.mina.sendLegacyStakeDelegation({
      to: vaildatorAddressInput.value,
      fee: stakeFeeInput.value,
      memo: stakeMemoInput.value
    }).catch(err => err)
    if (stakingResult.hash) {
      stakingResultDisplay.innerHTML = stakingResult.hash
    } else {
      stakingResultDisplay.innerHTML = stakingResult.message
    }
  }


  /**sign party */
  const signPartyButton = document.getElementById('signPartyButton')
  const partyResultDisplay = document.getElementById('partyResultDisplay')
  const buildTip = document.getElementById('buildTip')

  const gqlContent = document.getElementById('gqlContent')
  const zkAppAddress = document.getElementById('zkAppAddress')

  const signPartyFee = document.getElementById('signPartyFee')
  const signPartyMemo = document.getElementById('signPartyMemo')

  signPartyButton.onclick = async () => {
    // there need start in your local host .
    let url = gqlContent.value
    if (!url) {
      console.log("need Set useful gql-url")
      return
    }
    buildTip.hidden = false 

    let zkAddress = zkAppAddress.value?.trim()
    let zkBody = await getZkbody(url,zkAddress) 
    buildTip.hidden = true

    let partyResult = await window.mina.sendTransaction({
      transaction: zkBody,
      feePayer: {
        memo: signPartyMemo.value || "",
        fee: signPartyFee.value || ""
      },
    }).catch(err => err)

    console.log("signPartyButton==1", partyResult);
    if (partyResult.hash) {
      partyResultDisplay.innerHTML = partyResult.hash
    } else {
      partyResultDisplay.innerHTML = partyResult.message
    }
  }


  /**
   * sign message
   */
  const signMessageButton = document.getElementById('signMessageButton')
  const signMessageContent = document.getElementById('signMessageContent')
  const signMessageResult = document.getElementById('signMessageResult')


  let signResult

  signMessageButton.onclick = async () => {
    signResult = await window.mina.signMessage({
      message: signMessageContent.value,
    }).catch(err => err)
    if (signResult.signature) {
      signMessageResult.innerHTML = JSON.stringify(signResult.signature)
    } else {
      signMessageResult.innerHTML = signResult.message
    }
  }

  const signVerifyButton = document.getElementById('signVerifyButton')
  const verifyResult = document.getElementById('verifyResult')


  const verifySignatureContent = document.getElementById('verifySignature')
  const verifyMessageContent = document.getElementById('verifyMessage')
  /**
   * Verify Message
   */
  signVerifyButton.onclick = async () => {
    let from = account && account.length > 0 ? account[0] : ""

    let verifyContentStr = verifySignatureContent.value
    let signature 
    try {
      signature = JSON.parse(verifyContentStr)
    } catch (error) {
    }
    if(!signature){
      console.log('please input value json')
      return 
    }

    let verifyMessageBody = {
      publicKey: from,
      signature: {
        field: signature?.field,
        scalar: signature?.scalar
      },
      payload: verifyMessageContent.value
    }
    let messageVerifyResult = await window.mina.verifyMessage(verifyMessageBody).catch(err => err)
    verifyResult.innerHTML = messageVerifyResult.error?.message||messageVerifyResult
  }






  setTimeout(async () => {
    if (window.mina) {
      window.mina.on('accountsChanged', handleNewAccounts)
      window.mina.on('chainChanged', handleChainChange)

      let data = await window.mina.requestNetwork().catch(err => err)
      handleChainChange(data)
    }
  }, 200);

  const networkDiv = document.getElementById('network')
  function handleChainChange(newChain) {
    networkDiv.innerHTML = newChain
  }


  function handleNewAccounts(newAccounts) {
    if (Array.isArray(newAccounts)) {
      document.getElementById('accounts').innerHTML = newAccounts;
      if (newAccounts.length === 0) {
        onboardButton.innerText = 'Connect'
        onboardButton.disabled = false
      }
    }
  }
}
window.addEventListener('DOMContentLoaded', initializeMina)