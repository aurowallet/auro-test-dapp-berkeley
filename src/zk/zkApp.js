import { fetchAccount, isReady, Mina, PublicKey, setGraphqlEndpoint } from 'snarkyjs'
import { tic, toc } from "./tictoc.js"
import { Add as AddZkapp } from './zkContract/Add'


export async function getZkbody(url) {
  tic('is ready')
  await isReady;
  toc()
  setGraphqlEndpoint(url)
  const zkappAddress = PublicKey.fromBase58('B62qmtRNEUtTHH8grsaZM51uE2WF1bQTCTmZzuAc3xv19vHrRd9j2kK')
  // ("B62qrPXPDBFu3bMjooHW9JAKvmxciwBc4krQ8MRWAnnKvoHoyhTC7R5")
  tic('fetch account')
  await fetchAccount(zkappAddress)
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
  let partiesJsonUpdate = (await transaction.prove()).toJSON();
  toc()
  return partiesJsonUpdate
}
