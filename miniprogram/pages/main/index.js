const app = getApp()

Page({
  data: {
    userInfo: {},
    records: [],
    data: {
      income: 0, // 收入
      expenditure: 0, // 支出
      diffCount: 0 // 
    },
    delBtnWidth: 180,
    startX: "",
    type:'all'
  },

  onShow() {
    let refused = wx.getStorageSync('refused')
    let _this = this
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userInfo'] && !refused) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.reLaunch({
            url: '../index/index',
          })
          return;
        }
      }
    })

    let update = wx.getStorageSync('updateMainRecord')
    if (update == true) {
      this.getRecordList()
    }
  },

  handleTypeChange(event) {
    let type = event.currentTarget.dataset.type
    this.setData({
      type
    })
    this.getRecordList()
  },

  getRecordList() {
    let _this = this
  },

  onLoad: function() {
    // 第一次加载的时候
    if (!wx.getStorageSync('refused')) {
      wx.setStorageSync('refused', false)
    }
    let data = wx.getStorageSync('userInfo')
    let _this = this
    this.setData({
      userInfo: data
    })
    this.getRecordList()
  },
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，说明向右滑动，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      let outer = e.currentTarget.dataset.outer;
      var list = this.data.records;
      list[outer].records[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        records: list
      });
    }
  },
  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      let outer = e.currentTarget.dataset.outer;
      var list = this.data.records;
      list[outer].records[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        records: list
      });
    }
  },
  delItem(e) {
    let _this = this
    let index = e.currentTarget.dataset.index;
    let outer = e.currentTarget.dataset.outer;
    console.log(this.data.records[outer].records[index])
    let _id = this.data.records[outer].records[index]._id;
    wx.showModal({
      title: '提示',
      content: '确定删除本条数据?',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'delData',
            data: {
              collection: 'tb_book_item',
              _id: _id
            }
          }).then(resp => {
            _this.getRecordList()
          })
          // console.log('用户点击确定')
        } else if (res.cancel) {

        }
      }
    })
  }
})