title: 如何实现自增字段 ？
tag: 实时数据同步
---
要实现类似SQL中自增的字段，可以使用 transaction API。


```
 // 先使用transaction()方法把counter计数器加1，transaction可以解决多端并发+1问题。
 ref.child('counter').transaction(function(currentValue) {     var newValue = (currentValue||0) + 1;     return newValue;
 }, function(err, committed, ss) {     if( err ) {
        setError(err);
     }     else if( committed ) {        // 如果counter加1成功，那么写入数据。
        var id = ss.val();  // 这里可以拿到自增后的id
        addRecord(id); 
     }
 });
```

`transaction()` 方法接受2个回调函数作为参数。第一个函数将会获取到当前的值，`return` 的是即将被写入的值。这里我们对 counter 进行+1操作。第二个回调函数中的committed为true时，代表这个 transaction已经成功，此时我们 push 一条新的记录。

`transaction()`的原理是，在向云端写入 newValue 的时候，会判断云端的数据仍然是旧的currentValue。如果云端数据已被其他客户端修改掉了，那么这次请求就会失败并重试。重试的过程是，重新从云端获取数据的值，记为currentValue，重新计算新值（+1），重新向云端写入。这个过程一直重复直至写入成功。

关于`transaction()`的文档，请参考 [事务处理](https://docs.wilddog.com/guide/sync/web/save-data.html#事务处理)。
