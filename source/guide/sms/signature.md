title: 接口验证机制
---

本篇文档介绍短信接口的验证机制。

短信发送使用数字签名(signature)的验证模式。这种模式能够有效避免签名密钥在传输途中的泄露，是安全级别很高的一种加密验证方式。

## 数字签名验证模式

调用接口时, 用户不需要把签名密钥 (SMS_KEY)作为参数明文传输, 而是将数字签名 (signature)作为参数传输给服务器，服务器端会验证此数字签名(signature)的正确性。

## 生成数字签名的方法

1.将实际调用 API (除去`smsKey` 和 `signature`字段)的参数以字母升序(A-Z)排列，Java 示例如下（其他语言规则一致）：

```   
// 发送短信验证码
    public static void sendCode(String templateId, String mobile) {
        long timestamp = System.currentTimeMillis();
        Map<String, String> params = new HashMap<String, String>();
        // 设置请求参数
        params.put("templateId", templateId);
        params.put("mobile", mobile);
        params.put("timestamp", String.valueOf(timestamp));
        // 对以上三个请求参数进行升序排列
        Map<String, Object> sortedMap = new TreeMap<String, Object>(new Comparator<String>() {
            public int compare(String arg0, String arg1) {
                // 忽略大小写
                return arg0.compareToIgnoreCase(arg1);
            }
        });

```

此处可参考完整 [示例代码](/resources/sms/resources.html)。

2.以 `key=value’ + ‘&’ + ‘key=value`的方式连接所有参数,得到字符串 `param_str`。

3.以 `param_str + ‘&’ + SMS_KEY` 的方式得到字符串 `sign_str`。

4.计算 `sign_str`的 SHA256值 (64位, 不区分大小写), 得到 `signature`

5.该签名用于各个接口的访问。

其中短信 API 密钥( SMS_KEY )在 控制面板-短信-模板 中获取，操作如下：

![](/images/smssecretkey.png)

<blockquote class="notice">
  <p><strong>提示：</strong></p>
  <li>生成签名时, 参数不要使用`urlencode`。在调用 api 时, 才需要对参数做 `urlencode`</li>
  <li>`&`是代码中使用的连接符, `+`是文档显示之用。</li>
</blockquote>




