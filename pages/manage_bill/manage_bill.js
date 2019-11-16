const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:1, //当前显示那个标签
        item1_selected : true, 
        item2_selected : false,
        item3_selected : false,
        dest_user_id:'',
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var dest_user_id = options.user_id;
        console.log(dest_user_id);
        that.setData({
            dest_user_id:dest_user_id
        });
        app.getSession(function (info) {
            var user_id = info.user_id;
            var sign = info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/bill/get_manage_user_bill_list.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    dest_user_id: dest_user_id,
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
                        var user_activity_list = res_data.user_activity;
                        var user_order_list = res_data.user_order;
                        var user_pay_list = res_data.user_pay;
                        var user_account_activity_list = res_data.user_account_activity;
                        that.setData({
                            user_activity_count : user_activity_list.length + user_account_activity_list.length,
                            user_order_count: user_order_list.length,
                            user_pay_count: user_pay_list.length,
                            user_activity_list :user_activity_list,
                            user_account_activity_list: user_account_activity_list,
                            user_order_list:user_order_list,
                            user_pay_list:user_pay_list,
                        });
                        // that.setData({
                        //     user_id: user_id,
                        //     cur_balance: res_data.cur_balance,
                        // });
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
    },
    // 用户点击  参加活动/预约支付/洗衣支付 后，要把对应项的颜色变化 
    show_user_bill: function (event) {
        console.log("show_user_bill is called");
        var that = this;
        var tmp_type = event.currentTarget.dataset.type;
        that.setData({
            type:tmp_type,
        });
        if(tmp_type == 1) {
            that.setData({
                item1_selected: true,
                item2_selected: false,
                item3_selected: false,              
            });
        } else if(tmp_type == 2) {
            that.setData({
                item1_selected: false,
                item2_selected: true,
                item3_selected: false,
            });
        } else if (tmp_type == 3) {
            that.setData({
                item1_selected: false,
                item2_selected: false,
                item3_selected: true,
            });
        }
        app.getSession(function (info) {
            var user_id = info.user_id;
            var sign = info.sign;
            var dest_user_id = that.dest_user_id;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/bill/get_manage_user_bill_list.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    dest_user_id:dest_user_id
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
                        var user_activity_list = res_data.user_activity;
                        var user_account_activity_list = res_data.user_account_activity;
                        var user_order_list = res_data.user_order;
                        var user_pay_list = res_data.user_pay;

                        that.setData({
                            user_account_activity_list: user_account_activity_list,
                            user_activity_count: user_activity_list.length + user_account_activity_list.length,
                            user_order_count: user_order_list.length,
                            user_pay_count: user_pay_list.length,
                            user_activity_list: user_activity_list,
                            user_order_list: user_order_list,
                            user_pay_list: user_pay_list,
                        });
                        // that.setData({
                        //     user_id: user_id,
                        //     cur_balance: res_data.cur_balance,
                        // });
                    }
                },
                fail: function (res) {

                },
                complete: function (res) {

                }
            })
        });
    },
})