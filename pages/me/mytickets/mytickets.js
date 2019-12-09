const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myTickets: [{
      "licensePlateNumber": "沪A12345",
      "departureTime": "2019-12-08 18:30",
      "departureLocation": "SAP Labs China",
      "destination": "2号线云山路"
    },
    {
      "licensePlateNumber": "沪A23456",
      "departureTime": "2019-12-08 09:00",
      "departureLocation": "2号线云山路",
      "destination": "SAP Labs China"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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