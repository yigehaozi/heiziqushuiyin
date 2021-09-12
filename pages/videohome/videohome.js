require("../../utils/spark-md5.js");

Page({
    data: {},
    onLoad: function(e) {},
    deWaterTap: function(e) {
        wx.navigateTo({
            url: "../../pages/index/index"
        });
    },
    videoEditTap: function(e) {
        wx.chooseVideo({
            sourceType: [ "album" ],
            compressed: !1,
            success: function(e) {
                wx.openVideoEditor({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        console.log(e.tempFilePath), wx.showModal({
                            content: "已保存，请在相册中查看",
                            confirmText: "知道了",
                            showCancel: !1
                        });
                    }
                });
            }
        });
    },
    compressTap: function(e) {
        wx.chooseVideo({
            sourceType: [ "album" ],
            compressed: !1,
            success: function(e) {
                wx.navigateTo({
                    url: "../../pages/compress/compress?videoPath=" + e.tempFilePath
                });
            }
        });
    },
    md5Tap: function(e) {
        wx.navigateTo({
            url: "../../pages/updatemd5/updatemd5"
        });
    },
    markTap: function(e) {
        wx.navigateToMiniProgram({
            appId: "wxb0524a9e2f4f135e"
        });
    },

    onShareAppMessage: function() {
        return {
            title: "这里不仅可以免费去水印，还有更多好用工具等你来哦⭐️",
            path: "pages/videohome/videohome"
        };
    },
    onShareTimeline: function() {
        return {
            title: "这里可以免费短视频去水印保存"
        };
    }
});