title: Priorities
---

某个节点的优先级信息会被一个名为 `.priority` 的虚拟节点储存。优先级可以通过 REST 请求读取或写入。

## 方法

### 查询优先级信息

##### 示例

例如，下面的请求用来检索 `/users/tom` 节点的优先级信息：

```
curl 'https://samplechat.wilddogio.com/users/tom/.priority.json'

```

### 增加优先级信息

##### 示例

当要同时写入优先级信息和数据信息时，你可以在要写入的JSON中增加 `.priority` 子节点：

```
curl -X PUT -d '{"name": {"first": "Tom"}, ".priority": 1.0}' \
  'https://samplechat.wilddogio.com/users/tom.json'

```

当要同时写入优先级信息和原始类型数据（如字符串）时，你可以增加一个 `.priority` 子节点，并将原始类型数据放在 `.value` 子节点中：

```
curl -X PUT -d '{".value": "Tom", ".priority": 1.0}' \
  'https://samplechat.wilddogio.com/users/tom/name/first.json'

```

这个示例写入的值是Tom，优先级是1.0。优先级可以放在JSON结构的任意深度。
