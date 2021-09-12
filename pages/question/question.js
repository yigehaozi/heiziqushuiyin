Page({
    data: {},
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "这里可以免费短视频去水印保存",
            path: "pages/videohome/videohome"
        };
    },
    previewPlatformTap: function(e) {
        wx.previewImage({
            current: "../../images/platform.png",
            urls: [ "../../images/platform.png" ]
        });
    }
});