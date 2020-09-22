// miniprogram/pages/questionnaire/questionnaire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer:{},
    items:[
      {
        q:"您的年龄是？",
        a:[
          {number:1, value:"1A", name:"22岁以下"},
          {number:1, value:"1B", name:"22~32岁"}, 
          {number:1, value:"1C", name:"32~52岁"},
          {number:1, value:"1D", name:"52~65岁"},
          {number:1, value:"1E", name:"大于65岁"}]
      },
      {
        q:"您正处于的生命周期是？",
        a:[
          {value:"2A", name:"单身阶段"}, 
          {value:"2B", name:"家庭建立阶段"},
          {value:"2C", name:"家庭成长阶段"},
          {value:"2D", name:"子女大学阶段"},
          {value:"2E", name:"家庭成熟阶段"},
          {value:"2F", name:"退休养老阶段"}]
      },
      {
        q:"您每月的收入是？",
        a:[
          {value:"3A", name:"3000元以下"},
          {value:"3B", name:"3000~8000元"}, 
          {value:"3C", name:"8000~15000元"}, 
          {value:"3D", name:"15000~50000元"}, 
          {value:"3E", name:"50000元以上"}]
      },
      {
        q:"可以承受的投资时间为？",
        a:[
          {value:"4A", name:"3个月以内"}, 
          {value:"4B", name:"6个月以内"}, 
          {value:"4C", name:"一年以内"}, 
          {value:"4D", name:"1~3年"}, 
          {value:"4E", name:"3~5年"}, 
          {value:"4F", name:"5年以上"}]
      },
      {
        q:"更偏向的投资模式为？",
        a:[
          {value:"5A", name:"本金不亏损，最高收益4%"}, 
          {value:"5B", name:"本金最多亏损5%，最高收益15%"}, 
          {value:"5C", name:"本金最多亏损10%，最高收益25%"}, 
          {value:"5D", name:"本金最多亏损20%，最高收益40%"}]
      },
      {
        q:"理财预期耗费精力？",
        a:[
          {value:"6A", name:"关注较多，及时调整"}, 
          {value:"6B", name:"关注较少，长期持有"}]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      answer:{}
    })
  },

  radioChange(e) {
    console.log(e.detail.value)
    var a = e.detail.value;
    for(var i = 0;i<a.length; i++){
         var t = Number(a[i]);
         if(t) {
            var temp = t
         }
    }
    console.log(temp)
    const dict = this.data.answer
    dict[temp.toFixed(0)] = a
    console.log(dict)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
  },

  onbindsubmit(e) {
    console.log(e)
  }
})