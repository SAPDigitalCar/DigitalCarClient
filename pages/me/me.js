const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {    "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/gkiaIOSiaOLDBZTQCsRpxWbFbVnflJBJFhdXCq9MN7YnowdpOm9Jj2onYMuyMHZhhzhsRu6vLRo1cUljfaB1UjfA/132",
    "nickName":"芒果",
    "gender": 2
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },

  listMyOrders: function () {
    wx.navigateTo({
      url: '/pages/me/myorders/myorders'
    })
  },

  listMyTickets: function () {
    wx.navigateTo({
      url: '/pages/me/mytickets/mytickets'
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