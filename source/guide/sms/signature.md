title: 接口验证机制
---

本篇文档介绍短信接口的验证机制。

短信发送使用数字签名(signature)的验证模式。这种模式能够有效避免签名密钥在传输途中的泄露，是安全级别很高的一种加密验证方式。

## 数字签名验证模式

调用接口时, 用户不需要把签名密钥 (SMS_KEY)作为参数明文传输, 而是将数字签名 (signature)作为参数传输给服务器，服务器端会验证此数字签名(signature)的正确性。

## 生成数字签名的方法

1.将实际调用 API (除去`smsKey` 和 `signature`字段)的参数以字母升序q(A-Z)排列，此处可参考 [示例代码](/resources/sms/resources.html)。

2.以 `key=value’ + ‘&’ + ‘key=value`的方式连接所有参数,得到字符串 `param_str`。

3.以 `param_str + ‘&’ + SMS_KEY` 的方式得到字符串 `sign_str`。

4.计算 `sign_str`的 SHA256值 (64位, 不区分大小写), 得到 `signature`

5.改签名用于各个接口的访问

其中短信 API 密钥( SMS_KEY )在 控制面板-短信-模板 中获取，操作如下：

![](/images/smssecretkey.png)

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  <li>生成签名时, 参数不要使用`urlencode`。在调用 api 时, 才需要对参数做 `urlencode`</li>
  <li>`&`是代码中使用的连接符, `+`是文档显示之用。</li>
</blockquote>




