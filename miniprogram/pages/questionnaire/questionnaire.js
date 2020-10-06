// miniprogram/pages/questionnaire/questionnaire.js
const app=getApp()
const db = wx.cloud.database()
const qcollection = db.collection('questionnaire')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    answer:{},
    items:[
      {
        q:"您的年龄是？",
        a:[
          {number:'q1', name:"22岁以下"},
          {number:'q1', name:"22~32岁"}, 
          {number:'q1', name:"32~52岁"},
          {number:'q1', name:"52~65岁"},
          {number:'q1', name:"大于65岁"}]
      },
      {
        q:"您正处于的生命周期是？",
        a:[
          {number:'q2', name:"单身阶段"}, 
          {number:'q2', name:"家庭建立阶段"},
          {number:'q2', name:"家庭成长阶段"},
          {number:'q2', name:"子女大学阶段"},
          {number:'q2', name:"家庭成熟阶段"},
          {number:'q2', name:"退休养老阶段"}]
      },
      {
        q:"您每月的收入是？",
        a:[
          {number:'q3', name:"3000元以下"},
          {number:'q3', name:"3000~8000元"}, 
          {number:'q3', name:"8000~15000元"}, 
          {number:'q3', name:"15000~50000元"}, 
          {number:'q3', name:"50000元以上"}]
      },
      {
        q:"可以承受的投资时间为？",
        a:[
          {number:'q4', name:"3个月以内"}, 
          {number:'q4', name:"6个月以内"}, 
          {number:'q4', name:"一年以内"}, 
          {number:'q4', name:"1~3年"}, 
          {number:'q4', name:"3~5年"}, 
          {number:'q4', name:"5年以上"}]
      },
      {
        q:"更偏向的投资模式为？",
        a:[
          {number:'q5', name:"本金不亏损，最高收益4%"}, 
          {number:'q5', name:"本金最多亏损5%，最高收益15%"}, 
          {number:'q5', name:"本金最多亏损10%，最高收益25%"}, 
          {number:'q5', name:"本金最多亏损20%，最高收益40%"}]
      },
      {
        q:"理财预期耗费精力？",
        a:[
          {number:'q6', name:"关注较多，及时调整"}, 
          {number:'q6', name:"关注较少，长期持有"}]
      }
    ],
    finished:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid =  wx.getStorageSync('mtj_uuid')
    let _this = this
    _this.setData({
      openid:openid
    })
    qcollection.where({
      _openid:app.globalData.openid
    }).get().then(res=>{
      console.log(res.data);
      if (res.data.length>0){
        _this.setData({
            finished:true
        })
      }
    })
  },

  onbutton: function(e) {
    const answer = this.data.answer
    const number = e.currentTarget.dataset.number
    answer[number] = e.currentTarget.dataset.total
    console.log(answer)
    const index = this.data.index
    this.setData({
      index:index+1
    })
    if(index == 5) {
      console.log('finish')
      qcollection.add({
        data:{
          answer:answer
        }
      })
      wx.navigateTo({
        url: '/pages/questionare-result/questionare-result',
      })
    }
  },
  navToResult:function(e){
    wx.redirectTo({
      url: '/pages/questionare-result/questionare-result'
    })
  }
})