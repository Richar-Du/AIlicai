const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    types: [{
      name: '支出',
      value: 0
    }, {
      name: '收入',
      value: 1
    }],
    incomeTypes: ["工资","兼职","投资"], // 收入类型
    expenditureTypes: ["食品酒水","衣服饰品","行车交通","居家物业"], // 支出类型
    actualTypes: [],
    inOutValue: 0,
    typeValue: 0,
    count:0,
    date: null,
    remarks: null,
    submitEnable:true
  },

  onLoad: function() {
    this.setData({
      date: this.getDefaultDate(),
      actualTypes: this.data.expenditureTypes
    })
  },

  // 处理收支类型发生变化
  chooseInOut(event) {
    this.setData({
      inOutValue: event.detail.value
    })

    // 根据收支类型变化动态给收支小类赋值
    if (this.data.types[event.detail.value].value == 0) {
      this.setData({
        actualTypes: this.data.expenditureTypes
      })
    } else {
      this.setData({
        actualTypes: this.data.incomeTypes
      })
    }

  },
  //选择消费类型
  chooseType(e){
    this.setData({
      typeValue: e.detail.value
    })
  },

  // 提交表单
  formSubmit(e) {
    if (!this.data.submitEnable){
      return
    }

    this.setData({
      submitEnable: false
    })

    let inout = this.data.inOutValue
    let consume_type = this.data.actualTypes[this.data.typeValue]
    let consume_num = e.detail.value.count
    let consume_date = e.detail.value.date
    let consume_remarks = e.detail.value.remarks

    wx.showLoading({
      title: '正在保存',
    })
    db.collection('zhangbu').add({
      data:{
        "收支类型":inout,
        "消费类型":consume_type,
        "消费金额":consume_num,
        "消费日期":consume_date,
        "消费备注":consume_remarks
      }
    })
    wx.hideLoading()
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000
    })
    this.setData({
      submitEnable: false
    })
  },

  getDefaultDate() {
    let time = new Date()
    let month = time.getMonth() + 1
    let date = time.getDate()
    return `${time.getFullYear()}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`
  }
})