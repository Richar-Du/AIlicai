// mybook/pages/users/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCount:0,
    users: [],
    pageIndex: 1,
    pageSize: 10,
  },

  getDataList() {
    let _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'getPagingDataList',
      data: {
        collection: 'tb_user',
        orderFiled: 'loginTime',
        pageIndex: _this.data.pageIndex,
        pageSize: _this.data.pageSize,
      },
      complete: resp => {
        console.log('getUserList', resp)
        let userList = resp.result.data.list
        this.setData({
          userCount: resp.result.data.total
        })
        if (resp.result.data.list <= 0) {
          wx.hideLoading()
          return
        }
        if (_this.data.pageIndex == 1) {
          console.log(resp.result.data)
          _this.setData({
            users: userList
          })
        } else {
          console.log('users', _this.data.users)
          // let tmpList = []
          // tmpList.push.apply(_this.data.users).push.apply(userList)
          _this.data.users.push.apply(_this.data.users, userList)
          _this.setData({
            users: _this.data.users
          })
        }

        wx.hideLoading()

        // resp.result.data.list.forEach(d => {
        //   // console.log(d.nickName,d.status)
        //   if (d.status != 0) {
        //     console.log(d)
        //   }
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDataList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.pageIndex = 1
    this.getDataList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let nextPage = this.data.pageIndex + 1
    this.setData({
      pageIndex: nextPage
    })
    this.getDataList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})