// pages/completeInfo/completeInfo.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
      auth: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.data.auth=true;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
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
  imcustomer: function() {
    app.globalData.isDriver=false
    wx.requestSubscribeMessage({
      tmplIds: ['AMrTjuKs163p6F35h_dnd3M5NqhIkS2uRBBOoRiGADE'],
      success(res) {
        console.log(res.errMsg)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    }) 
  },
  imdriver: function () {
    app.globalData.isDriver=true
    wx.requestSubscribeMessage({
      tmplIds: ['AMrTjuKs163p6F35h_dnd3M5NqhIkS2uRBBOoRiGADE'],
      success(res) {
        console.log(res.errMsg)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })  
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindGetUserInfo (e) {
    this.setData({auth: true})
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
    wx.navigateTo({
      url: '/pages/imdriver/imdriver'
    })
  },
  userInfoReadyCallback (res) {
    this.setData({auth: true})
    app.globalData.userInfo = res.userInfo
  }
})
