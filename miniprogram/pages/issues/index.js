// mybook/pages/issues/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issues: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'getDataList',
      data: {
        collection: 'tb_feedback'
      },
      complete: resp => {
        console.log('getDataList', resp)
        wx.hideLoading()
        _this.setData({
          issues: resp.result.data
        })
      }
    })
  }
})