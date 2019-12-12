const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myOrders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getOrderList();
  },

  getOrderList: function () {
    let that = this;
    let myOpenId = app.globalData.openId
    wx.request({
      url: app.globalData.host + '/order/list',
      header: {
        openId: myOpenId
      },
      method: 'get',
      success: res => {
        if (res.statusCode == 200) {
            if (res.data.data.length == 0) {
              wx.showToast({
                title: "You don't have any order yet :)",
                duration: 2000,
                icon: 'none',
              })
            }
            this.setData({
              myOrders: res.data.data
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

  },

  goDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../../orderdetail/orderdetail?id=' + id + '&entry=me'
    });
  },
})