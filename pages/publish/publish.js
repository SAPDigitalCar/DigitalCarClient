// pages/publish/publish.js
import Util from '../../utils/util';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    dateTimeArray: null,
    startDateTime: null,
    startDateTimeVal: '',
    startYear: 2019,
    endYear: 2119,
    prices: [10, 15, 20],
    pricesIndex: 0,
    items: ['1号线莘庄', '1号线外环路', '1号线莲花路'],
    venues: ["Labs' gate", "ChangTai square"],
    venuesIndex: 0,
    destArray: [['1号线', '2号线'], ['莘庄', '外环路', '莲花路', '锦江乐园', '上海南站', '漕宝路', '上海体育馆', '徐家汇', '衡山路', '常熟路', '陕西南路', '黄陂南路', '人民广场', '新闸路', '汉中路', '上海火车站', '中山北路', '延长路', '上海马戏城', '汶水路', '彭浦新村', '共康路', '通河新村', '呼兰路', '共富新村', '宝安公路', '友谊西路', '富锦路']],
    destIndex: [0, 0],
    loadlimitIndex: 0,
    loadlimitRange: [1, 2, 3, 4, 5, 6]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initDateTimePicker();
   // this.getUserDetails();
    this.data.userInfo = app.globalData.userInfo;
    this.setData({
      loadlimitIndex: this.data.loadlimitRange.indexOf(this.data.userInfo.seatCount)
    });
    console.log('loadlimitIndex: ' + this.data.loadlimitIndex);
  },

  bindLoadlimitChange: function (e) {
    this.setData({ 'loadlimitIndex': e.detail.value });
  },
 /*
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

  onSubmit: function (event) {
    let value = event.detail.value;
    let ticketDetail = this.buildTicketDetail(value);
    wx.request({
      url: app.globalData.host + '/ticket/save',
      header: {
        openId: app.globalData.openId
      },
      data: ticketDetail,
      method: 'post',
      success: res => {
        if (res.statusCode == 200 && res.data && res.data.data) {
          wx.showToast({
            title: 'Success',
            duration: 1500,
            icon: 'success'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1000);
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

  buildTicketDetail: function(value){
    let startDateTimeVal = this.data.startDateTimeVal;
    let ticketDetail = {
      "departureTime": "2019-12-09T14:57:54.594Z",
      "seats": this.data.loadlimitRange[value.seatCount],
      "price": this.data.prices[value.price],
      "destinationAddresses": this.data.items,
      "userId": this.data.userInfo.id,
      "departureAddresses": this.data.venues
    };
    return ticketDetail;
  },


  changeSartDateTimeVal(e) {
    let dateTime = e.detail.value;
    let startDateTimeVal = this._calDateTimeVal(dateTime);
    this.inputChange('startDateTimeVal', startDateTimeVal);
  },

  changeStartDateTimeColumn(e) {
    let arr = this.data.startDateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = Util.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      startDateTime: arr
    });
  },

  inputChange: function (name, value) {
    this.setData({
      [name]: value
    });
  },


  _initDateTimePicker: function () {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    let dateTimeObj = Util.dateTimePicker(this.data.startYear, this.data.endYear);
    let dateTimeArray = dateTimeObj.dateTimeArray;
    let dateTime = dateTimeObj.dateTime;

    let startDateTimeVal = this._calDateTimeVal(dateTime, dateTimeArray)

    this.setData({
      dateTimeArray: dateTimeArray,
      startDateTime: dateTime,
      startDateTimeVal: startDateTimeVal
    });
  },

  _calDateTimeVal: function (dateTime, oriDateTimeArray) {
    let dateTimeArray = this.data.dateTimeArray || oriDateTimeArray;
    let temp = dateTime.map((val, i) => {
      return dateTimeArray[i][val];
    });
    let dateTimeVal = `${temp[0]}-${temp[1]}-${temp[2]} ${temp[3]}:${temp[4]}`;
    console.log(dateTimeVal);
    return dateTimeVal;
  },
})