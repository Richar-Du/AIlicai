const app = getApp();
const db = wx.cloud.database();
const recorderManager = wx.getRecorderManager();
const APIKey="cFmNd8srEgF9OKe8gRw5yiy9"
const SecretKey="7YSZyhUilN4bGH480VG3mUcjnPfHl9GA"
const urlForRecord = "https://vop.baidu.com/pro_api"

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
    expenditureTypes: ["cysg","yfsp","jtcx","jjwy"], // 支出类型
    actualTypes: [],
    inOutValue: 0,
    typeValue: 0,
    count:0,
    date: null,
    remarks: null,
    submitEnable:true,
    recordBase64:null,
    recordSize:0
  },
  // 按下按钮开始录音
  finger_touch_begin:function() {    
    var that = this
    //录音参数
    const options = {
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'PCM'
    }
    recorderManager.onStop((res)=>{
      // 获取录音文件路径，并提交到百度
      that.sendRecord(res.tempFilePath);
    })
    recorderManager.start(options);
  },
  sendRecord:function(src) {
    var that = this
    console.log(that.data)
    wx.showLoading({
      title: '识别中',
    })
    wx.getFileSystemManager().readFile({
      filePath: src,
      success: (res) => {
        console.log(res)
        const base64 = wx.arrayBufferToBase64(res.data);
        var fileSize = res.data.byteLength;
        that.setData({
          recordBase64:base64,
          recordSize:fileSize
        })
        console.log("录音文件读取成功")
        wx.request({
          url: urlForRecord,
          header: {
            'Content-Type':'application/json',
          },
          data: {
            'format':'pcm',
            'rate':16000,
            'channel':1,
            'token':'24.8665270d237fc3302e998e0d083585e7.2592000.1603958262.282335-22765338',
            'speech': base64,
            'len':fileSize,
            'cuid':'baidu_workshop',
            'dev_pid':80001
          },
          method: 'POST',
          success: (res) => {
            console.log('res',res.data['result'][0].replace("。",""))
            // that.setData({
            //   sound_text:res.data
            // })
            wx.hideLoading()
          },
          fail: (res) => {
            console.log("识别失败")
            console.log(res)
          }
        })
      }
    })
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
        "money":consume_num,
        "date":consume_date,
        "notes":consume_remarks
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
