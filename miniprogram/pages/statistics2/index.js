// pages/statistics2/index.js
import * as echarts from '../../ec-canvas/echarts';

const app=getApp()
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
  let output=[0,0,0,0,0,0,0,0,0,0,0,0];
  let categories=[jtcx,jjwy,cysg,yfsp];
    for (let category=0;category < categories.length; category++){  //遍历每一个账簿
      categories[category].where({
        _openid:app.globalData.openid    //根据openid找到这个用户
      }).get().then(res=>{
        console.log(res.data);    //  该账簿下该用户的数据
        for (let i=0;i<res.data.length;i++){
          output[category]-=res.data[i].money
        }
        console.log(categories[category].collectionName,"该账簿下共消费：",output[category]);
        var option = {
          title: {
              text: '消费比例分布',
              left: 'center'
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ["出行","居家","食品","衣服"]
        },
          // xAxis: {
          //     data: ["出行","居家","食品","衣服"]
          // },
          // yAxis: {},
          series: [{
              name: '开销',
              type: 'pie',
              data: [
                {value:output[0],name:"出行"},
                {value:output[1],name:"居家"},
                {value:output[2],name:"食品"},
                {value:output[3],name:"衣服"},          
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