/* eslint-disable padded-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-trailing-spaces */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// import { getToken } from '@/utils/auth'
// create an axios instance
// let VUE_APP_BASE_API = 'http://172.16.1.48:9111/supplierRelation' 
// let VUE_APP_BASE_API = 'http://172.16.0.176:9111/supplierRelation'
// let VUE_APP_BASE_API = 'http://123.56.106.51:9111/supplierRelation/'
// let VUE_APP_BASE_API = 'http://wxtest1.98ep.com/supplierRelation/'

let VUE_APP_BASE_API = ''
const service = axios.create({
  baseURL: VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {'Content-Type': 'application/json',Authorization:localStorage.getItem('Ttoken_type')+' '+localStorage.getItem('Taccess_token')},
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code != 200 && res.code!=500) {

      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          
        })
      }
      return res
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    // return Promise.reject(error)
  }
)

export default service
