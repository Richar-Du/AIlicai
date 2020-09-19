//index.js
const app = getApp()

Page({
  data: {
    books: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    let _this = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log('getUserInfo', res.userInfo)
              _this.login(res.userInfo)
            }
          })
        }
      }
    })
  },

  login(userInfo) {
    wx.setStorageSync('userInfo', userInfo);
    // 云程序登录
    wx.cloud.callFunction({
      name: 'login',
      data: {
        user: userInfo
      },
      complete: res => {
        wx.setStorageSync('openId', res.result.openid);
        // console.log('callFunction test result: ', res.result)

        wx.switchTab({
          url: '../main/index',
        })
      }
    })
  },

  bindGetUserInfo(e) {
    console.log(e)
    if(!e.detail.userInfo){
      wx.setStorageSync('refused', true)
    }
    this.login(e.detail.userInfo)
  }
})