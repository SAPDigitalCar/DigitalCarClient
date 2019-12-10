// pages/orderdetail/orderdetail.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/gkiaIOSiaOLDBZTQCsRpxWbFbVnflJBJFhdXCq9MN7YnowdpOm9Jj2onYMuyMHZhhzhsRu6vLRo1cUljfaB1UjfA/132",
      "nickName": "芒果",
      "gender": 2,
    },
    people: [{
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/gkiaIOSiaOLDBZTQCsRpxWbFbVnflJBJFhdXCq9MN7YnowdpOm9Jj2onYMuyMHZhhzhsRu6vLRo1cUljfaB1UjfA/132",
      "nickName": "芒果"
    }, {
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/gkiaIOSiaOLDBZTQCsRpxWbFbVnflJBJFhdXCq9MN7YnowdpOm9Jj2onYMuyMHZhhzhsRu6vLRo1cUljfaB1UjfA/132",
        "nickName": "芒果"
      }, {
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/gkiaIOSiaOLDBZTQCsRpxWbFbVnflJBJFhdXCq9MN7YnowdpOm9Jj2onYMuyMHZhhzhsRu6vLRo1cUljfaB1UjfA/132",
        "nickName": "芒果"
      }],
      ticketDetail:null,
      ticket:null,
      passengers:null,
      driver:null,
      licensePlateNumber: "",
      carDescription:'',
      seatCount:'',
      nickName:'',
      avatarUrl:'',
      departureTime:'',
      price:'',
      departureAddresses:null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //  + options.id
    let data = {
      ticketDetail:null,
      driver:null,
      passengers:null,
      ticket:null,
      licensePlateNumber: "",
      carDescription:'',
      seatCount:'',
      nickName:'',
      avatarUrl:'',
      departureTime:'',
      price:'',
      departureAddresses:''
    };
    wx.request({
      url: app.globalData.host + '/ticket/detail/5',
      header: {
        openId: app.globalData.openId
      },
      method: 'get',
      success: res => {
        if (res.statusCode == 200 && res.data && res.data.data) {
          data.ticketDetail=res.data.data
          data.driver=res.data.data.driver
          data.passengers = res.data.data.passengers
          data.ticket = res.data.data.ticket
          data.licensePlateNumber = data.driver.licensePlateNumber;
          data.carDescription=data.driver.carDescription;
          data.seatCount=data.driver.seatCount
          data.nickName=data.driver.nickname
          data.avatarUrl=data.driver.avatarUrl
          data.departureTime=data.ticket.departureTime
          data.price=data.ticket.price
          data.departureAddresses=data.ticket.departureAddresses
          this.setData(data)
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
    let that=this
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
