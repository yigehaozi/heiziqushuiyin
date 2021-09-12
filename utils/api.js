module.exports = {
    analysis: function(t, a, e) {
        wx.request({
            url: "https://api.kakaa.net/api/xcx/xcx.php",
            method: "GET",
            data: {
                url: t
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                t.data && "101" == t.data.code ? a(t.data.data) : e(t.data.message);
            },
            fail: function(t) {
                e("网络有问题");
            }
        });
    }
};