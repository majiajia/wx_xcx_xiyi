//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    
    onShow: function () {
        var that = this;
        app.getSession(function (info) {
            var user_id = info.user_id;
            var sign = info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/huodong/get_huodong_cfg.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    src:"index",
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }, // 设置请求的 header
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_msg = res.data.msg;
                    var res_data = res.data.data;
                    if (res_status != 0) {
                        wx.showToast({
                            title: res_msg
                        })
                    } else {
                        var cur_active_type = res_data['cur_active'];
                        that.setData({
                            cur_active_type:cur_active_type
                        });

                        that.setData({
                            huodong_cfg_list:res_data['cfg_list']
                        });
                    }
                },
                fail: function (res) {
                    
                },
                complete: function (res) {
                    
                }
            })
        });
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
        })
    },
    nav_to_yuding:function() {
        wx.navigateTo({
            url: '/pages/reserve/reserve',
        })
    },
    nav_to_huodong:function() {
        wx.navigateTo({
            url: '/pages/huodong/huodong',
        })
    },
    // 弹框显示服务区域
    show_service_area:function() {
        wx.showModal({
            title: '服务区域',
            showCancel:false,
            confirmText:"我知道了",
            content: '美林河畔、万科美景龙堂、富田太阳城、美景鸿城等附近区域可上门取送衣物.'
        });
    },
    show_service_flow:function() {
        wx.navigateTo({
            url: '/pages/service_flow/service_flow',
        })
    },
    nav_to_jiamu:function(event){
        var that = this;
        var price_type = event.currentTarget.dataset.type;
        app.globalData.price_cur_type = price_type;
        wx.switchTab({
            url: '/pages/price/price' ,
        })
    },
    nav_to_about:function() {
        wx.navigateTo({
            url: '/pages/about/about',
        })
    },
    make_phone:function() {
        wx.makePhoneCall({
            phoneNumber: '13271550099',
        });
    },
    onShareAppMessage:function() {
        return {
            title: '康洁洗衣',
            path: '/pages/index/index',
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res) {
                console.log(res);
            }
        }
    }
})
