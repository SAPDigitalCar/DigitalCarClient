// pages/imdriver/imdriver.js

const app = getApp();
import WXRequest from '../../utils/wxRequest';

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      dest: this.data.multiArray[0][0] + this.data.multiArray[1][0]
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
      this.setData({nickname: app.globalData.userInfo.nickName});
      this.setData({isDriver: app.globalData.isDriver});
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
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: e.detail.value,
      items: this.data.items
    };
    data.items.push({stopName:data.multiArray[0][e.detail.value[0]]+data.multiArray[1][e.detail.value[1]],
                     id:data.multiIndex[0]*100+data.multiIndex[1]});
    this.setData(data)
    this.setData({
      dest: data.multiArray[0][e.detail.value[0]] + data.multiArray[1][e.detail.value[1]]
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
            data.multiArray[1] = ['徐泾东','虹桥火车站','虹桥2号航站楼','淞虹路','北新泾','威宁路','娄山关路','中山公园','江苏路','静安寺','南京西路','人民广场','南京东路','陆家嘴','东昌路','世纪大道','上海科技馆','世纪公园','龙阳路','张江高科','金科路','广兰路','唐镇','创新中路','华夏东路','川沙','凌空路','远东大道','海天三路','浦东国际机场'];
            break;
          case 0:
            data.multiArray[1] = ['莘庄','外环路','莲花路','锦江乐园','上海南站','漕宝路','上海体育馆','徐家汇','衡山路','常熟路','陕西南路','黄陂南路','人民广场','新闸路','汉中路','上海火车站','中山北路','延长路','上海马戏城','汶水路','彭浦新村','共康路','通河新村','呼兰路','共富新村','宝安公路','友谊西路','富锦路'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },


  bindLoadlimitChange: function(e) {
    this.setData({'loadlimitIndex': e.detail.value});
  },

  onSubmit: function(event) {
    let value = event.detail.value;
    let userInfo = app.globalData.userInfo
    let userVO = {
                  "avatarUrl": userInfo.avatarUrl,
                  "email": value.email,
                  "gender": userInfo.gender,
                  "licensePlateNumber": value.license,
                  "nickname": value.nickname,
                  "openId": app.globalData.openId,
                  "phone": value.phone,
                  "seatCount": value.seatCount,
                  "carDescription": value.carDescription
                 }
    let addresses = []
    for (var i = 0; i < this.data.items.length; i++) {
      var t = this.data.items[i].stopName;
      var id = this.data.items[i].id;
      addresses.push({
                      "address": t,
                      "createTime": "2019-12-08T08:50:09.581Z",
                      "id": id,
                      "updateTime": "2019-12-08T08:50:09.581Z",
                      "userId": userInfo.id,
                    });
    }
    let body={"addresses":addresses,"user":userVO}
    wx.request({
      url: app.globalData.host + '/user/create',
      header: {
        openId: app.globalData.openId
      },
      data: body,
      method: 'post',
      success: res => {
        if (res.statusCode == 200 && res.data) {
          app.globalData.user=res.data.data.user
          wx.switchTab({
            url: '/pages/square/square'
          })
        }
      },
      fail: function (error) {
        console.log(error)
        wx.showToast({
          title: 'Save User Fail.',
          duration: 2000,
          icon: 'none'
        })
      }
    });
  },

  data: {
    isDriver: true,
    region: ['广东省', '广州市', '海珠区'],
    index: 0,
    items: [],
    nickname: "",
    multiArray: [['1号线','2号线'], ['莘庄','外环路','莲花路','锦江乐园','上海南站','漕宝路','上海体育馆','徐家汇','衡山路','常熟路','陕西南路','黄陂南路','人民广场','新闸路','汉中路','上海火车站','中山北路','延长路','上海马戏城','汶水路','彭浦新村','共康路','通河新村','呼兰路','共富新村','宝安公路','友谊西路','富锦路']],
    multiIndex: [0, 0],
    customItem: '全部',
    loadlimitIndex: 0,
    loadlimitRange: ['Can load 1 person', 'Can load 2 people', 'Can load 3 people', 'Can load 4 people', 'Can load 5 people', 'Can load 6 people'],
    dest: ''
  }
})
