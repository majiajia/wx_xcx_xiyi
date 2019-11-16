const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        type:1,
        order_state:2,
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
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/order/get_order_list.php',
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
                            title: res_msg,
                        });
                    } else {
                        var res_user_order = res_data.user_order;
                        that.setData({
                            user_order_list:res_user_order,
                            user_order_count: res_user_order.length,
                        })
                    }
                },
                fail: function (res) {

                },
                complete: function (res) {

                }
            })
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    make_phone:function(event) {
        var that = this;
        var phone = event.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone,
        });
    },
    show:function(event) {
        var that = this;
        var type = event.currentTarget.dataset.type;
        that.setData({
            type: type
        });
        if(type == 1) { //获取所有的用户的下单
            app.getSession(function (user_info) {
                var user_id = user_info.user_id;
                var sign = user_info.sign;
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/xiyi/order/get_order_list.php',
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
                                title: res_msg,
                            });
                        } else {
                            var res_user_order = res_data.user_order;
                            that.setData({
                                user_order_list: res_user_order,
                                user_order_count: res_user_order.length,
                            });
                        }
                    },
                    fail: function (res) {

                    },
                    complete: function (res) {

                    }
                })
            });
        } else if(type == 2) { //获取所有用户的余额
            app.getSession(function (user_info) {
                var user_id = user_info.user_id;
                var sign = user_info.sign;
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/xiyi/bill/get_user_balance_list.php',
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
                                title: res_msg,
                            });
                        } else {
                            var res_user_balance = res_data.user_balance;
                            that.setData({
                                user_balance_list: res_user_balance,
                                user_balance_count: res_user_balance.length,
                            });
                        }
                    },
                    fail: function (res) {

                    },
                    complete: function (res) {

                    }
                })
            });
        } else if(type == 3) { //获取当前的活动配置
            app.getSession(function (info) {
                var user_id = info.user_id;
                var sign = info.sign;
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/xiyi/huodong/get_huodong_cfg.php',
                    data: {
                        user_id: user_id,
                        sign: sign,
                        src: "manage",
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
                            var sys_cfg_active_type = res_data['cur_active'];
                            that.setData({
                                sys_cfg_active_type :sys_cfg_active_type
                            });
                            var activity_cfg_list = res_data['activity_cfg_list'];
                            var activity_account_cfg_list = res_data['activity_account_cfg_list'];

                            activity_cfg_list.forEach(huodong_cfg_item => {
                                var huodong_cfg_item = huodong_cfg_item;
                                
                                var huodong_cfg_item_type = parseInt(huodong_cfg_item.type);
                                if (huodong_cfg_item_type == 1) {
                                    that.setData({
                                        pay_real_1: huodong_cfg_item.pay_real,
                                        get_real_1: huodong_cfg_item.get_real,
                                        gift_1: huodong_cfg_item.gift,
                                        discount_1: huodong_cfg_item.discount,
                                    });
                                } else if(huodong_cfg_item_type == 2) {
                                    that.setData({
                                        pay_real_2: huodong_cfg_item.pay_real,
                                        get_real_2: huodong_cfg_item.get_real,
                                        gift_2: huodong_cfg_item.gift,
                                        discount_2: huodong_cfg_item.discount,
                                    });
                                } else if (huodong_cfg_item_type == 3) {
                                    that.setData({
                                        pay_real_3: huodong_cfg_item.pay_real,
                                        get_real_3: huodong_cfg_item.get_real,
                                        gift_3: huodong_cfg_item.gift,
                                        discount_3: huodong_cfg_item.discount,
                                    });
                                }
                            });

                            activity_account_cfg_list.forEach(huodong_cfg_item => {
                                var huodong_cfg_item = huodong_cfg_item;

                                var huodong_cfg_item_type = parseInt(huodong_cfg_item.type);
                                if (huodong_cfg_item_type == 1) {
                                    that.setData({
                                        account_activity_pay_1: huodong_cfg_item.pay,
                                        account_activity_discount_1: huodong_cfg_item.account,
                                    });
                                } else if (huodong_cfg_item_type == 2) {
                                    that.setData({
                                        account_activity_pay_2: huodong_cfg_item.pay,
                                        account_activity_discount_2: huodong_cfg_item.account,
                                    });
                                } else if (huodong_cfg_item_type == 3) {
                                    that.setData({
                                        account_activity_pay_3: huodong_cfg_item.pay,
                                        account_activity_discount_3: huodong_cfg_item.account,
                                    });
                                }
                            });
                        }
                    },
                    fail: function (res) {

                    },
                    complete: function (res) {

                    }
                })
            });
        }
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
        };
    },
    confirm_order: function (event) {
        var that = this;
        
        app.getSession(function (user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            var order_id = event.detail.value.order_id;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/order/confirm_order.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    order_id: order_id,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_msg = res.data.msg;
                    var res_data = res.data.data;

                    var res_user_order = res_data.user_order;

                    if(res_status == 0) {
                        wx.showToast({
                            title:"确认收单成功",
                        });
                        that.setData({
                            user_order_list: res_user_order,
                            user_order_count:res_user_order.length,
                        });
                    } else {
                        wx.showToast({
                            title:res_msg,
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
    confirm_save_save_activity_cfg:function(event) {
        var that = this;
        console.log(event.detail.value);
        var pay_real_1 = event.detail.value.pay_real_1;
        var pay_real_2 = event.detail.value.pay_real_2;
        var pay_real_3 = event.detail.value.pay_real_3

        var discount_1 = event.detail.value.discount_1;
        var discount_2 = event.detail.value.discount_2;
        var discount_3 = event.detail.value.discount_3;

        var gift_1 = event.detail.value.gift_1;
        var gift_2 = event.detail.value.gift_2;
        var gift_3 = event.detail.value.gift_3;

        if (pay_real_1 == '' || gift_1 == '') {
            pay_real_1 = '-';
            gift_1 = '-';
            discount_1 = '-';
        }
        if (pay_real_2 == '' || gift_2 == '') {
            pay_real_2 = '-';
            gift_2 = '-';
            discount_2 = '-';
        }
        if (pay_real_3 == '' || gift_3 == '') {
            pay_real_3 = '-';
            gift_3 = '-';
            discount_3 = '-';
        }

        wx.showModal({
            title:"请确认是否保存活动配置",
            content: "1.充:" + pay_real_1 + ";送:" + gift_1 + ";折扣:" + discount_1 + ";2.充:" + pay_real_2 + ";送:" + gift_2 + ";折扣:" + discount_2 + ";3.充:" + pay_real_3 + ";送:" + gift_3 + ";折扣:" + discount_3,
            cancelText:"不保存",
            confirmText:"保存",
            success:function(res) {
                if(res.confirm) { //保存配置
                    app.getSession(function (user_info) {
                        var user_id = user_info.user_id;
                        var sign = user_info.sign;
                        
                        wx.request({
                            url: 'https://xcx.hnfabang.cn/xcx/xiyi/huodong/save_huodong_cfg.php',
                            data: {
                                user_id: user_id,
                                sign: sign,
                                type:1,
                                pay_real_1: pay_real_1,
                                pay_real_2: pay_real_2,
                                pay_real_3: pay_real_3,
                                gift_1: gift_1,
                                gift_2: gift_2,
                                gift_3: gift_3,
                                discount_1: discount_1,
                                discount_2: discount_2,
                                discount_3: discount_3,
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
                                        title: res_msg,
                                    });
                                } else {
                                    wx.showToast({
                                        title: '保存成功',
                                    });
                                    that.setData({
                                        sys_cfg_active_type: 1
                                    });
                                }
                            },
                            fail: function (res) {

                            },
                            complete: function (res) {

                            }
                        })
                    });
                } 
            },
            fail:function(res) {

            },
            complete:function(res) {

            }
        });
    },
    nav_manage_user_bill:function(event) {
        var dest_user_id = event.currentTarget.dataset.userId;
        wx.navigateTo({
            url: "/pages/manage_bill/manage_bill?user_id=" + dest_user_id
        });
    },
    confirm_save_account_activity_cfg: function (event) {
        var that = this;
        console.log(event.detail.value);
        var account_activity_pay_1 = event.detail.value.account_activity_pay_1;
        var account_activity_pay_2 = event.detail.value.account_activity_pay_2;
        var account_activity_pay_3 = event.detail.value.account_activity_pay_3

        var account_activity_discount_1 = event.detail.value.account_activity_discount_1;
        var account_activity_discount_2 = event.detail.value.account_activity_discount_2;
        var account_activity_discount_3 = event.detail.value.account_activity_discount_3;

        if (account_activity_pay_1 == '' || account_activity_discount_1 == '') {
            account_activity_pay_1 = '-';
            account_activity_discount_1 = '-';
        }
        if (account_activity_pay_2 == '' || account_activity_discount_2 == '') {
            account_activity_pay_2 = '-';
            account_activity_discount_2 = '-';
        }
        if (account_activity_pay_3 == '' || account_activity_discount_3 == '') {
            account_activity_pay_3 = '-';
            account_activity_discount_3 = '-';
        }

        wx.showModal({
            title: "请确认是否保存充值洗衣打折活动配置",
            content: "1.充:" + account_activity_pay_1 + ";洗衣折扣:" + account_activity_discount_1 + ";2.充:" + account_activity_pay_2 + ";洗衣折扣:" + account_activity_discount_2 + ";3.充:" + account_activity_pay_3 + ";洗衣折扣:" + account_activity_discount_3,
            cancelText: "不保存",
            confirmText: "保存",
            success: function (res) {
                if (res.confirm) { //保存配置
                    app.getSession(function (user_info) {
                        var user_id = user_info.user_id;
                        var sign = user_info.sign;

                        wx.request({
                            url: 'https://xcx.hnfabang.cn/xcx/xiyi/huodong/save_huodong_cfg.php',
                            data: {
                                user_id: user_id,
                                sign: sign,
                                type:2,
                                account_activity_pay_1: account_activity_pay_1,
                                account_activity_discount_1: account_activity_discount_1,
                                account_activity_pay_2: account_activity_pay_2,
                                account_activity_discount_2: account_activity_discount_2,
                                account_activity_pay_3: account_activity_pay_3,
                                account_activity_discount_3: account_activity_discount_3,
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
                                        title: res_msg,
                                    });
                                } else {
                                    wx.showToast({
                                        title: '保存成功',
                                    });
                                    that.setData({
                                        sys_cfg_active_type: 2
                                    });
                                }
                            },
                            fail: function (res) {

                            },
                            complete: function (res) {

                            }
                        })
                    });
                }
            },
            fail: function (res) {

            },
            complete: function (res) {

            }
        });
    },
})