Page({
    data: {
        videoPath: "",
        size: 0,
        duration: 0
    },
    onLoad: function(t) {
        this.setData({
            videoPath: t.videoPath,
            size: t.size,
            duration: t.duration
        });
    },
    save: function() {
        wx.showLoading({
            title: "保存中"
        });
    },
    saveTap: function(t) {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? e.save() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        e.save();
                    }
                });
            }
        });
    },
    compressTap: function(t) {},
    onShareAppMessage: function() {
        return {
            title: "这里可以免费短视频去水印保存",
            path: "pages/videohome/videohome"
        };
    }
});