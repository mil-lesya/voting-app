import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

export async function initContract() {
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  window.walletConnection = new WalletConnection(near)
  window.accountId = window.walletConnection.getAccountId()
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    viewMethods: ['get_poll', 'get_voted_polls', 'get_polls_for_owner', 'get_all_polls', 'is_voted'],
    changeMethods: ['create_poll', 'delete_poll', 'vote'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function create_poll(description, start_time, end_time, options) {
  return await window.contract.create_poll({
    args: { description, start_time, end_time, options }
  })
}

export async function get_poll(poll_id) {
  return await window.contract.get_poll({
     poll_id
  })
}

export async function delete_poll(poll_id) {
  return await window.contract.delete_poll({
    args: { poll_id }
  })
}

export async function get_polls_for_owner(account_id, from_index, limit) {
  return await window.contract.get_polls_for_owner({
     account_id, from_index, limit
  })
}

export async function get_voted_polls(account_id, from_index, limit) {
  return await window.contract.get_voted_polls({
     account_id, from_index, limit
  })
}

export async function get_all_polls(from_index, limit) {
  return await window.contract.get_all_polls({
    args: { from_index, limit }
  })
}

export async function vote(poll_id, variant_id) {
  return await window.contract.vote({
    args: { poll_id, variant_id }
  })
}

export async function is_voted(account_id, poll_id) {
  return await window.contract.is_voted({
    account_id, poll_id
  })
}