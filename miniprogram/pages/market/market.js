// miniprogram/pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    high:['004997','005968','005969','004640','000746','001576','005620','001790','003745','501009'],
    medium:['000977','000336','002190','002542','001606','168501','001218','005689','162703','005454'],
    low:['000297','001045','163816','360013','000014','519967','320021','210014','005246','003401'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("推荐方案是：",options.id)
    let _this = this
    const items = []
    const code = _this.data.high
    for (var i=0;i<code.length;i++) {
      wx.request({
        url: 'https://www.ywonchall.top:90/', //仅为示例，并非真实的接口地址
        data: {
          code:code[i]
        }, 
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          const data = res.data
          data['gszzl'] = parseFloat(data['gszzl'])
          console.log(data)
          items.push(data)
          _this.setData({
            fund:items
          })
        }
      })
    }
    _this.setData({
      fund:items
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})