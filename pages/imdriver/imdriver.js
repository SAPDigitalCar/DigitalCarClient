// pages/imdriver/imdriver.js
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
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: e.detail.value,
      items: this.data.items
    };
    data.items.push({stopName:data.multiArray[1][e.detail.value[1]]});
    this.setData(data)
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
  data: {
    region: ['广东省', '广州市', '海珠区'],
    index: 0,
    items: [],
    multiArray: [['1号线','2号线'], ['莘庄','外环路','莲花路','锦江乐园','上海南站','漕宝路','上海体育馆','徐家汇','衡山路','常熟路','陕西南路','黄陂南路','人民广场','新闸路','汉中路','上海火车站','中山北路','延长路','上海马戏城','汶水路','彭浦新村','共康路','通河新村','呼兰路','共富新村','宝安公路','友谊西路','富锦路']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0],
    customItem: '全部'
  }
})
