// miniprogram/pages/questionare-result/questionare-result.js
const app=getApp()
const db = wx.cloud.database()
const qcollection = db.collection('questionnaire')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active:0,
		robust:0,
		conservative:0,
		stratergy:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let _this = this
		var active=_this.data.active
		var robust=_this.data.robust
		var conservative=_this.data.conservative
		qcollection.where({
      _openid:app.globalData.openid
    }).get().then(res=>{
			console.log(res.data[0].answer.q2)
			//第一层叶子节点：把用户分成激进、稳健、保守
			switch(res.data[0].answer.q2){
				case '单身阶段':
					active+=70
					robust+=20
					conservative+=10
					break;
				case '家庭建立阶段':
					active+=50
					robust+=30
					conservative+=20
					break;
				case '家庭成长阶段':
					active+=40
					robust+=40
					conservative+=20
					break;
				case '子女大学阶段':
					active+=30
					robust+=50
					conservative+=20
					break;
				case '家庭成熟阶段':
					active+=20
					robust+=30
					conservative+=50
					break;
				case '退休养老阶段':
					active+=10
					robust+=30
					conservative+=60
					break;						
			}
			switch(res.data[0].answer.q3){
				case '3000元以下':
					active+=10
					robust+=10
					conservative+=80
					break;
				case '3000~8000元':
					active+=20
					robust+=20
					conservative+=60
					break;
				case '8000~15000元':
					active+=40
					robust+=30
					conservative+=30
					break;
				case '15000~50000元':
					active+=50
					robust+=30
					conservative+=20
					break;
				case '50000元以上':
					active+=70
					robust+=20
					conservative+=10
					break;						
			}
			switch(res.data[0].answer.q5){
				case '本金不亏损，最高收益4%':
					active+=10
					robust+=10
					conservative+=80
					break;
				case '本金最多亏损5%，最高收益15%':
					active+=20
					robust+=20
					conservative+=60
					break;
				case '本金最多亏损10%，最高收益25%':
					active+=40
					robust+=30
					conservative+=30
					break;
				case '本金最多亏损20%，最高收益40%':
					active+=50
					robust+=30
					conservative+=20
					break;					
			}
			var stratergy=0
			//第二层叶子节点：根据承受时间配置不同的理财方案
			switch(Math.max(active,robust,conservative)){
				case active:
					if (res.data[0].answer.q4=='3个月以内' || res.data[0].answer.q4=='6个月以内'){
						stratergy=2
					}
					else
						stratergy=1
					break
				case robust:
					if (res.data[0].answer.q4=='3个月以内' || res.data[0].answer.q4=='6个月以内'){
						stratergy=3
					}
					else
						stratergy=4
					break
					case conservative:
						stratergy=5
			}
			_this.setData({
				active:active,
				robust:robust,
				conservative:conservative,
				stratergy:stratergy
			})
			console.log(_this.data.stratergy)
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

	},
	toRecommendation:function(e){
		var stratergy=this.data.stratergy
		wx.reLaunch({
			url:'/pages/market/market?id='+stratergy
		})
	}
})