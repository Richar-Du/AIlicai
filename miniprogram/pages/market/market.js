// miniprogram/pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastcode:[],
    code:[['000297','001045','163816','270023','007455','000977','000336','002190','004997','005968','005969','004640','000746'],
  ['000297','001045','163816','163817','360013','270023','007455','001691','000977','000336','002190','002542','004997','005968','005969','004640','000746'],
  ['000297','001045','163816','163817','000977','000336','002190','002542','001606','004997','005968','005969'],
  ['000297','001045','163816','163817','360013','000977','000336','004997','005968','005969','004640','000746'],
  ['000297','001045','163816','163817','360013','360014','006030','003510','005461','320009']],
    zhaiquan:['000297','001045','163816','163817','360013'],
    QD:['270023','007455','001691','006308','006309'],
    hunhe:['000977','000336','002190','002542','001606'],
    gupiao:['004997','005968','005969','004640','000746'],
    
    type:{
      '004997':'股票型',
      '005968':'股票型',
      '005969':'股票型',
      '004640':'股票型',
      '000746':'股票型',
      '000977':'混合型',
      '000336':'混合型',
      '002190':'混合型',
      '002542':'混合型',
      '001606':'混合型',
      '000297':'债券型',
      '001045':'债券型',
      '163816':'债券型',
      '163817':'债券型',
      '360013':'债券型',
      '360014':'债券型',
      '006030':'债券型',
      '003510':'债券型',
      '005461':'债券型',
      '320009':'债券型',
      '270023':'QDII型',
      '007455':'QDII型',
      '001691':'QDII型',
      '006308':'QDII型',
      '006309':'QDII型'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("推荐方案是：",options.id)
    let _this = this
    const items = []
    const types = _this.data.type
    if(options.id) {
      const type = options.id
      const all = this.data.code
      const code1 = all[type-1]
      this.setData({
        lastcode:code1
      })
    }
    else {
      this.setData({
        lastcode: _this.data.gupiao.concat(_this.data.hunhe)
      }) 
    }
    const code = this.data.lastcode
    for (var j=0;j<code.length;j++) {
       var code2 = code[j].toString()
       wx.request({
        url: "https://fundgz.1234567.com.cn/js/"+code2+".js", //仅为示例，并非真实的接口地址
        data: {
         
        }, 
        method:'GET',
        header: {
          'content-type': 'application/json', // 默认值
        },
        success (res) {
          console.log(res)
          var data0 = res.data.replace("jsonpgz(","")
          var data0 = data0.replace(");", "")
          console.log(data0)
          const data = JSON.parse(data0)
          data['gszzl'] = parseFloat(data['gszzl'])
          const fundcode = data['fundcode']
          data['type'] = types[fundcode]
          console.log(data)
          items.push(data)
          _this.setData({
            fund:items
          }) 
        }
      }) 
    };
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