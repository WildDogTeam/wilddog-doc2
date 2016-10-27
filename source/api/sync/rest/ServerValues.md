title: Server Values

---

服务端通过使用某些占位符让用户获取服务端相关数据。

## 字段

### .sv

**说明**

服务端数值使用占位符： `.sv`。`.sv`的值就是我们期望的服务端数值类型。例如，当一个用户被创建的时候需要设置一个时间戳，我们应该如下操作：

**示例**

```
curl -X PUT -d '{".sv": "timestamp"}' \
  'https://<appId>.wilddogio.com/rest/saving-data/alanisawesome/createdAt.json'

```


### sv

**说明**

当我们需要获取服务器的当前时间戳时，可以进行如下操作 :

**示例**

```
curl 'https://<appId>.wilddogio.com/.json?sv=timestamp'

```

该操作将会直接返回服务器的当前时间戳，而不包括查询的数据。

服务端数值现在只支持时间戳，请参考[unix时间戳](http://baike.baidu.com/link?url=VQMFk3ej6ORZFtAhKYF5P6ow_p1XqZ5RgzFHNQFJNgc5U_DCT4nH6MVXkIvSmvO5gLP5DrB7ZsrnZc-2cT5bHa)。

