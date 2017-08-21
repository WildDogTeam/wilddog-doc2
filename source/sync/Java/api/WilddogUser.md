title: WilddogUser
---
获取用户在 Wilddog Auth的个人资料信息。它还有辅助方法进行用户信息的修改和查询，以及管理用户的身份验证方式。

## 方法

    ### getDisplayName ()

**定义**

```java
public abstract String getDisplayName ()
```

**说明**

获取当前用户的昵称。

**返回值**

`String` 昵称。
</br>

---
### getEmail ()

**定义**

```java
public abstract String getEmail ()
```

**说明**

返回当前用户设置的邮箱地址.
  

**返回值**

`String` 邮箱地址。
</br>

---
### getPhotoUrl ()

**定义**

```java
public abstract Uri getPhotoUrl ()
```

**说明**

返回当前用户的头像的url .
 

**返回值**

`Uri` 头像的url。
</br>

---
### getProviderData ()

**定义**

```java
public abstract List<? extends UserInfo> getProviderData()
```

**说明**

获取在 Wilddog Auth 系统中用户绑定的所有认证类型的用户信息列表.

**返回值**

`List` 用户绑定的所有认证类型的用户信。
</br>

---

### getUid ()

**定义**

```java
public abstract String getUid ()
```

**说明**

获取在Wilddog Auth 系统中的用户的唯一标识.
   

**返回值**

`String`  用户的唯一标识。
</br>

---
