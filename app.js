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
            url: '/api/system/wx?code=' + res.code,
            method: 'get',
            success: res => {
              if (res.statusCode == 200 && res.data.unionid) {//获取unionId成功
                this.goLogin(res.data.unionid);
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

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
  goLogin: function (unionid) {
    let that = this;
    ajax.request({
      url: '/api/user/login',
      data: {
        LoginType: 'weixin',
        unionid: unionid
      },
      method: 'post',
      success: res => {
        // unionid保存在全局，保存手机号
        that.globalData.unionid = unionid;
        if (that.unionidCallback) {
          that.unionidCallback(unionid);
        }
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            //  登录成功，保存相关信息，跳转首页
            wx.redirectTo({
              url: "/pages/index"
            })
          } else if (res.data.code == -1){
            // 完善用户信息
          } else{
            wx.showToast({
              title: '网络异常，请稍后重试',
              duration: 10000,
              icon: 'none'
            })
          }
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
    unionid: '',
    userInfo: null,
  }
})
