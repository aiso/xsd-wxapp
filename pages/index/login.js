"use strict";
const xsd = require('../../xsd/index')
const app = getApp()

Page({
  data: {
    userInfo: null
  },
  onShow(){
    console.log('11111111')
    const user = app.globalData.user
    this.setData({userInfo:user.info})
    //this.login(user)
  },
  login(){
    const user = app.globalData.user
    app.getUserInfo().then(userInfo=>{
      const postData = {code: app.globalData.accessCode, userInfo}

      if(user.protype == 10){
        postData.code = 'client-test1' //调试用户
        return xsd.api.post('client/login', postData).then(data=>{
            data.user.info = userInfo
            xsd.auth.login(data.user)
        })
      }

    }).finally(()=>{
      this.setData({
        disabled:false,
        loading: false,
      })
    })

  }
})
