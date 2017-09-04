
title: 实战教程
---

本文档将给出尽量详尽的示例教程。


## 示例说明

本教程以野狗实时通信云的 `套餐到期通知`短信为例，讲解如何通过通知类 API 实现通知短信的发送（Java 端）。

示例最终发送到用户端的效果如下：
 
![](/images/tutorialsms.jpg)

## 具体步骤

### 1. 创建应用

首先在控制面板中创建应用。如下：

![](/images/tutorialsmsapp01.png)
![](/images/tutorialsmsapp02.png)


### 2. 账户充值

短信服务需帐户余额大于 5 元才能使用。如余额不足，请进入 [控制面板-财务-充值](https://www.wilddog.com/pay/recharge) 进行充值。

### 3. 配置短信
#### （1）配置签名
该签名会出现在下发短信的开头，建议写上你的品牌或产品名称。此处我们以【野狗实时】为例。在`控制面板-短信-配置`配置如下，签名提交后，需管理员审核。

![](/images/tutorialsmssign.png)


#### （2）创建模版
模板短信由固定内容与多个变量构成，以`套餐到期通知`为例，模版配置如下：

![](/images/tutorialsmsmode.jpg)

其中 `%s`即为需要接口替换的变量：本例中为用户名和套餐种类。提交该模版会自动生成模版 ID（ `templateId `）。


### 4.生成数字签名（signature ）
（1）罗列实际调用的 API 参数，除去其中的 signature 字段。

因本次示例为 [通知类短信](/sms/guide/notify.html)，除去 `signature`后，传送的参数如下：

```
templateId：100001
mobiles：["13452366225"]
params：["王小豆","个人版套版套餐"]
timestamp：1482995211000
```

（2）将参数以字母升序(A-Z)排列，以 key=value’ + ‘&’ + ‘key=value的方式连接所有参数,得到字符串 param_str。

```
param_str="mobiles=13452366225&params=["王小豆","个人版套版套餐"]&templateId=100001&timestamp=1482301296"
```

（3）以 param_str + ‘&’ + SMS_KEY 的方式得到字符串 `sign_str`

```
sign_str="mobile=13452366225&params=["王小豆","个人版套版套餐"]&templateId=100001&timestamp=1482301296&kYVAi9tXAbPOURnkWiiWADRuNi6DJy7JmSg02myB"
```
其中 SMS_KEY 在控制面板获取：

![](/images/smssecretkey.png)


（4）计算 sign_str的 [SHA256](https://zh.wikipedia.org/wiki/SHA%E5%AE%B6%E6%97%8F) 值, 得到 `signature`

本例中字符串计算后的值如下：

```
4E0461B0EA1E3E22E32F62B84D7D6BBFC9A111BBEA7BF9030E962D29989A5F9E
```

### 5. 发送本条通知短信

```
curl -X POST https://sms.wilddog.com/api/v1/yourtestapp/notify/send -d "signature =4E0461B0EA1E3E22E32F62B84D7D6BBFC9A111BBEA7BF9030E962D29989A5F9E&templateId =100001& timestamp =13452366225&mobiles=1482301296&params=["王小豆","个人版套版套餐"]"
```
此处规则详情请参考 [完整指南](/sms/guide/signature.html#生成数字签名的方法)。
## 获取示例源码

点此获取完整的 [示例源码](https://github.com/WildDogTeam/wilddog-doc2/blob/master/source/sms/resources/nitifydemo.md)。

