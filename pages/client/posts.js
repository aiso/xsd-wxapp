"use strict";
const app = getApp()
const xsd = require("../../xsd/index")
const sync = require('../../utils/sync.js')

Page({
  data:{
  	station:null,
  	posts:null
  },
  onLoad(){
  	//if(!this.data.posts || (!!this.data.station && this.data.station.id != app.globalData.user.profile.station))
  	this.loadPosts()
  },
  loadPosts(){
  	const base = sync.getEntityData('base');
  	xsd.api.get('client/items', true).then(data=>{
  	  const posts = data.posts.map(post=>{
  	  	post.supplier = data.suppliers.find(s=>s.id==post.user).name
  	  	return post
  	  })
  	  this.setData({posts, station:data.station})
  	}).catch(err=>{
  		this.setData({posts:null})
  	})
  	

  }
	
})