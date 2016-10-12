title: WilddogUser
---
获取用户在 Wilddog Auth的个人资料信息。它还有辅助方法进行用户信息的修改和查询，以及管理用户的身份验证方式。

## 方法

### delete ()

**定义**

```java
public Task<`Void`> delete ()
```

**说明**

从Wilddog Auth 系统中删除用户.
如果操作成功，用户将从登录系统中登出。
这个是一个安全敏感操作，需要用户用户最近登录过才能操作成功，如果失败，请先使用`reauthenticate(AuthCredential)`方法.
</br>

---
### getDisplayName ()

**定义**

```java
public abstract String getDisplayName ()
```

**说明**

获取当前用户的昵称，如果是第三方登录方式，不能修改昵称信息，因此不会第三方登录平台昵称不会受到影响。使用`updateProfile(UserProfileChangeRequest)`方法会更新这个属性。

如果使用`signInWithCredential （ AuthCredential ）`登录的时候包含这个属性，将在登录时候自动创建填充属性。 
</br>

---
### getEmail ()

**定义**

```java
public abstract String getEmail ()
```

**说明**

返回当前用户设置的邮箱地址，如果第三方登录中含有这个属性，将不能被修改。
其他情况下可以通过`updateEmail(email)`方法会更新这个属性.
  
这个属性将会在`linkWithCredential(AuthCredential)`的`EmailAuthCredential`或者`createUserWithEmailAndPassword(email, password)`填充这个属性.
</br>

---
### getPhotoUrl ()

**定义**

```java
public abstract Uri getPhotoUrl ()
```

**说明**

返回当前用户的头像的url，如果第三方登录中含有这个属性，将不能被修改。
其他情况下可以通过`updateProfile(UserProfileChangeRequest)`方法会更新这个属性.
   
如果使用`signInWithCredential （ AuthCredential ）`登录的时候包含这个属性，将在登录时候自动创建填充属性。
</br>

---
### getProviderData ()

**定义**

```java
public abstract List<? extends UserInfo> getProviderData()
```

**说明**

获取在 Wilddog Auth 系统中用户绑定的所有认证类型的用户信息列表.
</br>

---
### getProviderId ()

**定义**

```java
public abstract String	getProviderId()
```

**说明**

返回 PROVIDER_ID，例如 "qq","weixin"，"weibo"，"password"。
</br>

---
### getToken ()

**定义**

```java
public Task<GetTokenResult> getToken (boolean forceRefresh)
```

**说明**

获取 Wilddog ID Token，使用我们的服务器SDK或按照官方文件安全地验证此token的完整性和有效性。
</br>

---
### getUid ()

**定义**

```java
public abstract String getUid ()
```

**说明**

获取在Wilddog Auth 系统中的用户的唯一标识.
   
该标识符是不透明的，不一定对应于用户的电子邮件地址或任何其它属性.
</br>

---
### isAnonymous ()

**定义**

```java
public abstract boolean isAnonymous ()
```

**说明**

判断当前用户是否是匿名登录，表示当前未绑定其他登录认证方式。
</br>

---
### linkWithCredential(credential)

**定义**

```java
public Task<AuthResult> linkWithCredential (AuthCredential credential)
```

**说明**

将当前用户与给定的登录认证方式绑定。之后支持绑定的所有登录认证方式。

**参数**


参数名 | 描述
--- | ---
credential | 要关联的登录方式的AuthCredential实例。

</br>

---
### reauthenticate(credential)

**定义**

```java
public Task<`Void`> reauthenticate (AuthCredential credential)
```

**说明**

用给定的登录认证方式重新认证。

**参数**


参数名 | 描述
--- | ---
credential | 要重新认证的AuthCredential实例。

</br>

---
### reload ()

**定义**

```java
Task<`Void`>	reload()
```

**说明**

手动刷新当前用户的数据。（连接提供者，显示名称等等）
</br>

---
### unlink (provider)

**定义**

```java
Task<`AuthResult`>	unlink(String provider)
```

**说明**

将给定的登录认证类型从当前用户绑定列表中解除绑定.

**参数**


参数名 | 描述
--- | ---
provider | 要解除绑定的登录方式的providerId。
</br>

---
### updateEmail (email)

**定义**

```java
Task<Void>	updateEmail(String email)
```

**说明**

将给定的登录认证类型从当前用户绑定列表中解除绑定.

**参数**


参数名 | 描述
--- | ---
email | 当前用户要更新的邮箱地址。
</br>

---
### updatePassword (password)

**定义**

```java
Task<`Void`>	updatePassword(String password)
```

**说明**

更新当前登录认证用户的密码信息.

**参数**


参数名 | 描述
--- | ---
password | 当前用户要更新的密码。
</br>

---
### updateProfile (request)

**定义**

```java
Task<Void>	updateProfile(UserProfileChangeRequest request)
```

**说明**

更新当前用户的昵称信息和头像URL

**参数**


参数名 | 描述
--- | ---
request | 包含要更新的昵称或者用户头像信息的请求对象。
</br>

---