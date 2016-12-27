title: 怎样使用野狗SDK实现手机注册先填写验证码再输入密码场景？
tag:身份认证
---

整体思路如下（语法以js为例）：

1. 使`createUserWithPhone`创建一个用户，该用户有默认密码。在网页上只需要一个用户名文本框。
2. 使用`sendPhoneVerification`方法给当前用户发送验证码。
3. 判断`currentUser`是否存在如果存在则调用`verifiyPhone`方法验证手机号。
4. 当验证成功后，使用`updatePassword`来让用户更新密码。如果验证失败并且用户关闭/刷新页面或则点击取消注册按钮，则调用`delete`方法删除当前用户。

JS代码示例如下：

```js
//输入结束后点击发送验证码
wilddog.auth().createUserWithPhoneAndPassword('18888888888', 'you default password').then(function(user) {
  user.sendPhoneVerification().then(function() {
    alert("you phone verifycode send successfully");
  })
}).
catch(function(err) {
  //Handle err
})

//用户点击注册按钮
if (wilddog.auth().currentUser) {
  wilddog.auth().currentUser.verifiyPhone('your verifycode').then(function() {
    wilddog.auth().currentUser.updatePassword('let your user input password');
  }).
  catch(function(err) {
    alert('you phone verifycode is error');
  })
} else {
  //Handle when currentUser is null
}
```
