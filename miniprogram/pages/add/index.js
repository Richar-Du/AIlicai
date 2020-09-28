const app = getApp();
const db = wx.cloud.database();
const recorderManager = wx.getRecorderManager();

function sendRecord(src) {
  var obj = {
  url: "http://vop.baidu.com/server_api",
  filePath: src,
  name: "sound_record",
  header: {
   'Content-Type': 'application/json'
  },

  success: function (result) {
   var data = JSON.parse(result.data);
   // msg 为最终语音识别的字符串
   var msg = data.result;
   console.log(msg);
   // 获取当前页面对象
   var page = getCurrentPages()[0];
   page.setData({ msg: msg });
  },

  fail: function (err) {
   console.log(err);
  }
  };
  wx.uploadFile(obj)
 }

recorderManager.onStop((res)=>{
  // 获取录音文件路径，并提交到百度
  sendRecord(res.tempFilePath);
})

Page({
  data: {
    types: [{
      name: '支出',
      value: 0
    }, {
      name: '收入',
      value: 1
    }],
    incomeTypes: ["gongzi","qita"], // 收入类型
    expenditureTypes: ["shipin","yifu","jiaotong","jujia"], // 支出类型
    actualTypes: [],
    inOutValue: 0,
    typeValue: 0,
    count:0,
    date: null,
    remarks: null,
    submitEnable:true
  },
  // 按下按钮开始录音
  finger_touch_begin() {
    recorderManager.start({
    });
  },
  // 松开按钮结束录音
  finger_touch_stop() {
    recorderManager.stop();
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
    console.log(this.data.inOutValue)

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
    if (inout == 0){
      consume_num *= -1
    }
    let consume_date = e.detail.value.date
    let consume_remarks = e.detail.value.remarks

    wx.showLoading({
      title: '正在保存',
    })
    db.collection(consume_type).add({
      data:{
        "金额":consume_num,
        "日期":consume_date,
        "备注":consume_remarks
      }
    })
    wx.hideLoading()
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000
    })
    this.setData({
      submitEnable: true
    })
  },

  getDefaultDate() {
    let time = new Date()
    let month = time.getMonth() + 1
    let date = time.getDate()
    return `${time.getFullYear()}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`
  }
})