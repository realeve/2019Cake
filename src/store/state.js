let isMobile = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i) ||
    navigator.userAgent.match(/MicroMessenger/i)
  ) {
    return true;
  } else {
    return false;
  }
};

const state = {
  isLoading: false,
  userInfo: {},
  wxUrl: '//api.cbpc.ltd/',
  tips: '',
  sport: {
    id: 28,
    name: '2019年劳动慰问品发放选择',
    orgname: '成都印钞有限公司', // 机构名
    isOnline: false, //实际活动
    uid: 0,
    userName: '',
    cardNo: '',
    dpt: ['印钞管理部'],
    isLogin: false,
    startDate: '2018-09-23',
    endDate: '2018-09-30'
  }
};
export default state;
