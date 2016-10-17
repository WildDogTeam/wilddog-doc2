title: Auth 更新日志
---

## iOS SDK

### V2.0.0 - 2016.09.01

**描述**

Auth 部分全面升级，脱离 WilddogSync 可独立使用。

**新增**

- 新增 WDGAuth 类进行 auth 操作。
- 新增 WDGUser 类用于获取用户信息。
- 新增各种 AuthProvider 类和 AuthCredential 类用于用户认证。
- 新增 WDGUserProfileChangeRequest 类用于修改用户信息。

### V2.0.1 - 2016.09.10

**描述**

改进 Auth 的初始化方法，与 WilddogCore SDK 对接。

**新增**

新增 +auth 方法。

**改进**

- 统一 Auth 模块初始化接口。
- 改进 -authWithApp: 方法，参数改为 WDGApp 类

</br>
---

## Android SDK

### V2.0.0 - 2016.09.01

**描述**

 该版本将 Auth SDK 从 Wilddog SDK 中分离。

**新增**

- 新增 WilddogAuth 对象进行 auth 操作。
- 新增 WilddogUse r对象用于获取登录后用户信息。
- 新增各种 AuthProvider 和 AuthCredential 用于认证或绑定用户。
- 新增 GetTokenResult 类用于获取 token。
- 新增 UserProfileChangeRequest 类用于修改用户信息。

</br>
---

## Server API

### V2.0.0 - 2016.08.19

**描述**

新增 Wilddog Auth Server SDK 服务。

**新增**

- Auth2.0 版本的 customToken 生成器功能。
- Wilddog ID Token 的校验功能。

### V2.0.1 - 2016.09.01

**描述**

优化Wilddog Auth Server SDK。

**优化**

对 Server SDK 进行了代码重构优化。

### V2.0.2 - 2016.09.06

**描述**

优化 Wilddog Auth Server SDK。

**修复**

修复 CustomToken 的生成器中,允许有 ',' 的规则判断。

### V2.0.3 - 2016.09.06

**描述**

优化 Wilddog Auth Server SDK。

**优化**

加强 Wilddog ID Token 校验功能。

### V2.0.4 - 2016.10.17

**描述**

优化 Wilddog Auth Server SDK。

**增加**

增加 CustomToken 的生成器中,允许有 ',' 的规则判断。

