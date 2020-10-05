// 添加百度统计功能
const mtjwxsdk = require('./utils/mtj-wx-sdk.js');

//app.js
App({
  globalData:{
    openid:null
  },
  onLaunch: function () {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'squirrel-2020',
        traceUser: true,
      }),
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo;
                if (that.userInfoReadyCallback) {
                  that.userInfoReadyCallback(res)
                }
                console.log(that.globalData.userInfo)
              }
            })
          }
        }
      }),
      wx.cloud.callFunction({
        name: "login",
        complete: res => {
          that.globalData.openid = res.result.openid;
          console.log('appjs的openid是',that.globalData.openid)
        }
      })
    }
    this.globalData = {
      windowName:null,
      openid: null,
      userInfo: null,
      isLogin: false,
      evn: 'test',
      queryDishes:null,
      // 调用百度AI语音识别API的相关参数
      baiduyuyin:{
        apiKey: 'cFmNd8srEgF9OKe8gRw5yiy9',
        secretKey: '7YSZyhUilN4bGH480VG3mUcjnPfHl9GA',
        baidu_yuyin_access_token:'24.18e6bc377f03084027d36d7653383d9c.2592000.1603802053.282335-22765338'
      }
    }    
  }
  
})

// 获取当前月的第一天
function getCurrentMonthFirst() {
  var date = new Date();
  date.setDate(1);
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date;
}
// 获取当前月的最后一天
function getCurrentMonthLast() {
  var date = new Date();
  var currentMonth = date.getMonth();
  var nextMonth = ++currentMonth;
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  var oneDay = 1000 * 60 * 60 * 24;
  let tmpdate = new Date(nextMonthFirstDay - oneDay)
  tmpdate.setHours(23)
  tmpdate.setMinutes(59)
  tmpdate.setSeconds(59)
  return tmpdate;
}
