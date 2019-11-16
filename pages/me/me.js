//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        is_admin:0,
        user_avatar:null,
        user_name: null,
        user_id: '-',
        user_pay_val:'', //支付洗衣款的输入框中输入的金额
    },
    
    onShow: function () {
        // 应该先调用 get_user_info.php 的接口,调用后,如果没有avatar 和 name ,则显示为按钮
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
                            title: res_msg
                        });
                    } else {
                        var res_user_avatar = res_data.avatar;
                        var res_user_name = res_data.name;
                        var res_cur_balance = res_data.cur_balance;
                        var res_role = parseInt(res_data.role);
                        
                        var res_user_account = parseInt(res_data.user_account);

                        // 如果role = 2 ,则说明这个用户应该是:管理员
                        if (res_role == 2) {
                            that.setData({
                                is_admin:1,
                            });
                        }
                        that.setData({
                            user_pay_account:res_user_account
                        });
                        
                        if ((res_user_avatar != null) || (res_user_name != null)) {
                            that.setData({
                                user_avatar:res_user_avatar,
                                user_name:res_user_name,
                                user_id: user_id,
                                cur_balance: res_cur_balance,
                            });
                        } else {
                            that.setData({
                                user_avatar: null,
                                user_name: null,
                                user_id: user_id,
                                cur_balance: res_cur_balance,
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
    //   if ((app.globalData.user_avatar != '') && (app.globalData.user_nickname != '')) {
    //       this.setData({
    //           userInfo: app.globalData.userInfo,
    //           hasUserInfo: true
    //       })
    //   } else if (this.data.canIUse){
    //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //       // 所以此处加入 callback 以防止这种情况
    //       app.userInfoReadyCallback = res => {
    //         this.setData({
    //           userInfo: res.userInfo,
    //           hasUserInfo: true
    //         });
    //         app.globalData.user_nickname = res.userInfo.nickName;
    //         app.globalData.user_avatar = res.userInfo.avatarUrl;
    //       }
    //   } else {
    //       // 在没有 open-type=getUserInfo 版本的兼容处理
    //       wx.getUserInfo({
    //           success: res => {
    //               app.globalData.userInfo = res.userInfo
    //               this.setData({
    //                 userInfo: res.userInfo,
    //                 hasUserInfo: true,
    //               });
    //               app.globalData.user_nickname = res.userInfo.nickName;
    //               app.globalData.user_avatar = res.userInfo.avatarUrl;
    //           }
    //       });
    //   }

    //   var that = this;
    //   app.getSession(function (info) {
    //       var user_id = info.user_id;
    //       var sign = info.sign;
    //       wx.request({
    //           url: 'https://xcx.hnfabang.cn/xcx/xiyi/user_info/get_user_info.php',
    //           data: {
    //               user_id: user_id,
    //               sign: sign,
    //           },
    //           method: 'POST',
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           success: function (res) {
    //               var res_status = parseInt(res.data.status);
    //               var res_msg = res.data.msg;
    //               var res_data = res.data.data;
    //               if (res_status != 0) {
    //                   wx.showToast({
    //                     title: res_msg
    //                   });
    //               } else {
    //                   that.setData({
    //                       user_id:user_id,
    //                       cur_balance:res_data.cur_balance,
    //                   }); 
    //               }
    //           },
    //           fail: function (res) {

    //           },
    //           complete: function (res) {

    //           }
    //       })
    //   });
    },
    getUserInfo: function(e) {
        var that = this;
        var user_avatar = e.detail.userInfo.avatarUrl;
        var user_nickname = e.detail.userInfo.nickName;
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            user_avatar : user_avatar,
            user_name : user_nickname,
        });
        app.globalData.user_avatar = user_avatar;
        app.globalData.user_nickname = user_nickname;
        app.getSession(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/user_info/update_user_info.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    avatar:user_avatar,
                    name:user_nickname,
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
          })
      },
      nav_to_bill:function() {
          wx.navigateTo({
              url: '/pages/bill/bill',
          })
      },
      nav_to_manage:function() {
          wx.navigateTo({
              url: '/pages/manage/manage',
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
      user_pay:function(event) {
        var that = this;        
        var type = event.detail.value.type;
        var pay = event.detail.value.pay;
        var form_id = event.detail.formId;
        if (pay == '') {
            wx.showToast({
                title:'请输入付款的金额',
            });
            return;
        }
        app.getSession(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/xiyi/bill/user_pay.php',
                data: {
                    user_id: user_id,
                    sign: sign,
                    type: type,
                    pay: pay,
                    form_id: form_id,
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
                        if (type == 1) {
                            that.setData({
                                user_pay_val:'',
                            });
                            wx.showToast({
                                title: '付款成功',
                            });
                            var res_cur_balance = res_data.cur_balance; 
                            that.setData({
                                cur_balance:res_cur_balance,
                            });
                        } else if (type == 2) {
                            if (res_status != 0) {
                                wx.showToast({
                                    title: res_msg,
                                });
                            } else {
                                that.setData({
                                    user_pay_val: '',
                                });
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
                                                    type: 3,
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
        })
        
      }
})
