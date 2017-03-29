title: WDGUserInfo
---

Wilddog Auth 用户信息，这是一个协议。

## 属性

### providerID

**定义**

```objectivec
@property(nonatomic, copy, readonly) NSString *providerID
```

**说明**

用户登录方式。

</br>

------
### uid

**定义**

```objectivec
@property(nonatomic, copy, readonly) NSString *uid
```

**说明**

用户 ID。

</br>

------
### displayName

**定义**

```objectivec
@property(nonatomic, copy, readonly, nullable) NSString *displayName
```

**说明**

用户名。

</br>

------
### photoURL

**定义**

```objectivec
@property(nonatomic, copy, readonly, nullable) NSURL *photoURL
```

**说明**

用户头像。

</br>

------
### email

**定义**

```objectivec
@property(nonatomic, copy, readonly, nullable) NSString *email
```

**说明**

用户邮箱地址。
</br>

------
### phone

**定义**

```objectivec
@property(nonatomic, copy, readonly, nullable) NSString *phone
```

**说明**

用户手机号码。

