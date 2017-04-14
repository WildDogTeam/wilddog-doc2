title: UserProfileChangeRequest.Builder
---
用来更新用户信息的请求构建器

## 方法

### setDisplayName (displayName)

**定义**

```java
public UserProfileChangeRequest.Builder setDisplayName (String displayName)
```

**说明**

设置要修改的昵称信息 

**参数**

参数名 | 描述
--- | ---
displayName |用户昵称。

**返回值**

UserProfileChangeRequest.Builder 对象。

</br>

---

### setPhotoUri (photoUri)

**定义**

```java
public UserProfileChangeRequest.Builder setPhotoUri (Uri photoUri)
```

**说明**

设置要修改的头像URL

**参数**

参数名 | 描述
--- | ---
photoUri |用户头像url。

**返回值**

UserProfileChangeRequest.Builder 对象。
</br>

---  
### build ()

**定义**

```java
public UserProfileChangeRequest build ()
```

**说明**

构造一个UserProfileChangeRequest对象。

**返回值**

UserProfileChangeRequest 对象。

</br>

---  