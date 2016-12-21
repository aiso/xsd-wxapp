"use strict";
const xsd = require('../../xsd/index')

Page({
  data:{
  	station:'',
  	stations:[],
  	disabled:true,
    loading:false
  },
  onLoad(options){
    xsd.api.get('stations', true).then(data=>{
      this.setData({stations:data.stations})
    })
  },
  inputChanged(e){
    const disabled = !/^[1-9]{1}[0-9]{1,7}?$/.test(e.detail.value)
    this.setData({disabled})
  },  
  selectStation(e){
  	this.setData({station:e.currentTarget.dataset.station, disabled:false})
  },
  access(){
    this.setData({
      disabled:true,
      loading: true,
    })
    var app = getApp()
    app.getUserInfo().then(userInfo=>{
      const postData = {code: app.globalData.accessCode, station:this.data.station, userInfo}
      postData.code = 'client-test1' //调试用户
      return xsd.api.post('client/access', postData).then(data=>{
          data.user.info = userInfo
          xsd.auth.login(data.user)
      })
    }).finally(()=>{
      this.setData({
        disabled:false,
        loading: false,
      })
    })
  }
})