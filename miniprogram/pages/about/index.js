const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {

  },

   handleItem(event) {
    // console.log(event.currentTarget.dataset.name)
    let name = event.currentTarget.dataset.name
    wx.navigateTo({
      url: `../${name}/index`,
    })
  }
})
