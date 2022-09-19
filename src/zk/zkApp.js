import { fetchAccount, isReady, Mina, PublicKey, setGraphqlEndpoint } from 'snarkyjs'
import { tic, toc } from "./tictoc.js"
import { Add as AddZkapp } from './zkContract/Add'
 

export async function getZkbody(url,zkAppAddress) {
  try {
  tic('is ready')
  await isReady;
  toc()
  setGraphqlEndpoint(url)
  const zkappAddress = PublicKey.fromBase58(zkAppAddress)
  tic('fetch account',zkappAddress)
  let res = await fetchAccount({publicKey:zkAppAddress}).catch(err=>err)
  toc()

  tic('begin compile')
  await AddZkapp.compile(zkappAddress)
  toc()

  tic('contract update transaction')
  let transaction = await Mina.transaction(() => {
    new AddZkapp(zkappAddress).update();
  });
  toc()
  tic('contract update json')
  await transaction.prove().catch(err=>err)
  let partiesJsonUpdate = transaction.toJSON();
  toc()
  return partiesJsonUpdate
} catch (error) {
    console.log("error",error);
}
}


