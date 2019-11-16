const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_cur_balance:'-',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        app.getSession(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/user_info/get_user_info.php',
                data: {
                    user_id: user_id,
                    sign: sign,
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
                            title: '信息有误,请电话咨询配送员',
                        });
                    } else {
                        var cur_balance = res_data.cur_balance;
                        that.setData({
                            user_cur_balance: cur_balance,
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

    // 用户点击下单
    pre_order: function (event) {
        var that = this;
        var form_id = event.detail.formId;

        app.getSession(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            
            var name = event.detail.value.name;
            var phone = event.detail.value.phone;
            var address = event.detail.value.address;
            var type = event.detail.value.type;
            var remark = event.detail.value.remark;
            if (remark == '') {
                remark = '-';
            }
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/order/take_order.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    name: name,
                    phone: phone,
                    address:address,
                    type: type,
                    remark: remark,
                    form_id:form_id,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_msg = res.data.msg;
                    var res_data = res.data.data;
                    
                    if(type == 1) { //余额支付
                        var res_user_balance = res_data.cur_balance ;
                        if(res_status == 0) {
                            wx.showToast({
                                title:'预约成功,请等待配送员上门取衣',
                            });
                            
                            that.setData({
                                user_cur_balance: res_user_balance,
                            })
                        } else {
                            wx.showToast({
                                title: res_msg,
                            });
                        }
                    } else { //使用微信支付
                        if(res_status != 0) {
                            wx.showToast({
                                title:res_msg,
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
                                package: res_package,
                                signType: res_signType,
                                paySign: res_paySign,
                                success: function (res) {
                                    // 用户支付完成后,调用订单查询接口查询是否支付成功
                                    app.getSession(function (user_info) {
                                        var user_id = user_info.user_id;
                                        var sign = user_info.sign;
                                        wx.request({
                                            url: 'https://xcx.hnfabang.cn/xcx/xiyi/pay/order_query.php',
                                            data: {
                                                user_id: user_id,
                                                sign: sign,
                                                out_trade_no: res_out_trade_no,
                                                type: 2,
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
                                                            title: '正在支付',
                                                        });
                                                    } else if (res_pay_status == 2) {
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
                                fail: function (res) {

                                },
                                complete: function (res) {

                                }
                            })
                            // 小程序端调起支付 在回调中查询接口状态
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
    check_change:function(e) {
        var that = this;
        console.log(e.detail.value);
    },
    /**
     * 用户点击右上角分享
     */
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
    }
})