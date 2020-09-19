// 添加百度统计功能
const mtjwxsdk = require('./utils/mtj-wx-sdk.js');

//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'squirrel-2020',
        traceUser: true,
      })
    }
    this.globalData = {}
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
