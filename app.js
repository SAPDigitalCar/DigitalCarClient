//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          this.globalData.status = 1
          wx.request({
            url: this.globalData.host + '/user/openid?code=' + res.code,
            method: 'get',
            success: res => {
              if (res.data.status==200 && res.data.data) {//获取unionId成功
                // openID保存在全局，保存手机号
                this.globalData.openId = res.data.data;
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
  goLogin: function (openid) {
    let that = this;
    wx.request({
      url: this.globalData.host + '/user/info',
      header: {
        openId: openid
      },
      method: 'get',
      success: res => {
        if (res.statusCode == 404) {
          wx.navigateTo({
            url: '/pages/completeInfo/completeInfo'
          })
        } else if (res.statusCode == 200) {
          //  登录成功，保存相关信息，跳转首页
          wx.redirectTo({
            url: "/pages/index"
          })
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
  globalData: {
    userInfo: null,
    host: 'https://carapi.techtuesday.club',
    openId: ''
  }
})
