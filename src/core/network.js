/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint func-names: "off", no-return-await: "off", max-len: "off" */
import { isProxy, toRaw } from 'vue'
import { useUser } from '@/stores/user.js'
import { useBasket } from '@/stores/basket.js'
import { useShowcase } from '@/stores/showcase.js'

import endpointsConfig from '@/core/network/endpoints/index.js'
import apiConfig from '@/config/env/index.js'

import handlers from '@/core/network/handlers/index.js'

export const Network = function (apiConfig) {
  this.apiConfig = apiConfig
  this.stores = {}
  this.storeTimeouts = {}
  this.setStores()
}

const NOT_FOUNDED_INDEX = -1
const state = {
  apiConfig,
  accessToken: null,
  authData: {},
  storeTimeouts: {},
}

const createCustomUrl = (url, urlParams) => {
  const params = { ...urlParams }
  let urlWithParams = url
  for (const key in urlParams) {
    if (url.indexOf(`{${key}}`) !== NOT_FOUNDED_INDEX) {
      urlWithParams = urlWithParams.replace(`{${key}}`, urlParams[key])
      delete params[key]
    }
  }
  return {
    urlWithParams,
    params,
  }
}

Network.prototype.httpRequest = async function (args, configStore) {
  const {
    url,
    api,
    httpMethod,
    handler,
    handlerError,
    params,
    hasUrlParams,
    type = 'raw',
    doc,
  } = args
  const reqConfig = {
    method: httpMethod,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }

  reqConfig.headers.Accept = 'application/json'
  reqConfig.headers['Access-Control-Allow-Origin'] = '*'
  reqConfig.headers['Cors'] = 'no-cors'

  if (state.accessToken) {
    reqConfig.headers.Authorization = `Bearer ${state.accessToken}`
  }

  let methodUrl = url
  let methodParams = params
  if (hasUrlParams) {
    const { urlWithParams, params } = createCustomUrl(url, methodParams)
    methodUrl = urlWithParams
    methodParams = params
  }

  switch (httpMethod) {
    case 'get':
      if (methodParams && type !== 'original') {
        const query = new URLSearchParams(methodParams)
        methodUrl += `?${query}`
      } else if (methodParams && type === 'original') {
        const query = new URLSearchParams()
        for (const key in methodParams) {
          if (Array.isArray(methodParams[key])) {
            for (const value of methodParams[key]) {
              query.append(key, value)
            }
          } else {
            query.append(key, methodParams[key])
          }
        }

        methodUrl += `?${query.toString()}`
      }

      break
    case 'post':
      if (type === 'formData') {
        delete reqConfig.headers['Content-Type']

        const formData = new FormData()

        Object.keys(methodParams).forEach((key) => {
          const value = methodParams[key]
          formData.append(key, value)
        })

        reqConfig.body = formData
      } else {
        if (params) {
          reqConfig.body = JSON.stringify(methodParams)
        }
      }
      break
    case 'delete':
      reqConfig.body = JSON.stringify(methodParams)
      break
    case 'put':
      if (params) {
        reqConfig.body = JSON.stringify(methodParams)
      }
      break
  }

  let apiUrl
  if (api) {
    if (api === 'markets') {
      const user = useUser()
      const exchange = user.currentAccount?.exchange
      apiUrl = state.apiConfig[api][exchange]
    } else {
      apiUrl = state.apiConfig[api]
    }
  } else {
    apiUrl = state.apiConfig.api
  }

  const fullUrl = methodUrl.startsWith('http')
    ? methodUrl
    : `${apiUrl}${methodUrl}`
  let status

  let res = new Promise(async (resolve, reject) => {
    await fetch(fullUrl, reqConfig)
      .then((res) => {
        return res.json().then((response) => {
          if (res.status >= 200 & res.status < 300 && res.ok) {
            status = 'success'
            resolve(response)
          } else {
            status = 'error'
            reject(response)
          }
        })
      })
      .catch((err) => {
        status = 'error'
        reject(err)
      })
  })

  res = await res.then((success) => success).catch((error) => error)

  let result
  if (handlers?.[handler] && status === 'success') {
    result = handlers[handler](res, state, params)
  } else if (status === 'error') {
    //this.generateErrorMessage(res)
    if (handlers?.[handlerError]) {
      result = handlers[handlerError](res, state)
    } else {
      if (doc?.returns) {
        switch (doc.returns) {
          case 'array':
            result = []
            break
          case 'object':
            result = {}
            break
          default:
            result = res
        }
      }
    }
  } else {
    result = res
  }

  if (configStore) {
    this.setDataToStore(result, configStore, status)
  }

  if (status === 'error') {
    throw result
  }

  return result
}

Network.prototype.setStores = function () {
  this.stores.user = useUser()
  this.stores.basket = useBasket()
  this.stores.showcase = useShowcase()
}

Network.prototype.createUpdateObj = function (store, data, status) {
  const update = {}
  const updateObj = update
  const loaded = {}
  const loadedObj = loaded
  const error = {}
  const errorObj = error
  updateObj[store.key] = data
  loadedObj[store.key] = true
  errorObj[store.key] = status === 'error'
  return {
    update,
    loaded,
    error
  }
}

Network.prototype.setDataToStore = function (data, store, status) {
  const { name, key, type, limit } = store
  const storeInstance = this.stores[name]

  if (!(storeInstance && key)) {
    console.error(`${store.name} store does not exist!`)
  }

  let result

  if (type && ['push', 'unshift'].includes(type)) {
    const dataFromStore = Array.isArray(storeInstance[key])
      ? storeInstance[key]
      : []
    result = [...dataFromStore]
    const limited = limit && result.length >= limit

    if (typeof data === 'object' && !Array.isArray(data)) {
      data = [data]
    }

    switch (type) {
      case 'push':
        if (limited) {
          result.shift().push(...data)
        } else {
          result = [...dataFromStore, ...data]
        }
        break
      case 'unshift':
        if (limited) {
          result.pop().unshift(...data)
        } else {
          result.unshift(...data)
        }
        break
    }
  } else {
    result = data
  }

  const { update, loaded, error } = this.createUpdateObj(store, result, status)

  storeInstance.$patch(update)
  storeInstance.$patch({ loaded })
  storeInstance.$patch({ error })
}

Network.prototype.req = async function (config, params) {
  let rawParams = params
  if (isProxy(params)) {
    rawParams = toRaw(params)
  }

  const args = { ...config, params: rawParams }

  return await this.httpRequest(args, config.store)
}


const generateEndpoints = () => {
  for (const endpoint of endpointsConfig) {
    Network.prototype[endpoint.name] = async function (p) {
      return await this.req(endpoint, p)
    }
  }
}

generateEndpoints()
