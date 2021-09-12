var e, t, i = require("../../utils/spark-md5.js");

Page({
    data: {
        videoPath: "",
        originSize: 0,
        originDuration: "",
        originMd5: "",
        updateMd5: "",
        updateVideoPath: ""
    },
    onLoad: function(e) {},
    getOriginVideoInfo: function(a) {
        wx.showLoading({
            title: "正在修改"
        });
        var o = this;
        wx.getVideoInfo({
            src: a,
            success: function(i) {
                e = i.fps, t = i.bitrate, o.setData({
                    originSize: (i.size / 1024).toFixed(2),
                    originDuration: o.getTime(i.duration)
                });
            }
        }), wx.getFileSystemManager().readFile({
            filePath: a,
            success: function(e) {
                var t = new i.ArrayBuffer();
                t.append(e.data);
                var a = t.end(!1);
                o.setData({
                    originMd5: a
                });
            }
        }), wx.compressVideo({
            src: o.data.videoPath,
            bitrate: t,
            fps: e,
            resolution: 1,
            success: function(e) {
                wx.showToast({
                    icon: "success",
                    title: "修改成功"
                }), o.setData({
                    updateVideoPath: e.tempFilePath
                });
            },
            complete: function() {
                wx.hideLoading(), wx.getFileSystemManager().readFile({
                    filePath: o.data.updateVideoPath,
                    success: function(e) {
                        var t = new i.ArrayBuffer();
                        t.append(e.data);
                        var a = t.end(!1);
                        o.setData({
                            updateMd5: a
                        });
                    }
                });
            }
        });
    },
    chooseTap: function() {
        this.choose();
    },
    reChooseTap: function() {
        this.setData({
            originSize: "",
            originDuration: "",
            originMd5: "",
            updateMd5: ""
        }), this.choose();
    },
    choose: function() {
        var e = this;
        wx.chooseVideo({
            sourceType: [ "album" ],
            compressed: !1,
            success: function(t) {
                e.setData({
                    videoPath: t.tempFilePath
                }), e.getOriginVideoInfo(e.data.videoPath);
            }
        });
    },
    saveTap: function() {
        var e = this;
        wx.showLoading({
            title: "保存中"
        }), wx.saveVideoToPhotosAlbum({
            filePath: e.data.updateVideoPath,
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
    },
    getTime: function(e) {
        var t = e, i = 0, a = 0;
        t > 60 && (i = parseInt(t / 60), t = parseInt(t % 60), i > 60 && (a = parseInt(i / 60), 
        middle = parseInt(i % 60)));
        var o = parseInt(t) + "秒";
        return i > 0 && (o = parseInt(i) + "分" + o), a > 0 && (o = parseInt(a) + "小时" + o), 
        o;
    }
});