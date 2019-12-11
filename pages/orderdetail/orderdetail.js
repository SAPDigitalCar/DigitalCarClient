// pages/orderdetail/orderdetail.js
const app = getApp()

Page({
  /**
   * Page initial data
   */
  data: {
    ticketDetail: null,
    ticket: null,
    passengers: null,
    driver: null,
    licensePlateNumber: "",
    carDescription: '',
    seatCount: '',
    nickName: '',
    avatarUrl: '',
    departureTime: '',
    price: '',
    departureAddresses: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    this.loadDetail(options.id);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {


  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  loadDetail: function(id) {
    let that = this;
    wx.request({
      url: app.globalData.host + '/ticket/detail/' + id,
      header: {
        openId: app.globalData.openId
      },
      method: 'get',
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200 && res.data && res.data.data) {
          that.setData({
            ticketDetail: res.data.data,
            driver: res.data.data.driver,
            passengers: res.data.data.passengers,
            ticket: res.data.data.ticket,
            licensePlateNumber: res.data.data.driver.licensePlateNumber,
            carDescription: res.data.data.driver.carDescription,
            seatCount: res.data.data.driver.seatCount,
            nickName: res.data.data.driver.nickname,
            avatarUrl: res.data.data.driver.avatarUrl,
            departureTime: res.data.data.ticket.departureTime,
            price: res.data.data.ticket.price,
            departureAddresses: res.data.data.ticket.departureAddresses,
          })

        }
      },
      fail: function(error) {
        console.log(error);
      }
    });
  },



  tryJoin: function() {
    let that = this
    wx.showActionSheet({
      itemList: ['Join This Car'],
      success(res) {
        wx.request({
          url: app.globalData.host + '/order/save',
          header: {
            openId: app.globalData.openId
          },
          data: {
            "ticketId": that.data.ticket.id
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
          fail: function(error) {
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