# DingDingPunchCardByAutoJS

### 自动打卡脚本

## 功能

- 基于Android系统Auto.js的钉钉自动打卡——浙江海洋大学版本

## 使用步骤

1. 安卓手机安装Auto.js，安装包已提供
2. 设置Auto.js无障碍服务、后台弹出界面权限以及系统设置为始终允许
3. 使用VSCode在电脑端调试代码，适配个人安卓手机并将代码传输到手机上
4. Auto.js开启定时任务

## VSCode代码调试

1. VSCode扩展输入Auto.js-VSCodeExt-Fixed下载v1.101.版本。

2. 根据插件使用说明连接电脑跟手机，实现电脑上的脚本能在手机上运行。

3. 开启手机开发者选项->指针位置，让屏幕叠加层显示当前触摸点坐标。

4. 记录坐标0~9的数字坐标，替换unlockTest.js中的KEYBOARD变量(行号为5)。

   ```javascript
   const KEYBOARD = [{x: 数字0的x坐标, y: 数字0的y坐标 }, { x: 数字1的x坐标, y: 数字1的y坐标 }, { x: 数字2的x坐标, y: 数字2的y坐标 },{ x: 数字3的x坐标, y: 数字3的y坐标 }, { x: 数字4的x坐标, y: 数字4的y坐标 }, { x: 数字5的x坐标, y: 数字5的y坐标 },{ x: 数字6的x坐标, y: 数字6的y坐标 }, { x: 数字7的x坐标, y: 数字7的y坐标 }, { x: 数字8的x坐标, y: 数字8的y坐标 },{ x: 数字9的x坐标, y: 数字9的y坐标 }];
   ```

   

5. 修改unlock_pwd的变量值为自己的数字屏幕解锁密码。

6. 运行unlockTest.js脚本测试合适的划屏用时swipe_time,途中的最佳滑动时间为320（毫秒），不同手机数字不同。

   ![swipe_delay](https://github.com/Amadeus9029/DingDingPunchCardByAutoJS/blob/main/img/swipe_delay.png)

7. 修改main.js中的unlock_pwd（行号5）为自己的解锁密码，修改KEYBOARD（行号9）以及SWIPE_DELAY（行号为14），SWIPE_DELAY的值就是步骤6中获取的最佳滑动时间。

8. 手机锁屏，运行main.js脚本，出现下述界面说明main.js脚本运行成功。（如果手机网络速度较慢可适当增加代码执行过程中的延迟，即修改指定位置的sleep()函数中的数值。）

   <img src="https://github.com/Amadeus9029/DingDingPunchCardByAutoJS/blob/main/img/successful.jpg" alt="successful" style="zoom:25%;" />

9. 在VSCode中右键main.js，选择保存到所有设备（Save）。刷新手机中的Auto.js界面，出现main.js脚本

10. 点击脚本更多符号选项，选择更多->定时任务，设置定时任务运行的时间。

## 小提示

IOS版本还在研发中，完成后会在新的分支发布~:train:

如果成功了的话，别忘了点击Star和分享哦~:kissing_heart:





