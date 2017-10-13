title:  WilddogApp
---
`WilddogApp` 是 Wilddog SDK 的核心，它维护着应用的全局上下文数据，不同模块之间需要通过它来进行交互。
同时 `WilddogApp` 也是我们访问 Wilddog SDK 各个功能模块的入口，在使用其他任何 API 接口前需要初始化 `WilddogApp` 。

## 属性

### getName()
##### 定义

```java
String getName()
```

##### 说明

获取调用 `initializeApp( options, name)` 初始化 `WilddogApp` 时定义的 `WilddogApp` 实例名称，此属性为只读属性。
缺省的 `WilddogApp` 实例名称为 "[DEFAULT]"。
在同一项目中可以初始化多个不同的 `WilddogApp` 实例，不同实例间以 name 属性作为区分。


##### 返回值

`String` 类型。当前 `WilddogApp` 实例的名称。
</br>

--- 
### getOptions()

##### 定义

```java
WilddogOptions getOptions()
```

##### 说明

获取初始化 `WilddogApp` 时传入的 `WilddogOptions` 实例。

##### 返回值
[WilddogOptions](/sync/Java/api/WilddogOptions.html) 实例对象。
</br>

--- 

## 方法

### initializeApp(options)
##### 定义

```java
static WilddogApp initializeApp(WilddogOptions options)
```

##### 说明

使用配置信息创建默认名字为 "[default]" 的 `WilddogApp` 实例，并在 `WilddogApp` 类中保存此实例。
可以通过 `getInstance()` 方法获取默认 `WilddogApp` 实例。


##### 参数

参数名 | 说明
--- | ---
options | 配置当前应用的 [WilddogOptions](/sync/Java/api/WilddogOptions.html) 实例对象，必须包含 [WilddogSync](/sync/Java/api/WilddogSync.html) 路径信息（例如：`https://example.wilddogio.com`）。

##### 返回值
`WilddogApp` 实例对象。
</br>

--- 
### initializeApp( options, name)
##### 定义

```java
static WilddogApp initializeApp( WilddogOptions options, String name)
```

##### 说明

使用配置信息创建名字为 name 参数的 `WilddogApp` 实例，并在 `WilddogApp` 类中保存此实例。
可以通过 `getInstance(name)` 方法获取默认 `WilddogApp` 实例，根据 name 获取不同的实例对象。

##### 参数

参数名 | 说明
--- | ---
options | 配置当前应用的 [WilddogOptions](/sync/Java/api/WilddogOptions.html) 实例对象。
name | `WilddogApp` 实例名称，只能包含字母、数字和下划线（例如：wilddog、wilddog_1）。

##### 返回值
`WilddogApp` 实例对象。
</br>

--- 

### getInstance()
##### 定义

```java
static WilddogApp getInstance()
```

##### 说明

获取默认的 `WilddogApp` 实例，即未指定名称的 `WilddogApp` 实例，如果 `WilddogApp` 未初始化，则返回为null。

##### 返回值

`WilddogApp` 实例。
</br>

--- 

### getInstance(name)
##### 定义

```java
static WilddogApp getInstance(String name)
```

##### 说明

获取名称为 name 的 `WilddogApp` 实例。如果没有创建过该实例，则返回 null。

##### 参数


参数名 | 说明
--- | ---
name | `WilddogApp` 实例名称。

##### 返回值

`WilddogApp` 实例。
</br>




    


