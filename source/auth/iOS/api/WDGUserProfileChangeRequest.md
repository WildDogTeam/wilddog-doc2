title: WDGUserProfileChangeRequest
---

用来更新用户信息。

## 属性

### displayName

**定义**

```objectivec
@property(nonatomic, copy, nullable) NSString *displayName
```

**说明**

用户名

**参考**

必须在使用  WDGUserProfileChangeRequest.commitChangesWithCallback: 方法前设置这个参数。

</br>

------
### photoURL

**定义**

```objectivec
@property(nonatomic, copy, nullable) NSURL *photoURL
```

**说明**

用户头像  

**参考**

必须在使用  WDGUserProfileChangeRequest.commitChangesWithCallback: 方法前设置这个参数。

</br>

------

## 方法

### - init

**定义**

```objectivec
- (nullable instancetype)init NS_UNAVAILABLE;
```

**说明**

不要初始化这个对象。

**参考**
使用 WDGUser.profileChangeRequest 获取该对象。

</br>

--- 
### - commitChangesWithCompletion:

**定义**

```objectivec
- (void)commitChangesWithCompletion:(nullable WDGUserProfileChangeCallback)completion
```

**说明**

提交更改。

**参数**

参数名 | 描述
--- | ---
completion | 可以为空；请求成功或失败时调用这个 block。异步等待，主线程中回调

**参考**

修改属性必须在这个方法调用之前。
 
