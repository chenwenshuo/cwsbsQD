//app.js
App({
  onLaunch: function () {
    console.log("start");
    var session = wx.getStorageSync('3rd_session');
    console.log(session);
    if (session == null || session=="" || session == undefined) {
        wx.login({
          success: res => {
            if (res.code) {
              //发起网络请求
              wx.request({
                url:'https://www.cwenshuo.com/liberty-webk.io/weixin/getSessionKeyOropenid.htm',
                dataType:'json',
                data: {
                  code: res.code
                },
                header: {
                  "Content-Type": "applciation/json"
                },
                method: "GET",
                success: function (result) {
                  wx.setStorageSync('3rd_session', result.data.key_3rd_session);
                  wx.request({
                    url: 'https://www.cwenshuo.com/liberty-web/weixin/syncUser.htm',
                    dataType: 'json',
                    data: {
                      session: wx.getStorageSync('3rd_session')
                    },
                    header: {
                      "Content-Type": "applciation/json"
                    },
                    method: "GET",
                    success: function (result) {

                    }
                  })
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
    }
  },
  globalData: {
    userInfo: null,
    isBackInfo: false,
    host:'https://www.xxx.com'
  }
})