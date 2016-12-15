"use strict";
const xsd = require('../../xsd/index')

Page({
  data:{
  	station:'',
  	stations:[],
  	disabled:true
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
  }
})