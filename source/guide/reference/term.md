## title: Wilddog 术语

Wilddog 术语是 Wilddog 产品对一些特定概念的称谓。



## 应用相关术语

### AppID

AppID 是 Wilddog 应用的唯一标识，在你创建 Wilddog 应用时设置。



## Wilddog Sync 相关术语



### 节点

Wilddog Sync 中的数据以 [JSON](http://json.org/json-zh.html) 格式存储。它是 [键值对 (Key-Value)]()  的集合，其中每一个键值对 (Key-Value)  都称之为节点。一个节点包含 [key]() 和 [value]() 。

### 键值对 (key - value)

键值对 (key-value) 是一个常用的数据结构概念，通常又称为字典 (Dictionary) 或映射 (Map) 。每个存放到该数据结构中的值 (value) 都对应一个全局唯一的键 (key)。该数据结构的特征是查询效率高。 

### key

key 是节点的名称，它能唯一标识节点。

### value

value 是 key 对应的值。它可以为 `String`、`Number` 和 `Boolean` 等类型的数据，也可以为一个节点。

### 子节点

某个节点下的所有节点，统称为该节点的子节点。



### 路径 (path)

路径用于标识数据在 Wilddog Sync 中存储的位置，你可以根据路径访问指定的数据。



### 超级密钥

每个 Wilddog 应用都有自己的超级密钥，它是 Wilddog 应用的最高权限凭证。你可以使用它获取最高的数据读写权限和生成 [CustomToken](/guide/auth/core/concept.html#身份认证令牌)。

超级密钥的操作方法，请参考 [控制面板—超级密钥](/console/administer.html#超级密钥)。