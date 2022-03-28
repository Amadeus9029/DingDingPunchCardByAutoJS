// var sex = dialogs.singleChoice("请选择性别", ["男", "女"], 2)
// toast("选择了第" + (sex + 1) + "个选项")
//包名
const PACKAGE_ID_TASKER = "net.dinglisch.android.taskerm"; // Tasker
const PACKAGE_ID_QQ = "com.tencent.tim"; // qq(tim)
const PACKAGE_ID_WeChat = "com.tencent.mm"; // qq(tim)
const PACKAGE_ID_DD = "com.alibaba.android.rimet"; // 钉钉
const PACKAGE_ID_CALENDAR = "com.oneplus.calendar"; // 日历
// 执行时的屏幕亮度（0-255），需要"修改系统设置"权限
const SCREEN_BRIGHTNESS = 50;
// 锁屏意图，配合 Tasker 完成锁屏动作
const ACTION_LOCK_SCREEN = "autojs.intent.action.LOCK_SCREEN";
// function openPhone(item) {
//     switch (item) {
//         case '0':
//             click(500, 1500);
//             break;
//         case '1':
//             click(250, 950);
//             break;
//         case '2':
//             click(500, 950);
//             break;
//         case '3':
//             click(750, 950);
//             break;
//         case '4':
//             click(250, 1150);
//             break;
//         case '5':
//             click(500, 1150);
//             break;
//         case '6':
//             click(750, 1150);
//             break;
//         case '7':
//             click(250, 1400);
//             break;
//         case '8':
//             click(500, 1400);
//             break;
//         case '9':
//             click(750, 1400);
//             break;
//         default:
//             break;
//     };
// }
// function openPhone(item) {
//     switch (item) {
//         case '0':
//             click(720, 2160);
//             break;
//         case '1':
//             click(340, 1450);
//             break;
//         case '2':
//             click(720, 1450);
//             break;
//         case '3':
//             click(1100, 1450);
//             break;
//         case '4':
//             click(340, 1690);
//             break;
//         case '5':
//             click(720, 1690);
//             break;
//         case '6':
//             click(1100, 1690);
//             break;
//         case '7':
//             click(340, 1920);
//             break;
//         case '8':
//             click(720, 1920);
//             break;
//         case '9':
//             click(1100, 1920);
//             break;
//         default:
//             break;
//     };
// }
// function openPhone(item) {
//     switch (item) {
//         case '0':
//             click(526, 1682);
//             break;
//         case '1':
//             click(244, 1100);
//             break;
//         case '2':
//             click(526, 1100);
//             break;
//         case '3':
//             click(829, 1100);
//             break;
//         case '4':
//             click(244, 1303);
//             break;
//         case '5':
//             click(526, 1303);
//             break;
//         case '6':
//             click(829, 1303);
//             break;
//         case '7':
//             click(244, 1490);
//             break;
//         case '8':
//             click(526, 1490);
//             break;
//         case '9':
//             click(829, 1490);
//             break;
//         default:
//             break;
//     };
function openPhone(item) {
    switch (item) {
        case '0':
            click(526, 1682);
            break;
        case '1':
            click(250, 1100);
            break;
        case '2':
            click(526, 1100);
            break;
        case '3':
            click(829, 1100);
            break;
        case '4':
            click(244, 1303);
            break;
        case '5':
            click(526, 1303);
            break;
        case '6':
            click(829, 1303);
            break;
        case '7':
            click(244, 1490);
            break;
        case '8':
            click(526, 1490);
            break;
        case '9':
            click(829, 1490);
            break;
        default:
            break;
    };
}
/**
 * @description 唤醒设备
 */
function brightScreen() {
    device.wakeUpIfNeeded();
    sleep(1000)
    gesture(420, [540, device.height * 0.9], [540, device.height * 0.1]);
    var psd = "666666"
    for (var i = 0; i < psd.length; i++) {
        sleep(500)
        var word = psd[i].valueOf()
        openPhone(word)
    }
}

/**
 * @description 锁屏
 */
function lockScreen() {
    console.log("关闭屏幕");
    sleep(1000);
    // 锁屏方案1：Root
    // Power()

    // 锁屏方案2：No Root
    // press(Math.floor(device.width / 2), Math.floor(device.height * 0.973), 1000) // 小米的快捷手势：长按Home键锁屏

    // 万能锁屏方案：向Tasker发送广播，触发系统锁屏动作。配置方法见 2021-03-09 更新日志
    app.sendBroadcast({ action: ACTION_LOCK_SCREEN });
    device.setBrightnessMode(1); // 自动亮度模式
    device.cancelKeepingAwake(); // 取消设备常亮

    sleep(200);
    if (!device.isScreenOn()) {
        console.info("屏幕已关闭");
    } else {
        console.error("屏幕未关闭，请尝试其他锁屏方案，或等待屏幕自动关闭");
    }
}
/**
 * @description 强行停止应用
 */
function stopApplication(packageName) {
    console.log("强行停止：" + packageName);
    openAppSetting(packageName);
    waitAndClick("结束运行");
    sleep(1000)
    waitAndClick("确定");
    sleep(1000)
    secureHome();
}

