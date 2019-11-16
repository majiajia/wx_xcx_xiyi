const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:1,
        cloth_selected:true,
        jiaju_selected:false,
        shoe_selected: false,
        bag_selected: false,
        picao_selected: false,
        ranse_selected: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        var that = this;
        that.setData({
            type: app.globalData.price_cur_type,
        });
        var type = parseInt(app.globalData.price_cur_type);

        // 用户选中的是服饰
        if (type == 1) {
            that.setData({
                cloth_selected: true,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 2) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: true,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 3) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: true,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 4) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: true,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 5) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: true,
                ranse_selected: false,
            });
        } else if (type == 6) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: true,
            });
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    show_by_type:function(event) {
        var that = this;
        var type = event.currentTarget.dataset.type;
        that.setData({
            type: type
        });
        if(type == 1) {
            that.setData({
                cloth_selected: true,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 2) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: true,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 3) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: true,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 4) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: true,
                picao_selected: false,
                ranse_selected: false,
            });
        } else if(type == 5) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: true,
                ranse_selected: false,
            });
        } else if(type == 6) {
            that.setData({
                cloth_selected: false,
                jiaju_selected: false,
                shoe_selected: false,
                bag_selected: false,
                picao_selected: false,
                ranse_selected: true,
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
        }
    },
    show_more_cloth:function(event) {
        var id = parseInt(event.currentTarget.dataset.id);
        if(id == 1) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '领带、薄马夹、薄背心、棉毛手套、短裤、布艺腰带、秋衣、秋裤'
            });
        } else if(id == 2) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '西裤、T恤、衬衣、单裙、休闲裤、牛仔裤、保暖秋裤、运动裤、睡衣(薄)、睡裤(薄)、运动帽等'
            })
        } else if (id == 3) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '西服上衣、夹克、毛衫、羊毛衬衣、运动服、羊毛西裤、恤衫、普通上衣、保暖秋衣、保暖衬衣'
            })
        } else if (id == 4) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '厚裙、羊绒/毛围巾、绒裤、羽绒马甲、亚麻裤、羊绒衫、毛衣外套(短)、风衣(短)、棉裤、丝质领带、丝巾、羊绒裤、连衣裙、带褶裙、大衣(短)、礼帽等'
            })
        } else if (id == 5) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '外套(厚、双面)、羽绒服(短)、棉衣(短)、蚕丝裤、风衣(中)、毛衣外套(厚、长)、大衣(中)、羊毛西服、羊毛绒短裤'
            })
        } else if (id == 6) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '羽绒服(中)、棉衣(中)、羊毛外套(短)、羊绒夹克、大披肩、真丝衬衫、羊毛连衣裙、风衣(长)、大衣(长)'
            })
        } else if (id == 7) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '羽绒服(长)、棉衣(长)、羊绒/毛外套(中)、羊毛内胆袄(小)、真丝类衣物、PU(仿皮)外套、羊绒大披肩、带皮羊毛衫等'
            })
        } else if (id == 8) {
            wx.showModal({
                title: '详情',
                showCancel: false,
                confirmText: "我知道了",
                content: '羊绒/毛外套(长)、PU棉衣、旗袍、羊毛内胆袄(大)、带有特殊装饰类外套(真丝、金属、皮、毛等特殊装饰物)、军大衣'
            })
        }
    } 
})