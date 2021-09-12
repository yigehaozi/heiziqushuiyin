/*友情技术指导
  微信:Smart_Kage
*/
var t = require("../../utils/api"), a = null;

Page({
    data: {
        analysisUrl: "",
        videoUrl: "",
        hideResult: !0,
        desc: ""
    },
    onLoad: function() {
        var t = this;
        wx.getClipboardData({
            success: function(a) {
                if (a.data && t.getURLFromString(a.data)) {
                    var i = t.getURLFromString(a.data);
                    wx.showModal({
                        title: "检测到短视频链接，是否粘贴？",
                        content: i,
                        confirmText: "确定",
                        confirmColor: "#000000",
                        success: function(a) {
                            a.confirm ? t.setData({
                                analysisUrl: i
                            }) : a.cancel;
                        }
                    });
                }
            }
        }), wx.createInterstitialAd && ((a = wx.createInterstitialAd({
            adUnitId: "adunit-007a18bd23c0c21f"
        })).onLoad(function() {
            a && a.show().catch(function(t) {
                console.error(t);
            });
        }), a.onError(function(t) {}), a.onClose(function() {}));
    },
    analysisTap: function(a) {
        var i = this;
        this.data.analysisUrl ? this.getURLFromString(this.data.analysisUrl) ? (wx.showLoading({
            title: "正在去水印"
        }), t.analysis(this.getURLFromString(this.data.analysisUrl), function(t) {
            wx.hideLoading(), console.log(t.url), i.setData({
                videoUrl: t.url,
                desc: t.title,
                hideResult: !1
            });
        }, function(t) {
            wx.hideLoading(), wx.showModal({
                title: "温馨提示",
                content: "检测到你使用的视频无法提取,请检查是不是审核中,或者被你设置了仅限好友观看,或者你使用的链接不是本程序所支持的,请查看教程操作或者更换其他人的视频试一下!",
                confirmText: "确定",
                showCancel: !1,
                confirmColor: "#000000"
            });
        })) : wx.showToast({
            icon: "error",
            title: "链接格式错误"
        }) : wx.showToast({
            icon: "error",
            title: "链接不能为空"
        });
    },
    inputChange: function(t) {
        this.setData({
            analysisUrl: t.detail.value
        });
    },
    pasteTap: function(t) {
        var a = this;
        wx.getClipboardData({
            success: function(t) {
                a.setData({
                    analysisUrl: t.data
                });
            }
        });
    },
    clearTap: function(t) {
        this.setData({
            analysisUrl: ""
        });
    },
    save: function() {
        var t = this;
        var videoUrl = t.data.videoUrl.replace("http", "https")
        var url = encodeURIComponent(videoUrl);
        wx.showLoading({
            title: "正在加载"
        });
        const downloadTask = wx.downloadFile({
            url: "https://download.20kaka.cn/down/video/?url=" + url,
            success: function(t) {
                200 === t.statusCode && wx.saveVideoToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.hideLoading(), wx.showToast({
                            icon: "success",
                            title: "保存成功"
                        });
                    },
                    fail: function(t) {
                        wx.hideLoading();
                    }
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    icon: "error",
                    title: "请重试"
                });
            },
        });
        downloadTask.onProgressUpdate((res) => {
            wx.showLoading({
                title: "已下载" + res.progress + '%'
            });
            //console.log(res.progress)
            this.setData({
                progress: res.progress + '%'
            })
        })
    },
    saveTap: function(t) {
        var a = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.writePhotosAlbum"] ? a.save() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        a.save();
                    }
                });
            }
        });
    },
    copyLinkTap: function(t) {
        var a = this;
        wx.setClipboardData({
            data: a.data.videoUrl,
            success: function(t) {
                wx.showToast({
                    icon: "success",
                    title: "复制成功"
                });
            }
        });
    },
    copyDescTap: function(t) {
        var a = this;
        wx.setClipboardData({
            data: a.data.desc,
            success: function(t) {
                wx.showToast({
                    icon: "success",
                    title: "复制成功"
                });
            }
        });
    },
    getURLFromString: function(t) {
        var a = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return a.test(t) ? t.match(a)[0] : "";
    },
    guideTap: function(t) {
        wx.navigateTo({
            url: "../../pages/guide/guide"
        });
    },
    questiopnTap: function(t) {
        wx.navigateTo({
            url: "../../pages/question/question"
        });
    },
    onShareAppMessage: function() {
        return {
            title: '最好用的去水印小程序之一，强烈给你推荐哦👍🏻',
            desc: '黑子去水印',
            path: "pages/index/index"
        };
    },
    dwjq: function(t) {
        wx.navigateTo({
            url: "../../pages/dwjq/guide"
        });
    },
    onShareTimeline: function() {
        return {
            title: "这里可以免费短视频去水印下载，你不来看看吗"
        };
        
    }
});

