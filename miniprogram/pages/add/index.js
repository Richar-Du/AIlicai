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
    incomeTypesForDisplay: ["薪水奖金","兼职收入","投资理财","其他收入"], // 收入类型
    incomeTypes: ["xsjj","jjsr","tzlc","qtsr"],
    expenditureTypesForDisplay: ["衣服饰品","餐饮蔬果","零食烟酒","住房汽车","家居物业","交通出行","旅行游玩","医疗医药","美容美发","意外支出","通讯话费","人情往来","购物娱乐","花鸟鱼虫","电子数码","运动健身","学习办公","爱心慈善","其他支出"],
    expenditureTypes:["yfsp","cysg","lsyj","zfqc","jjwy","jtcx","lxyw","ylyy","mrmf","ywzc","txhf","rqwl","gwyl","hnyc","dzsm","ydjs","xxbg","axcs","qtzc"],
    actualTypesForDisplay: ["衣服饰品","餐饮蔬果","零食烟酒","住房汽车","家居物业","交通出行","旅行游玩","医疗医药","美容美发","意外支出","通讯话费","人情往来","购物娱乐","花鸟鱼虫","电子数码","运动健身","学习办公","爱心慈善","其他支出"],
    actualTypes:["yfsp","cysg","lsyj","zfqc","jjwy","jtcx","lxyw","ylyy","mrmf","ywzc","txhf","rqwl","gwyl","hnyc","dzsm","ydjs","xxbg","axcs","qtzc"],
    inOutValue: 0,
    typeValue: 0,
    count:0,
    date: null,
    remarks: null,
    submitEnable:true,
    recordBase64:null,
    recordSize:0,
    input:0,
    output:0
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
            wx.hideLoading()
            if(res){
              console.log('res',res.data['result'][0].replace("。",""))
              that.setData({
                sound_text:res.data['result'][0].replace("。","")
              })
              that.splitText(res.data['result'][0].replace("。",""))
            }
            else{
              wx.showToast({
                title: '未检测到有效语音，请重新输入',     
                duration: 2000,
              })
            }
          },
          fail: (res) => {
            console.log("识别失败")
            console.log(res)
          }
        })
      }
    })
  },
  fill_inout:function(io){
    this.setData({
      inOutValue: io
    })
    // 根据收支类型变化动态给收支小类赋值
    if (this.data.types[io].value == 0) {
      this.setData({
        actualTypesForDisplay: this.data.expenditureTypesForDisplay,
        actualTypes: this.data.expenditureTypes
      })
    } else {
      this.setData({
        actualTypesForDisplay: this.data.incomeTypesForDisplay,
        actualTypes: this.data.incomeTypes
      })
    }
  },
  fill_type:function(type){
    this.setData({
      typeValue: type
    })
  },
  fill_count:function(count){
    this.setData({
      count: count
    })
  },
  fill_note:function(note){
    this.setData({
      remarks: note
    })
  },
  splitText:function(text){
    var type = text.slice(0,4)
    //支出为0，收入为1
    var inout = 0
    var info = text.slice(4)
    info = info.split('元',2)
    var count = parseInt(info[0])
    var note = info[1]
    var ex_type = this.data.expenditureTypesForDisplay;
    var in_type = this.data.incomeTypesForDisplay;
    //判断收支类型及账目类型
    var e_index = ex_type.indexOf(type)
    var i_index = in_type.indexOf(type)
    if(e_index != -1){
      inout = 0
      this.fill_inout(inout)
      this.fill_type(e_index)
      this.fill_count(count)
      this.fill_note(note)
    }
    else if(i_index != -1){
      inout = 1
      this.fill_inout(inout)
      this.fill_type(i_index)
      this.fill_count(count)
      this.fill_note(note)
    }else{
      //如果种类既不在已有的支出种类，又不在已有的收入种类，那么默认为支出种类
      inout = 0
      this.fill_inout(inout)
      this.fill_type(this.data.actualTypesForDisplay.length-1)
      this.fill_count(count)
      this.fill_note(note)
    }
  },
  // 松开按钮结束录音
  finger_touch_stop() {
    recorderManager.stop();
  },

  onLoad: function() {
    this.setData({
      date: this.getDefaultDate(),
      actualTypesForDisplay: this.data.expenditureTypesForDisplay
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
        actualTypesForDisplay: this.data.expenditureTypesForDisplay,
        actualTypes: this.data.expenditureTypes
      })
    } else {
      this.setData({
        actualTypesForDisplay: this.data.incomeTypesForDisplay,
        actualTypes: this.data.incomeTypes
      })
    }
  },
  //选择消费类型
  chooseType(e){
    this.setData({
      typeValue: e.detail.value
    })
    console.log("e.detail.value是",e.detail.value)

  },

  // 提交表单
  formSubmit(e) {
    let _this=this
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
    else{
      consume_num *= 1
    }
    let consume_date = e.detail.value.date
    let consume_remarks = e.detail.value.remarks
    console.log("e.detail是：",e.detail)
    wx.showLoading({
      title: '正在保存',
    })
    db.collection(consume_type).add({
      data:{
        "money":consume_num,
        "date":new Date(consume_date),
        "notes":consume_remarks
      }
    })
    console.log(_this.data.actualTypesForDisplay)
    db.collection('zhangbu').add({
      data:{
        "money":consume_num,
        "date":new Date(consume_date),
        "notes":consume_remarks,
        "type":_this.data.actualTypesForDisplay[_this.data.typeValue]
      }
    }).then(res=>{
      console.log('存到账簿里',res)
    })
    console.log("类型",_this.data.actualTypesForDisplay[_this.data.typeValue])
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
  },
  bindDateChange: function(e){
    console.log(e.detail)
    this.setData({
      date:e.detail.value
    })
  }
})
