// pages/square/square.js
Page({

  /**
   * Page initial data
   */
  data: {
    inputShowed: false,
    inputVal: "",
    cars: [{ "id": "1", "time": "5:30pm", "destination": "jinqiao" }, { "id": "2", "time": "4:30pm", "destination": "gaohang" }, { "id": "1", "time": "5:30pm", "destination": "jinqiao" }, { "id": "2", "time": "4:30pm", "destination": "gaohang" }, { "id": "1", "time": "5:30pm", "destination": "jinqiao" }, { "id": "2", "time": "4:30pm", "destination": "gaohang" }],
    isDriver: true
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

  goDetail: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
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
  },
  onPublishClick: function () {
    wx.navigateTo({
      url: '../publish/publish'
    });
  }

})
