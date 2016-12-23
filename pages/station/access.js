"user strict"
const xsd = require("../../xsd/index")

Page({
  data:{
    token:'',
    tokenLength:0,
    loading:false
  },
  tokenChange(e){
    this.setData({token:e.detail.value, tokenLength:e.detail.value.length})
  },
  clear(){
    this.setData({token:'',tokenLength:0})
  },
  access(){
  	if(/^\w{8}$/.test(this.data.token) && this.data.loading==false){
      this.setData({loading:true})
      wx.showNavigationBarLoading()

      var app = getApp()
      app.getUserInfo().then(userInfo=>{
        const postData = {code: app.globalData.accessCode, token:this.data.token, userInfo}
        postData.code = 'station-client1' //调试用户
        return xsd.api.post('station/access', postData).then(data=>{
            data.user.info = userInfo
            xsd.auth.login(data.user)
        })
      }).finally(()=>{
        wx.hideNavigationBarLoading()
        this.setData({
          loading: false,
        })
      })
  	}
  }

})