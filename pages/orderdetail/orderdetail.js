// pages/orderdetail/orderdetail.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
      ticketDetail:null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //  + options.id
    wx.request({
      url: app.globalData.host + '/ticket/detail/1',
      header: {
        openId: app.globalData.openId
      },
      method: 'get',
      success: res => {
        if (res.statusCode == 200 && res.data) {
          this.data.ticketDetail=res.data
        }
      },
      fail: function (error) {
        console.log(error);
      }
    });

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  tryJoin: function() {
    wx.showActionSheet({
      itemList: ['Join This Car'],
      success(res) {
        wx.request({
          url: app.globalData.host + '/order/save',
          header: {
            openId: 'omwhI40otCKfxBAbxK9T2Oim3xdU'
          },
          data: {
            "ticketId": 2
          },
          method: 'post',
          success: res => {
            if (res.statusCode == 200 && res.data) {
              wx.switchTab({
                url: '/pages/square/square'
              })
              wx.showToast({
                title: "Seats Reserved",
                duration: 2000,
                icon: 'success',
                width: 100,
              })
            }
          },
          fail: function (error) {
            wx.showToast({
              title: "Join Failed",
              duration: 2000,
              icon: 'fail',
              width: 100,
            })
            console.log(error);
          }
        });

      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }

})