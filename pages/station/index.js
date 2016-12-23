"use strict";

const app = getApp()
const xsd = require("../../xsd/index")

Page({
  data: {
  	userInfo:null
  },
  onLoad(){
  	this.setData({userInfo:app.globalData.user.info})
  }
})
