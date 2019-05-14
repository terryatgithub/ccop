//页面部分的逻辑
var app = {
    canonical_uri: function(src, base_path) {
        var root_page = /^[^?#]*\//.exec(location.href)[0],
            root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
            absolute_regex = /^\w+\:\/\//;
        // is `src` is protocol-relative (begins with // or ///), prepend protocol  
        if (/^\/\/\/?/.test(src)) {
            src = location.protocol + src;
        }
        // is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)  
        else if (!absolute_regex.test(src) && src.charAt(0) != "/") {
            // prepend `base_path`, if any  
            src = (base_path || "") + src;
        }
        // make sure to return `src` as absolute  
        return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
    },

    rel_html_imgpath: function(iconurl) {
        // console.log(app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1')));
        return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
    },

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackButton, false);
        document.addEventListener('backbuttondown', this.onBackButtonDown, false);
        document.addEventListener('resume', this.onResume, false);
        document.addEventListener('pause', this.onPause, false);
    },
    onBackButton: function() {
        console.log("in onBackButton");
        //navigator.app.exitApp();
    },
    onBackButtonDown: function() {
        console.log("in handleBackButtonDown");
        navigator.app.exitApp();
    },
    onDeviceReady: function() {
        console.log("in onDeviceReady");
        app.receivedEvent('deviceready');
        app.triggleButton();
    },
    onResume: function() {
        console.log("in onResume");
    },
    onPause: function() {
        console.log("in onPause");
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelectorAll('.received');

        listeningElement.setAttribute('style', 'display:none;');
        for (var i = 0, j = receivedElement.length; i < j; i++) {
            receivedElement[i].setAttribute('style', 'display:block;');
        }

        console.log('Received Event: ' + id);
        coocaaosapi.getWebViewSDKInfo(function(message) {
            console.log("====================="+JSON.stringify(message))
            document.getElementById('webVersion').innerHTML = "此浏览器集成的websdk版本为："+message.versionName;
        }, function(error) { console.log(error); })

        //      map = new coocaakeymap($(".coocaabtn"), null, "btnFocus", function() {}, function(val) {}, function(obj) {});
        //      document.getElementById("goToDown").focus();
        //      $("#walk").unbind('itemClick').bind("itemClick", function() {});
        //      $("#goToDown").unbind('itemClick').bind("focus", function() {});
        //      $("#goToDown").unbind('itemClick').bind("blur", function() {});
    },
    triggleButton: function() {
        cordova.require("com.coocaaosapi");

        document.getElementById("getBusiness").addEventListener("click", function() {
            coocaaosapi.getBusinessData('sync', '{"test2":"test2"}', function(message) {
                console.log("setBusiness====" + JSON.stringify(message));
            }, function(error) {
                console.log("setBusiness----error" + JSON.stringify(error))
            });
        }, false);

        document.getElementById("setBusiness").addEventListener("click", function() {
            coocaaosapi.setBusinessData('async', '{"test1":"test1"}', function(message) {
                console.log("setBusinessData====" + JSON.stringify(message));
            }, function(error) {
                console.log("setBusinessData----error" + JSON.stringify(error))
            });
        }, false);

        document.getElementById("hometab6").addEventListener("click", function() {
            coocaaosapi.startHomeTap("coocaa.intent.action.HOME","10249|10250", function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("hometab51").addEventListener("click", function() {
            coocaaosapi.startHomeTap("coocaa.intent.action.HOME.Translucent","10249|10250", function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("hometab52").addEventListener("click", function() {
            coocaaosapi.startHomeTap("coocaa.intent.movie.home","10249|10250", function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("setSpecialMachine").addEventListener("click", function() {
            coocaaosapi.setSpecialMachine("", function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("getbaseinfo").addEventListener("click", function() {
            coocaaosapi.getBaseInfo(function(message) {
                console.log(JSON.stringify(message));
                document.getElementById('baseinfoid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startNewBrowser").addEventListener("click", function() {
            coocaaosapi.startNewBrowser("http://beta.webapp.skysrt.com/games/webappdemo/index.html", function(message) {
                console.log("启动成功" + JSON.stringify(message));
            }, function(error) {
                console.log("启动s失败 " + JSON.stringify(error));
            })
        }, false);

        document.getElementById("startNewBrowser2").addEventListener("click", function() {
            coocaaosapi.startNewBrowser2("http://beta.webapp.skysrt.com/games/webappdemo/index.html", function(message) {
                console.log("启动成功" + JSON.stringify(message));
            }, function(error) {
                console.log("启动s失败 " + JSON.stringify(error));
            })
        }, false);
        document.getElementById("startNewBrowser3").addEventListener("click", function() {
            coocaaosapi.startNewBrowser3("http://beta.webapp.skysrt.com/games/webappdemo/index.html", function(message) {
                console.log("启动成功" + JSON.stringify(message));
            }, function(error) {
                console.log("启动s失败 " + JSON.stringify(error));
            })
        }, false);

        document.getElementById("startNewBrowser4").addEventListener("click", function() {
            coocaaosapi.startNewBrowser4("http://beta.webapp.skysrt.com/games/webappdemo/index.html", function(message) {
                console.log("启动成功" + JSON.stringify(message));
            }, function(error) {
                console.log("启动s失败 " + JSON.stringify(error));
            })
        }, false);

        document.getElementById("startallcoupon").addEventListener("click", function() {
            coocaaosapi.startAllCoupon("fs2dfa2awe3io2ljvwcnmo8dbe476g9eyushcoocaa", "a0742646762811e5ba4200163e022eda", "CC0001", "movie", "0", function(message) { console.log(message); }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startmycoupon").addEventListener("click", function() {
            coocaaosapi.startMyCoupon("fs2dfa2awe3io2ljvwcnmo8dbe476g9eyushcoocaa", "a0742646762811e5ba4200163e022eda", "CC0001", "movie", "0", function(message) { console.log(message); }, function(error) { console.log(error); })
        }, false);

        document.getElementById("logout").addEventListener("click", function() {
            coocaaosapi.setCoocaaUserLogout(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startloaclmedia").addEventListener("click", function() {
            coocaaosapi.startLocalMedia(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("starttvsetting").addEventListener("click", function() {
            coocaaosapi.startTVSetting(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startsourcelist").addEventListener("click", function() {
            coocaaosapi.startSourceList(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmoviehistory").addEventListener("click", function() {
            coocaaosapi.startMovieHistory(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmygames").addEventListener("click", function() {
            coocaaosapi.startMyGames(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startnormallocalapp").addEventListener("click", function() {
            coocaaosapi.startMyApps("", function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startchildlocalapp").addEventListener("click", function() {
            coocaaosapi.startMyApps("child", function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startusersetting").addEventListener("click", function() {
            coocaaosapi.startUserSetting(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startnetsetting").addEventListener("click", function() {
            coocaaosapi.startNetSetting(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startbluetoothsetting").addEventListener("click", function() {
            coocaaosapi.startBlueToothSetting(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmssagebox").addEventListener("click", function() {
            coocaaosapi.startMessageBox(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startupgrade").addEventListener("click", function() {
            coocaaosapi.startSystemUpgrade(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmovielist").addEventListener("click", function() {
            var listid = eval(document.getElementById('movielistid')).value;
            console.log(listid);
            coocaaosapi.startMovieList(listid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmoviedetail").addEventListener("click", function() {
            var detailid = eval(document.getElementById('moviedetailid')).value;
            console.log(detailid);
            coocaaosapi.startMovieDetail(detailid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmovietopic").addEventListener("click", function() {
            var topicid = eval(document.getElementById('movietopicid')).value;
            console.log(topicid);
            coocaaosapi.startMovieTopic(topicid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmemcenter").addEventListener("click", function() {
            coocaaosapi.startMovieMemberCenter('qq', function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startmoviehome").addEventListener("click", function() {
            coocaaosapi.startMovieHome(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startplaymovie").addEventListener("click", function() {
            var url = 'http://localhost/webappdemo/test.rmvb';
            var name = '孤独的美食家';
            coocaaosapi.playOnlineMovie(url, name, "false", function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startappstore").addEventListener("click", function() {
            coocaaosapi.startAppStore(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startappstorebd").addEventListener("click", function() {
            coocaaosapi.startAppStoreBD(1, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startappstoresort").addEventListener("click", function() {
            var sortid = eval(document.getElementById('appsortid')).value;
            console.log(sortid);
            coocaaosapi.startAppStoreSort(sortid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startappstorelist").addEventListener("click", function() {
            var listid = eval(document.getElementById('applistid')).value;
            console.log(listid);
            coocaaosapi.startAppStoreList(listid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startappstoredetail").addEventListener("click", function() {
            var detailid = eval(document.getElementById('appdetailid')).value;
            console.log(detailid);
            coocaaosapi.startAppStoreDetail(detailid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startappstorezone").addEventListener("click", function() {
            var zoneid = eval(document.getElementById('appzoneid')).value;
            console.log(zoneid);
            coocaaosapi.startAppStoreZone(zoneid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startdownloadapp").addEventListener("click", function() {
            var downloadstring = eval(document.getElementById('downloadid')).value;
            console.log(downloadstring);
            coocaaosapi.startOrCreateDownloadTask(
                "https://qd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk",
                '',
                'qq移动版',
                'com.tencent.mobileqq',
                '123123',
                'http://img.zcool.cn/community/01559e565d84d832f875964706920d.png',
                function(message) { console.log(message); },
                function(error) { console.log(error); });
        }, false);

        document.getElementById("startgamecenter").addEventListener("click", function() {
            coocaaosapi.startGameCenter(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startgamearsenal").addEventListener("click", function() {
            coocaaosapi.startGameArsenal(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startgamelist").addEventListener("click", function() {
            var gamelistid = eval(document.getElementById('gamelistid')).value;
            console.log(gamelistid);
            var gametitleid = eval(document.getElementById('gametitleid')).value;
            console.log(gametitleid);
            coocaaosapi.startGameCenterList(gamelistid, gametitleid, function(message) { console.log(message); }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startgamedetail").addEventListener("click", function() {
            var gamedetailid = eval(document.getElementById('gamedetailid')).value;
            console.log(gamedetailid);
            coocaaosapi.startGameCenterDetail(gamedetailid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startgamezone").addEventListener("click", function() {
            var gamezoneid = eval(document.getElementById('gamezoneid')).value;
            console.log(gamezoneid);
            coocaaosapi.startGameCenterZone(gamezoneid, function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("getsysteminfo").addEventListener("click", function() {
            coocaaosapi.getDeviceInfo(function(message) {
                console.log(JSON.stringify(message));
                document.getElementById('systeminfoid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getnetworking").addEventListener("click", function() {
            coocaaosapi.isNetConnected(function(message) {
                console.log("isnetworking " + message.isnetworking);
                document.getElementById('isnetworkingid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getnettype").addEventListener("click", function() {
            coocaaosapi.getNetType(function(message) {
                console.log("nettype " + message.nettype);
                document.getElementById('nettypeid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getipinfp").addEventListener("click", function() {
            coocaaosapi.getIpInfo(function(message) {
                console.log(JSON.stringify(message));
                document.getElementById('ipinfoid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("gethaslogin").addEventListener("click", function() {
            coocaaosapi.hasCoocaaUserLogin(function(message) {
                console.log("haslogin " + message.haslogin);
                document.getElementById('hasloginid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getuserinfo").addEventListener("click", function() {
            coocaaosapi.getUserInfo(function(message) {
                console.log(JSON.stringify(message));
                document.getElementById('userinfoid').innerHTML = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getlocation").addEventListener("click", function() {
            coocaaosapi.getDeviceLocation(function(message) {
                console.log("location " + JSON.stringify(message));
                document.getElementById('locationid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        /*listener*/
        coocaaosapi.addNetChangedListener(function(message) {
        	console.log("addNetChangedListener " + JSON.stringify(message));
            console.log("nettype " + message.nettype);
            console.log("netevent " + message.netevent);
            document.getElementById("netchanged").value = JSON.stringify(message);
        });

        document.getElementById("removeListen").addEventListener("click", function() {
            coocaaosapi.removeUSBChangedListener(function(message) {
                console.log("usbinfo " + JSON.stringify(message));
                console.log("USB_CHANGGED received! ismount: " + message.usbmount);
                console.log("USB_CHANGGED received! mountpath: " + message.mountpath);
                document.getElementById("usbchanged").value = JSON.stringify(message);
            });
        }, false);

        document.getElementById("addListen").addEventListener("click", function() {
            coocaaosapi.addUSBChangedListener(function(message) {
                console.log("usbinfo " + JSON.stringify(message));
                console.log("USB_CHANGGED received! ismount: " + message.usbmount);
                console.log("USB_CHANGGED received! mountpath: " + message.mountpath);
                document.getElementById("usbchanged").value = JSON.stringify(message);
            });
        }, false);

        coocaaosapi.addUSBChangedListener(function(message) {
            console.log("usbinfo " + JSON.stringify(message));
            console.log("USB_CHANGGED received! ismount: " + message.usbmount);
            console.log("USB_CHANGGED received! mountpath: " + message.mountpath);
            document.getElementById("usbchanged").value = JSON.stringify(message);
        });

        coocaaosapi.addAppTaskListener(function(message) {
            console.log("taskinfo " + JSON.stringify(message));
            document.getElementById("downloadchanged").value = JSON.stringify(message);
        });

        coocaaosapi.addCommonListener(function(message) {
            console.log("addCommonListener " + JSON.stringify(message));
            document.getElementById("commonListen").value = JSON.stringify(message);
        });

        coocaaosapi.addUserChanggedListener(function(message) {
            console.log("addUserChanggedListener " + JSON.stringify(message));
            document.getElementById("userchanged").value = JSON.stringify(message);
        });

        coocaaosapi.addPurchaseOrderListener(function(message) {
            console.log("startpurcharse message " + JSON.stringify(message));
            document.getElementById("purcharsecallback").value = JSON.stringify(message);
        });

        document.getElementById("startpurcharse").addEventListener("click", function() {
            var math = Math.random() * 9000000 + 1000000;
            coocaaosapi.purchaseOrder('1001', math + '', '包月', 'product detail', '虚拟', { 'notify_url': 'http://42.121.113.121:8090/aqiyiOrder/viewMain.html' }, 0.01, 0, '', '',
                function(success) {console.log("purchaseOrder message " + JSON.stringify(message));},
                function(error) { console.log(error); });
        }, false);

        document.getElementById("getusertoken").addEventListener("click", function() {
            coocaaosapi.getUserAccessToken(function(message) {
                console.log("usertoken " + JSON.stringify(message));
                document.getElementById('usertokenid').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        //      Cordova 2.0 接口对接
        document.getElementById("getappinfo").addEventListener("click", function() {
            var a = '{"pkgList":["com.tianci.user","com.coocaa.mall"]}'
            coocaaosapi.getAppInfo(a, function(message) {
            	console.log('getAppInfo: '+JSON.stringify(message));
                document.getElementById('appinfo').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getpushinfo").addEventListener("click", function() {
            var a = '{"pkgList":["com.tianci.user","com.coocaa.mall"]}'
            coocaaosapi.getPushInfo(a, function(message) {
            	console.log('getPushInfo: '+JSON.stringify(message));
                document.getElementById('pushinfo').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getthemeinfo").addEventListener("click", function() {
            coocaaosapi.getCurTheme(function(message) {
            	console.log('getCurTheme: '+JSON.stringify(message));
                document.getElementById('themeinfo').value = JSON.stringify(message);
            }, function(error) { console.log(error); })
        }, false);

        // document.getElementById("getcordovainfo").addEventListener("click", function() {
        //     coocaaosapi.getWebViewSDKInfo(function(message) {
        //         document.getElementById('cordovainfo').value = JSON.stringify(message);
        //     }, function(error) { console.log(error); })
        // }, false);

        // document.getElementById("getappstoreinfo").addEventListener("click", function() {
        //     coocaaosapi.getAppStoreInfo(function(message) {
        //         document.getElementById('appstoreinfo').value = JSON.stringify(message);
        //     }, function(error) { console.log(error); })
        // }, false);

        document.getElementById("setfocusposition").addEventListener("click", function() {
            var focuspositioninfo = document.getElementById("focusposition").value;
            coocaaosapi.setFocusPosition(focuspositioninfo, function(message) {
                console.log("return message = " + message);
                if (message == "OK") { document.getElementById(focuspositioninfo).focus() };
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("pushwebinfo").addEventListener("click", function() {
            var mywebinfo = document.getElementById("webinfo").value;
            coocaaosapi.notifyJSMessage(mywebinfo, function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("pushloginfo").addEventListener("click", function() {
            var eventId = document.getElementById("eventid").value;
            var dData = document.getElementById("ddata").value;
            coocaaosapi.notifyJSLogInfo(eventId, dData, function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startappshop").addEventListener("click", function() {
            coocaaosapi.startAppShop(function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startappshoplist").addEventListener("click", function() {
            var id = document.getElementById("appshopid").value;
            var title = document.getElementById("appshoptitle").value;
            coocaaosapi.startAppShopList(id, title, function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startappshopdetail").addEventListener("click", function() {
            var id = document.getElementById("appshopdetailid").value;
            coocaaosapi.startAppShopDetail(id, function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startappshopzone").addEventListener("click", function() {
            var id = document.getElementById("appshopzoneid").value;
            coocaaosapi.startAppShopZone(id, function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startappshopzonelist").addEventListener("click", function() {
            coocaaosapi.startAppShopZoneList(function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startappshopvideo").addEventListener("click", function() {
            var id = document.getElementById("appshopvideoid").value;
            var url = document.getElementById("appshopvideourl").value;
            var name = document.getElementById("appshopvideoname").value;
            coocaaosapi.startAppShopVideo(id, url, name, function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("startappshopbuying").addEventListener("click", function() {
            var id = document.getElementById("appshopbuyingid").value;
            coocaaosapi.startAppShopBUYING(id, function(message) {
                console.log("return message = " + message);
            }, function(error) { console.log(error); })
        }, false);

        document.getElementById("getSystemProperty").addEventListener("click", function() {
            var sysPropertykey = document.getElementById("getSystemPropertyKey").value;
            console.log("sysProperty key=" + sysPropertykey);
            var ffffffFlag = "gfdsa";
            coocaaosapi.getPropertiesValue(sysPropertykey, function(message) {
                console.log("sysProperty value=" + JSON.stringify(message));
                ffffffFlag = "success123";
                console.log("ffffffFlag = " + ffffffFlag);
                document.getElementById('getSystemPropertyValue').value = JSON.stringify(message);
            }, function(error) {
                ffffffFlag = "fail123";
                console.log(error + "ffffffFlag = " + ffffffFlag);
            });
        }, false);

        document.getElementById("startbyaction").addEventListener("click", function() {
            coocaaosapi.startUserSettingAndFinish(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startbypkgandclass").addEventListener("click", function() {
            coocaaosapi.startUserSettingAndFinish2(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startbypkgandaction").addEventListener("click", function() {
            coocaaosapi.startUserSettingAndFinish3(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

        document.getElementById("startbypkg").addEventListener("click", function() {
            coocaaosapi.startUserSettingAndFinish4(function(message) { console.log(message); }, function(error) { console.log(error); });
        }, false);

    }

};

app.initialize();