function signIn() {
    app.launchPackage(PACKAGE_ID_DD); //启动钉钉
    console.log("正在启动: " + app.getAppName(PACKAGE_ID_DD));

    while (
        !(
            currentActivity() ==
            "com.alibaba.android.user.login.SignUpWithPwdActivity" ||
            null != id("home_im_tab_popup").findOnce()
        )
    ) {
        sleep(200); // 等待钉钉启动
        app.launchPackage(PACKAGE_ID_DD); //启动钉钉
    }


    if (
        currentPackage() == PACKAGE_ID_DD &&
        currentActivity() == "com.alibaba.android.user.login.SignUpWithPwdActivity"
    ) {
        console.info("账号未登录");

        id("et_phone_input").findOne().setText(ACCOUNT);
        console.log("输入账号");

        id("et_pwd_login").findOne().setText(PASSWORD);
        console.log("输入密码");

        id("cb_privacy").findOne().click();
        console.log("同意隐私协议");

        id("btn_next").findOne().click();
        console.log("正在登陆...");
    } else {
        console.info("账号已登录");
    }

    while (null == id("home_im_tab_popup").findOnce()) sleep(200); // 等待进入主页面
    console.log("启动完毕");
}
/**
 * @description 随机等待
 */
function holdOn(low, up) {
    let randomTime = random(low, up);
    console.log("等待: " + randomTime + "ms");
    sleep(randomTime);
}
function secureHome() {
    home();
    sleep(200); //等待系统动画结束
}

/**
 * @description 循环等待点击
 */
function waitAndClick(clickText) {
    console.log("start click: " + clickText);
    for (let index = 0; index < 10; index++) {
        if (
            null != text(clickText).findOnce() &&
            null == text("加载中").findOnce()
        ) {
            while (!click(clickText));
            console.log("success click: " + clickText);
            return true;
        }
        holdOn(500 + index * 50, 500 + index * 100); // 随机退让
    }
    console.error("time out: " + clickText);
    return false;
}
function findAn() {
    // requestScreenCapture()
    // let screenImg = captureScreen()
    let screenImg = images.read("/sdcard/Pictures/WeiXin/ding.jpg")
    console.log("Get ScreenImg Successful!")
    let target = images.read("/sdcard/Pictures/WeiXin/an.jpg")
    console.log("Get an Successful!")
    console.log(screenImg)
    console.log(target)
    let res = images.findImage(screenImg, target)
    if (res) {
        click(res.x + 20, res.y + 40)
        console.log(res.x, res.y)
    } else {
        gestures([350, [300, 1400], [300, 400]])
        findAn()
        console.log("未找到")
    }
    sleep(1000)
}

function fillTable() {
    console.log("start table")
    let my = {
        "temperature": "以下",
        "zx": "在校",
        "dw": "点击获取定位"
    }
    sleep(10000)
    let new_day = text("确定").findOnce()
    if (new_day) new_day.click()
    sleep(1000)
    gestures([350, [300, 1400], [300, 400]])
    let temperature_btn = textContains(my.temperature).findOnce()
    console.log(temperature_btn)
    if (temperature_btn) {
        temperature_btn.click()
        console.log("点击成功")
    } else {
        console.log("未找到")
    }
    sleep(3000)
    if (text(my.dw).findOnce().click()) {
        console.log("获取定位成功")
    } else {
        console.log("未找到")
    }
    sleep(5000)
    let address = text("浙江省舟山市定海区").find()[0].text()
    console.log(address)
    if (address != "浙江省舟山市定海区") my.zx = "不在校"
    text("确定").findOnce().click()
    sleep(5000)
    console.log(textContains(my.zx).findOne())
    console.log(textContains(my.zx).find().length)
    if (my.zx == "在校" && textContains(my.zx).find()[1].click()) {
        console.log("点击成功")
    } else if (my.zx == "不在校" && textContains(my.zx).find()[0].click()) {
        console.log("不在校点击成功")
    } else {
        console.log("未找到")
    }
    sleep(500)
    gestures([350, [300, 1400], [300, 400]])
    gestures([350, [300, 1400], [300, 400]])
    gestures([350, [300, 1400], [300, 400]])
    gestures([350, [300, 1400], [300, 400]])
    waitAndClick("提交")
    // waitAndClick("提交成功")
    // stopApplication(PACKAGE_ID_DD);
}
function punchCard() {
    waitAndClick("工作台")
    sleep(1000)
    click("工作台")
    click("工作台")
    sleep(1000)
    click("工作台")
    click("工作台")
    sleep(1000)
    waitAndClick("工作台")
    findAn()
    fillTable()
    // sendQQMsg()
}
/**
 * @description 发送QQ消息
 * @param {string} message 消息内容
 */
function sendQQMsg(message) {
    app.sendEmail({
        email: ["965720890@qq.com"],
        subject: "打卡成功",
        text: "打卡成功"
    });
    //选择默认邮件程序
    var button = text("通过邮件发送").findOne()
    if (button) {
        toast("默认选择电子邮件");
        sleep(1000)
        button.parent().click();
    }
    // //等待特定Activity页面,并发送
    // waitForActivity(activity = "com.kingsoft.mail.compose.ComposeActivity", period = 200);
    sleep(3000)
    click("发送")
    sleep(1000)
}
if (device.isScreenOn()) {
    console.info("屏幕已唤醒");
} else {
    console.info("开始唤醒屏幕");
    brightScreen()
}
signIn()
punchCard()
lockScreen()

// zyqekrmstcgjbbhd
// eyoxpmestlsqbbea
