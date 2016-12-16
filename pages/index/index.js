//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: null
  },
  onShow(){
    const user = app.globalData.user
    if(!!user){
      console.log(user)
    }else if(!this.data.userInfo){
      console.log(app.globalData)
      app.getUserInfo().then(()=>{
        this.setData({userInfo:app.globalData.userInfo})
      })
    }
  },
})
