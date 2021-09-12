//注册页面
Page({
  downfile: function(){
    var _this = this;
    wx.downloadFile({
    url: "https://www.zhuishangyun.com/hzqsy/jq.png", 
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res);
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              console.log(data);
              wx.showToast({
                title: '图片保存成功',
              })    
            },
            fail: function (err) {
              console.log(err);
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                console.log("用户一开始拒绝了，我们想再次发起授权")
                alert('打开设置窗口')
                wx.showToast({
                  title: '图片保存失败',
                })      
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                    } else {
                      console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '最好用的去水印小程序之一，强烈给你推荐哦👍🏻',
      desc: '黑子去水印',
      path: 'pages/dwjq/guide'
    }
  }
})
