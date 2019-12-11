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
    venues: ["Labs' gate", "ChangTai square"],
    venuesIndex: 0,
    multiArray: [['1号线', '2号线'], ['莘庄', '外环路', '莲花路', '锦江乐园', '上海南站', '漕宝路', '上海体育馆', '徐家汇', '衡山路', '常熟路', '陕西南路', '黄陂南路', '人民广场', '新闸路', '汉中路', '上海火车站', '中山北路', '延长路', '上海马戏城', '汶水路', '彭浦新村', '共康路', '通河新村', '呼兰路', '共富新村', '宝安公路', '友谊西路', '富锦路']],
    multiIndex: [0, 0],
    dest: '',
    loadlimitIndex: 0,
    loadlimitRange: [1, 2, 3, 4, 5, 6]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initDateTimePicker();
    this.loadUserWithAddress();
  },

  bindLoadlimitChange: function (e) {
    this.setData({ 'loadlimitIndex': e.detail.value });
  },

  loadUserWithAddress: function () {
    wx.request({
      url: app.globalData.host + '/address/all',
      header: {
        openId: app.globalData.openId
      },
      method: 'get',
      success: res => {
        if (res.statusCode == 200 && res.data && res.data.data) {
             if(res.data.data.addresses){
               this.setData({
                 dest: res.data.data.addresses[0].address
               })
             }
             this.setData({
              userInfo: res.data.data.user
            });
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
    if(!value.price) {
      wx.showToast({
        title: 'Please enter prive and publish again',
        duration: 2000,
        icon: 'none'
      });
      return;
    } else if (!value.seatCount) {
      wx.showToast({
        title: 'Please enter number of seats you can provide and publish again',
        duration: 2000,
        icon: 'none'
      });
      return;
    } else if (!value.boarding) {
      wx.showToast({
        title: 'Please enter a place to meet and publish again',
        duration: 2000,
        icon: 'none'
      });
      return;
    } else {
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
    }
    
  },

  bindVenuesChange: function(e){
    this.setData({
      venuesIndex: e.detail.value
    })
  },

  bindPriceChange: function(e){
    this.setData({
      pricesIndex : e.detail.value
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let newLine = this.data.multiArray[0][e.detail.value[0]];
    let newStop = this.data.multiArray[1][e.detail.value[1]];
    this.setData({
      dest: newLine + newStop
    })
  },
  bindMultiPickerColumnChange: function (e) {
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

  buildTicketDetail: function(value){
    let startDateTimeVal = this.data.startDateTimeVal.replace(" ", "T") + ":00.000+0000";
    let addressList = [];
    addressList.push(this.data.dest);
    let departureAddresses = [];
    departureAddresses.push(value.boarding);
    let ticketDetail = {
      "departureTime": startDateTimeVal,
      "seats": value.seatCount,
      "price": value.price,
      "destinationAddresses": addressList,
      "userId": this.data.userInfo.id,
      "departureAddresses": departureAddresses
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