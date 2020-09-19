const app = getApp()

Page({
  data: {
    books: ['家电'],
    types: [{
      name: '收入',
      value: 1
    }, {
      name: '支出',
      value: 2
    }],
    incomeTypes: [], // 收入类型
    tmpIncomeTypes: [],
    expenditureTypes: [], // 支出类型
    typeValue: 0,
    bookIndex: 0,
    incomeIndex: 0,
    date: null,
    submitEnable:true
  },

  onLoad: function() {
    this.setData({
      date: this.getDefaultDate()
    })

    let _this = this
  },

  // 初始化表单数据
  initFormData() {
    this.setData({
      desc: '',
      count: ''
    })
  },

  // 账本选择发生变化
  bindBookChange(event) {
    this.setData({
      bookIndex: event.detail.value
    })
  },

  bindIncomeChange(event) {
    this.setData({
      incomeIndex: event.detail.value
    })
  },

  bindDateChange(event) {
    this.setData({
      date: event.detail.value
    })
  },

  // 处理收支类型发生变化
  bindTypeChange(event) {
    this.setData({
      typeValue: event.detail.value
    })

    // 根据收支类型变化动态给收支小类赋值
    if (this.data.types[event.detail.value].value == 1) {
      this.setData({
        incomeTypes: this.data.tmpIncomeTypes
      })
    } else {
      this.setData({
        incomeTypes: this.data.expenditureTypes
      })
    }

  },
  // 提交表单
  formSubmit(e) {
    if (!this.data.submitEnable){
      return
    }
    this.setData({
      submitEnable: false
    })
    
    // 添加百度统计事件 - 添加新数据
    app.mtj.trackEvent('book_add_item', {
      user: wx.getStorageSync('openId'),
    });
  },

  getDefaultDate() {
    let time = new Date()
    let month = time.getMonth() + 1
    let date = time.getDate()
    return `${time.getFullYear()}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`
  },
  onShow() {
    this.initFormData()
  }
})