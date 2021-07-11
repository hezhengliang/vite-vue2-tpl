// import sa from '@/libs/sensorsdata.es6.min.js';
import sa from'sa-sdk-javascript/sensorsdata.es6.min.js';

var isSaInit = false
/**
 * 神策埋点PaveView
 * @param {*} data 
 */
export function saBuryPageView(duryName, data){
  if(!isSaInit){
    initSensor(false, true, data.sid ? data.sid : '')
  }
  // 设置之后，SDK 就会自动收集页面浏览事件，以及设置初始来源。
  // sa.quick('autoTrack');
  console.log('autoTrack event:' + duryName)
  sa.track(duryName)
}

/**
 * 神策全埋点元素自定义声明式埋点
 * @param {*} buryName 
 * @param {*} buryData 
 */
export function saBudryElClick(elTarget, buryData) {
  if(!isSaInit){
    initSensor(false, true, buryData.sid ? buryData.sid : '')
  }
  // 设置之后，SDK 就会自动收集页面浏览事件，以及设置初始来源。
  sa.quick('autoTrack')
  //--trackHeatMap 只采集除 a, input, button,textarea 之外的标签
  sa.quick('trackHeatMap', elTarget, buryData, function(){
    console.log('trackHeatMap callback')
  })
}

//-- 路由单页面配置触发
export function saBurySinglePage(data) {
  if(!isSaInit){
    initSensor(false, true, data.sid ? data.sid : '')
  }
  sa.quick('autoTrackSinglePage')
}

/**
 * 初始化神策埋点基础信息
 * @param {*} isHeatMap 
 */
function initSensor(isHeatMap=false, appJsBridge=false, serverId=''){
  let baseInitOpts = {
    server_url: setUrl(serverId),
    use_app_track: true // 配置打通App与H5的参数
  }
  if(isHeatMap){
    Object.assign(baseInitOpts, { 
      heatmap: {
      //是否开启点击图, 默认 default 表示开启，自动采集 $WebClick 事件，'not_collect' 表示关闭
      clickmap:'not_collect',
      //是否开启触达注意力图，默认default表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
      scroll_notice_map:'not_collect'
    }})
  }
  sa.init(baseInitOpts)
  // 设置之后，SDK 就会自动收集页面浏览事件，以及设置初始来源。
  sa.quick('autoTrack');
  isSaInit = true
}

function setUrl(serverId=''){
  let url = null
  const isPro = process.env.NODE_ENV === 'production'
  if(isPro) {
    const urlProMap = {
      144: 'https://jc-sensors.baidao.com/sa?project=yry_huangjin&token=9876zabcsw',//黄金TD
      107: 'https://jc-sensors.baidao.com/sa?project=yry_huizhiyingqi&token=XioTqj52', // 汇智盈期
      'default': 'https://sensors.baidao.com:4106/sa?project=yry_huizhicaijing',// //-- 白马 荔枝
    }
    url = urlProMap[serverId] ? urlProMap[serverId]: urlProMap['default']
  } else {
    const urlDevMap = {
      144: 'https://test-sensors-api.baidao.com/sa?project=yry_huangjin_test&token=aabdcdei69',//黄金TD
      107: 'https://test-sensors-api.baidao.com/sa?project=yry_huizhiyingqi_test', // 汇智盈期
      'default': 'https://test-sensors-api.baidao.com/sa?project=yry_huizhicaijing_test',// //-- 白马 荔枝
    }
    url = urlDevMap[serverId.toString()] ? urlDevMap[serverId.toString()]: urlDevMap['default']
  }
  return url
}