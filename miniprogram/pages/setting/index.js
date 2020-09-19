const app = getApp()
import config from '../../utils/config.js'

Page({
  data: {
    userInfo: null,
    isAdmin: false
  },

  onLoad: function() {
    let userInfo = wx.getStorageSync('userInfo')
    let openId = wx.getStorageSync('openId')
    console.log(userInfo)
    this.setData({
      userInfo: userInfo,
      isAdmin: openId == config.openId
    })

  },

  handleItem(event) {
    // console.log(event.currentTarget.dataset.name)
    let name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: `../${name}/index`,
    })
  }
})