// pages/publish/publish.js
import Util from '../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTimeArray: null,
    startDateTime: null,
    startDateTimeVal: '',
    startYear: 2018,
    endYear: 2118,
    prices: ['10 ￥/person', '15 ￥/person', '20 ￥/person'],
    pricesIndex: 0,
    venues: ["Labs' gate", "ChangTai square"],
    venuesIndex: 0,
    destArray: [['1号线', '2号线'], ['莘庄', '外环路', '莲花路', '锦江乐园', '上海南站', '漕宝路', '上海体育馆', '徐家汇', '衡山路', '常熟路', '陕西南路', '黄陂南路', '人民广场', '新闸路', '汉中路', '上海火车站', '中山北路', '延长路', '上海马戏城', '汶水路', '彭浦新村', '共康路', '通河新村', '呼兰路', '共富新村', '宝安公路', '友谊西路', '富锦路']],
    destIndex: [0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initDateTimePicker();
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
      // endDateTime: dateTimeObj.dateTime
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