// pages/square/square.js

let app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    inputShowed: false,
    inputVal: "",
    cars: [{ "id": "1", "time": "5:30pm", "destination": "jinqiao" }, { "id": "2", "time": "4:30pm", "destination": "gaohang" }]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          app.globalData.status = 1
          wx.request({
            url: app.globalData.host + '/user/openid?code=' + res.code,
            method: 'get',
            success: res => {
              if (res.data.status==200 && res.data.data) {//获取unionId成功
                // openID保存在全局，保存手机号
                app.globalData.openId = res.data.data;
                this.goLogin(res.data.data);
              }
            },
            fail: function (error) {
              console.log(error)
            }
          });
        } else {
          // 微信登录失败
          wx.showToast({
            title: '网络异常，请稍后重试',
            duration: 2000,
            icon: 'none'
          })
        }
      },
      fail: res => { },
      complete: res => { },
    })
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

  goLogin: function (openid) {
    wx.request({
      url: app.globalData.host + '/user/info',
      header: {
        openId: openid
      },
      method: 'get',
      success: res => {
        if (res.statusCode == 200 && res.data && res.data.data) {
          app.globalData.vo=res.data.data
          if (!res.data.data.phone) {
            wx.navigateTo({
              url: '/pages/completeInfo/completeInfo'
            })
          } else {//登陆成功 保存信息
            app.globalData.userInfo=res.data.data
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试',
            duration: 10000,
            icon: 'none'
          })
        }
      },
      fail: function (error) {
        console.log(error)
        wx.showToast({
          title: '登录失败，请检查网络稍后重试',
          duration: 2000,
          icon: 'none'
        })
      }
    });
  },

  
    showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})
