// pages/statistics2/index.js
import * as echarts from '../../ec-canvas/echarts';

const app =getApp()
const db = wx.cloud.database()
const axcs=db.collection('axcs')
const cysg=db.collection('cysg')
const dzsm=db.collection('dzsm')
const gwyl=db.collection('gwyl')
const hnyc=db.collection('hnyc')
const jjsr=db.collection('jjsr')
const jjwy = db.collection('jjwy')
const jtcx = db.collection('jtcx')
const lsyj = db.collection('lsyj')
const lxyw = db.collection('lxyw')
const mrmf = db.collection('mrmf')
const qtsr = db.collection('qtsr')
const qtzc = db.collection('qtzc')
const rqwl = db.collection('rqwl')
const txhf = db.collection('txhf')
const tzlc = db.collection('tzlc')
const xsjj = db.collection('xsjj')
const xxbg = db.collection('xxbg')
const ydjs = db.collection('ydjs')
const yfsp = db.collection('yfsp')
const ylyy = db.collection('ylyy')
const ywzc = db.collection('ywzc')
const zfqc = db.collection('zfqc')
// const qita = db.collection('qita')
const user = db.collection('user')

const curDate = new Date();
const year = curDate.getFullYear()
const month = curDate.getMonth() + 1
const date = curDate.getDate()

let pageInstance={}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		collection_name:'a',
		ec: {
			onInit: initChart,
    }		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		pageInstance=this
		console.log("options.id:", options.id)
    this.setData({
      collection_name: options.id
    })
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

function initChart(canvas, width, height, dpr,) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
	let output=[0,0,0,0,0,0,0,0,0,0,0,0];
	var collection_name=null;
	switch(pageInstance.data.collection_name){
		case 'yfsp':
			collection_name=yfsp
			break;
		case 'cysg':
			collection_name=cysg
			break;
		case 'yjls':
			collection_name=yjls
			break;
		case 'jjwy':
			collection_name=jjwy
			break;
		case 'jtcx':
			collection_name=jtcx
			break;
		case 'ylyy':
			collection_name=ylyy
			break;
		case 'mrmf':
			collection_name=mrmf
			break;
		case 'txhf':
			collection_name=txhf
			break;
		case 'gwyl':
			collection_name=gwyl
			break;
		case 'dzsm':
			collection_name=dzsm
			break;
		case 'ydjs':
			collection_name=ydjs
			break;
		case 'xxbg':
			collection_name=xxbg
			break;
	}
	collection_name.where({
		_openid:app.globalData.openid
	}).get().then(res=>{
		for(let i=0;i<res.data.length;i++){
			var consume_month=res.data[i].date.getMonth()		//获取月份
			output[consume_month]-=res.data[i].money
		}
		console.log(res.data);    //  该账簿下该用户的数据
		var option = {
			title: {
					text: '本年度消费曲线',
					left: 'center'
			},
			tooltip: {},
			
			xAxis: {
				type: 'category',
				name: '月份',
				nameTextStyle: {
					color: 'white',
					fontWeight: 'normal',
				},
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				axisLine: {
					show: true
				},
				axisLabel: {
					show: true,
					margin: 20,
					textStyle: {
						color: 'white',
						fontWeight: 'bold',
					},
				},
				boundaryGap: true,
			},
			yAxis: {
				type: 'value',
						name: '支出/元',
						nameTextStyle: {
							color: 'white',
							fontWeight: 'normal',
						},
						min: 0,
						// max: 140,
						splitNumber: 4,
						splitLine: {
							show: true,
							lineStyle: {
								color: 'rgba(255,255,255,0.5)'
							}
						},
						axisLine: {
							show: true,
						},
						axisLabel: {
							show: true,
							margin: 20,
							textStyle: {
								color: 'white',
								fontWeight: 'bold',
							},
						},
						axisTick: {
							show: true,
						},
			},
			series: [{
				showAllSymbol: true,
				symbol: 'circle',
				symbolSize: 10,
				lineStyle: {
					normal: {
						color: "#6c50f3",
						shadowColor: 'rgba(0, 0, 0, .3)',
						shadowBlur: 0,
						shadowOffsetY: 5,
						shadowOffsetX: 5,
					},
				},
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#6c50f3',
					}
				},
				itemStyle: {
					color: "#6c50f3",
					borderColor: "#fff",
					borderWidth: 3,
					shadowColor: 'rgba(0, 0, 0, .3)',
					shadowBlur: 0,
					shadowOffsetY: 2,
					shadowOffsetX: 2,
				},
				tooltip: {
					show: false
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(108,80,243,0.3)'
						},
						{
							offset: 1,
							color: 'rgba(108,80,243,0)'
						}
						], false),
						shadowColor: 'rgba(108,80,243, 0.9)',
						shadowBlur: 20
					}
				},
				name: '本年支出情况',
				type: 'line',
				data: output,
			}]
		};
		chart.setOption(option);
		return chart;
	})
}