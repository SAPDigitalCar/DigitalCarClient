// pages/square/square.js

let app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    licensePlateNumber:null,
    dest: "",
    multiArray: [
      ['1号线', '2号线'],
      ['莘庄', '外环路', '莲花路', '锦江乐园', '上海南站', '漕宝路', '上海体育馆', '徐家汇', '衡山路', '常熟路', '陕西南路', '黄陂南路', '人民广场', '新闸路', '汉中路', '上海火车站', '中山北路', '延长路', '上海马戏城', '汶水路', '彭浦新村', '共康路', '通河新村', '呼兰路', '共富新村', '宝安公路', '友谊西路', '富锦路']
    ],
    multiIndex: [0, 0],
    tickets: []
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showLoading({
      title: 'Loading',
      mask: true
    })
    let openId = app.globalData.openId
    if (!openId) {
      this.getOpenId();
    } else {
      let userInfo = app.globalData.userInfo
      if (!userInfo) {
        this.goLogin(openId);
      } else {
        this.getTicketsInfo();
      }
    }
  },

  getOpenId: function() {
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          app.globalData.status = 1
          wx.request({
            url: app.globalData.host + '/user/openid?code=' + res.code,
            method: 'get',
            success: res => {
              if (res.data.status == 200 && res.data.data) {
                // openID保存在全局，保存手机号
                app.globalData.openId = res.data.data;
                if (!app.globalData.userInfo) {
                  this.goLogin(res.data.data);
                }
              }
            },
            fail: function(error) {
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
      fail: res => {},
      complete: res => {},
    })
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
    let that = this;
    if (app.globalData.userInfo) {
      that.setData({ licensePlateNumber: app.globalData.userInfo.licensePlateNumber })
      if (that.data.dest){
        that.getTicketsInfoWithDest(that.data.dest);
      }
      else {
        that.getTicketsInfo();
      }
    }
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

  onPublishClick: function() {
    wx.navigateTo({
      url: '../publish/publish'
    });
  },

  goDetail: function(e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../orderdetail/orderdetail?id=' + id
    });
  },

  goLogin: function(openid) {
    let that=this
    wx.request({
      url: app.globalData.host + '/user/info',
      header: {
        openId: openid
      },
      method: 'get',
      success: res => {
        if (res.statusCode == 200 && res.data && res.data.data) {
          app.globalData.vo = res.data.data;
          if (!res.data.data.phone) {
            wx.navigateTo({
              url: '/pages/completeInfo/completeInfo'
            })
          } else { //登陆成功 保存信息
            app.globalData.userInfo = res.data.data
            that.setData({ licensePlateNumber: res.data.data.licensePlateNumber})
            this.getTicketsInfo();
          }
        } else {
          wx.showToast({
            title: '网络异常，请稍后重试',
            duration: 10000,
            icon: 'none'
          })
        }
      },
      fail: function(error) {
        console.log(error)
        wx.showToast({
          title: '登录失败，请检查网络稍后重试',
          duration: 2000,
          icon: 'none'
        })
      }
    });
  },
  bindMultiPickerChange: function(e) {
    let that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let newLine = that.data.multiArray[0][e.detail.value[0]];
    let newStop = that.data.multiArray[1][e.detail.value[1]];

    that.setData({
      dest: newLine + newStop
    })

    that.getTicketsInfoWithDest(newLine + newStop);
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 1:
            data.multiArray[1] = ['徐泾东', '虹桥火车站', '虹桥2号航站楼', '淞虹路', '北新泾', '威宁路', '娄山关路', '中山公园', '江苏路', '静安寺', '南京西路', '人民广场', '南京东路', '陆家嘴', '东昌路', '世纪大道', '上海科技馆', '世纪公园', '龙阳路', '张江高科', '金科路', '广兰路', '唐镇', '创新中路', '华夏东路', '川沙', '凌空路', '远东大道', '海天三路', '浦东国际机场'];
            break;
          case 0:
            data.multiArray[1] = ['莘庄', '外环路', '莲花路', '锦江乐园', '上海南站', '漕宝路', '上海体育馆', '徐家汇', '衡山路', '常熟路', '陕西南路', '黄陂南路', '人民广场', '新闸路', '汉中路', '上海火车站', '中山北路', '延长路', '上海马戏城', '汶水路', '彭浦新村', '共康路', '通河新村', '呼兰路', '共富新村', '宝安公路', '友谊西路', '富锦路'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },

  getTicketsInfoWithDest: function(dest) {
    let that = this;
    wx.request({
      url: app.globalData.host + '/square/select?destination=' + dest,
      header: {
        openId: app.globalData.openId
      },
      method: 'get',
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          that.setData({
            tickets: res.data.data.tickets
          });

        } else {
          wx.showToast({
            title: '网络异常，请稍后重试',
            duration: 10000,
            icon: 'none'
          })
        }
      },
      fail: function(error) {
        console.log(error)
        wx.showToast({
          title: '登录失败，请检查网络稍后重试',
          duration: 2000,
          icon: 'none'
        })
      }
    });
  },
  getTicketsInfo: function() {
    let that = this;
    wx.request({
      url: app.globalData.host + '/square/all',
      header: {
        openId: app.globalData.openId
      },
      method: 'get',
      success: res => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          that.setData({
            dest: res.data.data.addresses[0].address,
            tickets: res.data.data.tickets
          });

        } else {
          wx.showToast({
            title: '网络异常，请稍后重试',
            duration: 10000,
            icon: 'none'
          })
        }
      },
      fail: function(error) {
        console.log(error)
        wx.showToast({
          title: '登录失败，请检查网络稍后重试',
          duration: 2000,
          icon: 'none'
        })
      }
    });
  }
})