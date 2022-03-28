
//钉钉包名
const PACKAGE_ID_DD = "com.alibaba.android.rimet";
//手机数字解锁密码
const unlock_pwd = "123456";
// 打卡应用图标位置
const AN_PLACE = { x: 125, y: 975 };
// 手机数字解锁键盘坐标
const KEYBOARD = [{ x: 500, y: 1500 }, { x: 250, y: 950 }, { x: 500, y: 950 },
{ x: 750, y: 950 }, { x: 250, y: 1150 }, { x: 500, y: 1150 },
{ x: 750, y: 1150 }, { x: 250, y: 1400 }, { x: 500, y: 1400 },
{ x: 750, y: 1400 }];
/**
 * @description 唤醒设备
 */
function brightScreen() {
    device.wakeUpIfNeeded();
    sleep(1000)
    gesture(420, [540, device.height * 0.9], [540, device.height * 0.1]);
    var psd = unlock_pwd
    for (var i = 0; i < psd.length; i++) {
        sleep(500)
        click(KEYBOARD[psd[i]].x, KEYBOARD[psd[i]].y)
    }
}
/**
 * @description 登录钉钉
 */
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
/**
 * @description 点击打卡应用图标
 */
function clickAN() {
    click(AN_PLACE.x, AN_PLACE.y);
    sleep(1000)
}
/**
 * @description 填写提交表单
 */
function fillTable() {
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
    clickAN()
    fillTable()
}

if (device.isScreenOn()) {
    console.info("屏幕已唤醒");
} else {
    console.info("开始唤醒屏幕");
    brightScreen()
}
signIn()
punchCard()
