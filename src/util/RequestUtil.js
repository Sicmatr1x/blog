import axios from 'axios'

axios({
  url: '/nj_dom_notification/loginForm',
  method: 'get',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(function () {
  console.log('resolved.')
})
