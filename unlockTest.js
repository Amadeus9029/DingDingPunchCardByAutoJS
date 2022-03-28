
// 屏幕解锁的数字密码，如果没有就不用设置。
const unlock_pwd = "123456";
// 键盘按键坐标，如果解锁无密码可为空。
const KEYBOARD = [{ x: 500, y: 1500 }, { x: 250, y: 950 }, { x: 500, y: 950 },
{ x: 750, y: 950 }, { x: 250, y: 1150 }, { x: 500, y: 1150 },
{ x: 750, y: 1150 }, { x: 250, y: 1400 }, { x: 500, y: 1400 },
{ x: 750, y: 1400 }];
// 起始划屏延迟时间
let swipe_time = 0;
// 递增时间，如果超过一定次数没有解锁，可以尝试减小这个数值
let swipe_time_increment = 80;
//最大解锁尝试次数
let max_try_times_swipe = 20;
/**
 * @description 输入数字密码
 */
function InputPassword() {
    var psd = unlock_pwd
    for (var i = 0; i < psd.length; i++) {
        sleep(150)
        click(KEYBOARD[psd[i]].x, KEYBOARD[psd[i]].y)
    }
}
let errorMessage = msg => {

    console.error(msg);

    device.isScreenOn() && KeyCode(26); //判断是否锁屏

    exit();

}
// 设备的高度
const HEIGHT = device.height;
//尝试解锁10次
let max_try_times_wake_up = 10;

while (!device.isScreenOn() && max_try_times_wake_up--) {

    device.wakeUp();

    sleep(500);

}
//尝试次数max，显示失败文本
if (max_try_times_wake_up < 0) errorMessage("点亮屏幕失败");

let keyguard_manager = context.getSystemService(context.KEYGUARD_SERVICE);

let isUnlocked = () => !keyguard_manager.isKeyguardLocked();

while (!isUnlocked() && max_try_times_swipe--) {

    swipe_time += swipe_time_increment;
    //模拟手势
    gesture(swipe_time, [540, HEIGHT * 0.9], [540, HEIGHT * 0.1]);
    if (unlock_pwd.length != 0) {
        InputPassword()
    }
    sleep(1200);
    console.log(swipe_time)
}
//尝试失败，重新设置一下参数
if (max_try_times_swipe < 0) errorMessage("上滑屏幕失败");

log("解锁成功");
//可到日志中查看最佳滑动时间
log("尝试得到最佳滑动时间: " + swipe_time + "(毫秒)")

exit();
// 作者：御坂14950号 https://www.bilibili.com/read/cv2656128/ 出处：bilibili