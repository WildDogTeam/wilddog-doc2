title:  WilddogApp
---
存储相关配置信息的管理类，用于获取特定的WilddogApp。

## 方法

### getApplicationContext()
**定义**

```java
Context getApplicationContext ()
```

**说明**

Android Context 实例，获取当前WilddogApp初始化的Context实例对象。

**返回值**

Android Context 实例。
</br>

--- 
### getInstance( name)
**定义**

```java
static WilddogApp getInstance (String name)
```

**说明**

返回一个之前用 name 创建好的 WilddogApp. 如果没有这个 app, 则返回 null.
这个方法是保证线程安全的。

**参数**


参数名 | 描述 |
--- | --- |
name | WilddogApp初始化时设置的name。|

**返回值**

返回WilddogApp 实例。
</br>

--- 
### getInstance()
**定义**

```java
static WilddogApp getInstance ()
```

**说明**

返回当前WilddogApp对象，如果WilddogOptions未初始化，则返回为null。

**返回值**

返回WilddogApp 实例。
</br>

--- 
### getName()
**定义**

```java
String getName ()
```

**说明**

获取这个当前WilddogApp的name，此属性在初始化设置，可用于之后操作不同的应用。

**返回值**

返回当前WilddogApp的别称。
</br>

--- 
### getOptions()
**定义**

```java
WilddogOptions getOptions ()
```

**说明**

当前WilddogApp 的配置信息。可以拿到app的url信息。

**返回值**
WilddogOptions 实例对象。
</br>

--- 
### initializeApp(context,options,name)
**定义**

```java
static WilddogApp initializeApp (Context context, WilddogOptions options, String name)
```

**说明**

用 options 和 name 初始化一个 WilddogApp. 如果配置失败，会抛出异常。
这个方法是保证线程安全的。

**参数**

参数名 | 描述 |
--- | --- |
context | Android Context 实例对象。|
options | 配置好当前应用的WilddogOptions实例对象。|
name | 开发者自己起名的应用名称。这个名字只能包含字母、数组和下划线 |

**返回值**
WilddogApp 实例对象。
</br>

--- 
### initializeApp(context, options)
**定义**

```java
static WilddogApp initializeApp (Context context, WilddogOptions options)
```

**说明**

用有效的 options 配置默认的 WilddogApp。默认的 app 名字是 `[default]`。
如果配置失败，会抛出异常。这个方法是线程安全的。

**参数**

参数名 | 描述 |
--- | --- |
context | Android Context 实例对象。|
options | 配置好当前应用的WilddogOptions实例对象。|

**返回值**
WilddogApp 实例对象。
</br>

--- 