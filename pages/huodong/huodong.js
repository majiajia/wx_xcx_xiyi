const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        huodong_cfg_list:[], 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        app.getSession(function (info) {
            var user_id = info.user_id;
            var sign = info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/huodong/get_huodong_cfg.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    src:"index"
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
                        var res_cur_active = res_data['cur_active'];
                    
                        that.setData({
                            cur_active_type:res_cur_active,
                            huodong_cfg_list: res_data['cfg_list']
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

    make_phone:function() {
        wx.makePhoneCall({
            phoneNumber: '13271550099',
        });
    },
    //用户已经选择过要用那种类型了,需要弹出支付的界面了
    start_chongzhi:function(){
        var that = this;
        var huodong_type = parseInt(that.huodong_type) ;
        // 确定用户选择参与那种活动类型,发起微信支付,支付成功后，更新用户的余额;
    },
    checkboxChange:function(e) {
        var that = this;
        that.setData({
            huodong_type:e.detail.value
        })
    },
    onShareAppMessage: function () {
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
    },
    take_huodong:function(event) {
        var that = this;
        var form_id = event.detail.formId;
        app.getSession(function (info) {
            var user_id = info.user_id;
            var sign = info.sign;
            var type = event.detail.value.type;
            var phone = event.detail.value.phone;
            var cur_active_type = event.detail.value.cur_active_type;
            console.log(event.detail.value);
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/huodong/take_huodong.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    type: type,
                    phone: phone,
                    form_id: form_id,
                    cur_type: cur_active_type
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_msg = res.data.msg;
                    var res_data = res.data.data;
                    if (res_status != 0) {
                        wx.showToast({
                            title: res_msg
                        });
                    } else {
                        var res_timeStamp = res_data.timeStamp;
                        var res_nonceStr = res_data.nonceStr;
                        var res_package = res_data.package;
                        var res_signType = res_data.signType;
                        var res_paySign = res_data.paySign;
                        var res_out_trade_no = res_data.out_trade_no;

                        wx.requestPayment({
                            timeStamp: res_timeStamp.toString(),
                            nonceStr: res_nonceStr.toString(),
                            package:res_package,
                            signType:res_signType,
                            paySign:res_paySign,
                            success:function(res) {
                                // 用户支付完成后,调用订单查询接口查询是否支付成功
                                app.getSession(function(user_info){
                                    var user_id = user_info.user_id;
                                    var sign = user_info.sign;
                                    var cur_active_type = that.data.cur_active_type;
                                    if (that.data.cur_active_type == 1) {
                                        that.setData({
                                            order_query_type:1,
                                        });
                                    } else if (that.data.cur_active_type == 2) {
                                        that.setData({
                                            order_query_type: 4,
                                        });
                                    }
                                    wx.request({
                                        url: 'https://xcx.hnfabang.cn/xcx/xiyi/pay/order_query.php',
                                        data: {
                                            user_id: user_id,
                                            sign: sign,
                                            out_trade_no:res_out_trade_no,
                                            type: that.data.order_query_type,
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
                                                var res_pay_status = parseInt(res_data.pay_status);
                                                if (res_pay_status == 1) {
                                                    wx.showToast({
                                                        title:'正在支付',
                                                    });
                                                } else if(res_pay_status == 2) {
                                                    wx.showToast({
                                                        title: '支付成功',
                                                    });
                                                }
                                            }
                                        },
                                        fail: function (res) {

                                        },
                                        complete: function (res) {

                                        }
                                    })
                                });
                            },
                            fail:function(res) {
                                
                            },
                            complete:function(res) {
                                
                            }
                        })
                    }
                },
                fail: function (res) {

                },
                complete: function (res) {

                }
            })
        });
    }
})