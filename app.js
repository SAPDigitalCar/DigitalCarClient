//app.js
App({
  onLaunch: function () {
  },
  mapLine2Station: function(line) {
      return this.globalData.metorLine[line/100] + this.globalData.metorStation[line%100];
  },
  globalData: {
    metroLine:['1号线','2号线'],
    metroStation:[
                ['徐泾东','虹桥火车站','虹桥2号航站楼','淞虹路','北新泾','威宁路','娄山关路','中山公园','江苏路','静安寺','南京西路','人民广场','南京东路','陆家嘴','东昌路','世纪大道','上海科技馆','世纪公园','龙阳路','张江高科','金科路','广兰路','唐镇','创新中路','华夏东路','川沙','凌空路','远东大道','海天三路','浦东国际机场'],
                ['莘庄','外环路','莲花路','锦江乐园','上海南站','漕宝路','上海体育馆','徐家汇','衡山路','常熟路','陕西南路','黄陂南路','人民广场','新闸路','汉中路','上海火车站','中山北路','延长路','上海马戏城','汶水路','彭浦新村','共康路','通河新村','呼兰路','共富新村','宝安公路','友谊西路','富锦路']
                ],
    vo: null,
    userInfo: null,
    host: 'https://carapi.techtuesday.club',
    //host: 'localhost:8090',
    openId: '',
    isDriver: true
  }
})
