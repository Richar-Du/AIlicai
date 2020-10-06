import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
const db = wx.cloud.database()
const jtcx = db.collection('jtcx')
const jjwy = db.collection('jjwy')
// const qita = db.collection('qita')
const cysg = db.collection('cysg')
const yfsp = db.collection('yfsp')
const user = db.collection('user')

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  let output=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  let categories=["yfsp","cysg","lsyj","zfqc","jjwy","jtcx","lxyw","ylyy","mrmf","ywzc","txhf","rqwl","gwyl","hnyc","dzsm","ydjs","xxbg","axcs","qtzc"];
  let categories_title=["衣服饰品","餐饮蔬果","零食烟酒","住房汽车","家居物业","交通出行","旅行游玩","医疗医药","美容美发","意外支出","通讯话费","人情往来","购物娱乐","花鸟鱼虫","电子数码","运动健身","学习办公","爱心慈善","其他支出"];
    for (let category=0;category < categories.length; category++){  //遍历每一个账簿
      db.collection(categories[category]).where({
        _openid:app.globalData.openid    //根据openid找到这个用户
      }).get().then(res=>{
        console.log(res.data);    //  该账簿下该用户的数据
        for (let i=0;i<res.data.length;i++){
          output[category]-=res.data[i].money
        }
        console.log(categories[category],"该账簿下共消费：",output[category]);
        var option = {
          title: {
              text: '消费比例分布',
              left: 'center'
          },
          tooltip: {},
        //   legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ["衣服饰品","餐饮蔬果","零食烟酒","住房汽车","家居物业","交通出行","旅行游玩","医疗医药","美容美发","意外支出","通讯话费","人情往来","购物娱乐","花鸟鱼虫","电子数码","运动健身","学习办公","爱心慈善","其他支出"]
        // },
          // xAxis: {
          //     data: ["出行","居家","食品","衣服"]
          // },
          // yAxis: {},
          series: [{
              name: '开销',
              type: 'pie',
              data: [
                {value: output[0], name: categories_title[0]},
                {value: output[1], name: categories_title[1]},
                {value: output[2], name: categories_title[2]},
                {value: output[3], name: categories_title[3]},
                {value: output[4], name: categories_title[4]},
                {value: output[5], name: categories_title[5]},
                {value: output[6], name: categories_title[6]},       
                {value: output[7], name: categories_title[7]},
                {value: output[8], name: categories_title[8]},
                {value: output[9], name: categories_title[9]},
                {value: output[10], name: categories_title[10]},
                {value: output[11], name: categories_title[11]},
                {value: output[12], name: categories_title[12]},
                {value: output[13], name: categories_title[13]},
                {value: output[14], name: categories_title[14]},
                {value: output[15], name: categories_title[15]},
                {value: output[16], name: categories_title[16]},
                {value: output[17], name: categories_title[17]},
                {value: output[18], name: categories_title[18]},
              ]
          }]
        };
        chart.setOption(option);
        return chart;
      })
    }

  
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart     //一定要有这个！！！
    },
    abnormal:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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