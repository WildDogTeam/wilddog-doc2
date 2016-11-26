title: 离线推送
---

本篇文档介绍如何使用离线推送。

用户进入应用后台或者断开与 Wilddog 服务器的连接的时候，收到的消息将通过推送通知的形式传递给用户，用户可以自定义点击推送通知之后的操作。

## 开通推送服务
Wilddog IM 同时集成小米和华为推送，使用离线推送至少需要配置一项推送服务，为了保证到达率，小米和华为推送都需要配置。
<blockquote class="notice">
  <p><strong>提示：</strong></p>
  华为手机使用华为推送，其他手机都将使用小米推送。
</blockquote>

### 开通小米推送
1. 请前往 [小米开发者平台](http://dev.xiaomi.com/console/) 申请开发账号。
2. 参照 [小米启用指南](http://dev.xiaomi.com/doc/?p=1621) 创建应用。

### 开通华为推送
1. 请前往 [华为开发者联盟](http://developer.huawei.com/devunion/ui/devplan.html) 申请开发账号。
2. 参照 [华为开发指导书](http://developer.huawei.com/consumer/cn/wiki/index.php?title=HMS%E5%BC%80%E5%8F%91%E6%8C%87%E5%AF%BC%E4%B9%A6-PUSH%E6%9C%8D%E5%8A%A1%E6%8E%A5%E5%8F%A3) 创建应用并申请推送服务权限。

## 配置离线推送
开通小米、华为推送服务后，需要在控制面板-即时通讯-基本配置-Android配置 中进行配置。

![](http://ocpo37x5v.bkt.clouddn.com/2016-11-26-im%20android%20push.png)







 