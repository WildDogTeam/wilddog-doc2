title: UserInfo
---
已知直接子类 WilddogUser 。获取一个用户的标准用户配置信息。可用于身份验证提供者返回的用户配置信息，例如QQ登录或者微信登录。

## 方法


### getDisplayName（）

**定义**

```java
String getDisplayName();
```

**说明**

如果可用，返回用户昵称。  


</br>

--- 
### getEmail（）

**定义**

```java
String getEmail();
```

**说明**

返回对应于指定提供者的用户帐户的电子邮件地址，包含可选。


</br>

--- 
### getPhotoUrl（）

**定义**

```java
Uri getPhotoUrl();
```

**说明**

如果可用，返回用户形象照片。


</br>

--- 
### getProviderId（）

**定义**

```java
String getProviderId();
```

**说明**

返回提供者类型实例的唯一标识符，例如QQ，weixin。


</br>

--- 
### getUid（）

**定义**

```java
String getUid();
```

**说明**

返回一个身份验证提供者指定的用户标识符。例如，如果是qq返回qq的uid，如果是微博，返回微博的openId。  


</br>

--- 