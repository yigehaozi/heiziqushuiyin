Page({
    data: {
        videoPath: "",
        originSize: 0,
        compressVideoPath: "",
        compressedSize: 0
    },
    onLoad: function(e) {
        this.setData({
            videoPath: e.videoPath
        }), this.getOriginVideoInfo(this.data.videoPath);
    },
    getOriginVideoInfo: function(e) {
        var o = this;
        wx.getVideoInfo({
            src: e,
            success: function(e) {
                o.setData({
                    originSize: (e.size / 1024).toFixed(2)
                });
            }
        });
    },
    getCompressVideoInfo: function(e) {
        var o = this;
        wx.getVideoInfo({
            src: e,
            success: function(e) {
                o.setData({
                    compressedSize: (e.size / 1024).toFixed(2)
                });
            }
        });
    },
    reChooseTap: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: [ "album" ],
            compressed: !1,
            maxDuration: 60,
            camera: "back",
            success: function(o) {
                e.setData({
                    videoPath: o.tempFilePath
                }), e.getOriginVideoInfo(e.data.videoPath);
            }
        });
    },
    compressTap: function(e) {
        wx.showLoading({
            title: "正在压缩"
        });
        var o = this;
        wx.compressVideo({
            src: o.data.videoPath,
            quality: "low",
            success: function(e) {
                wx.showToast({
                    icon: "success",
                    title: "压缩成功"
                }), o.setData({
                    compressVideoPath: e.tempFilePath
                }), o.getCompressVideoInfo(o.data.compressVideoPath);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    saveTap: function() {
        var e = this;
        wx.showLoading({
            title: "保存中"
        }), wx.saveVideoToPhotosAlbum({
            filePath: e.data.compressVideoPath,
            success: function(e) {
                wx.hideLoading(), wx.showToast({
                    icon: "success",
                    title: "保存成功"
                });
            },
            fail: function(e) {
                wx.hideLoading();
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "这里可以免费短视频去水印保存",
            path: "pages/videohome/videohome"
        };
    }
});