title: 设置读写权限
---

本编文档介绍规则表达式的基础知识，以及使用其控制 Wilddog Sync 数据读写权限。

## 设置节点读写权限

规则表达式采用 JSON 结构，其层级结构应该与 sync 中数据的结构一致。
例如，设置聊天室中用户读写消息的权限：

```json
"rules": {
  "message"{
    // 设置 message1 节点所有数据可读，可写。
    "message1"{    
      ".read" : true,
      ".write" :  true
    }
    // 设置 message2 节点所有数据只读。
    "message2"{
      ".read" : true,
      ".write" : false
    }
  }
}
```

<blockquote class="warning">
  <p><strong>注意：</strong></p>
  应用创建之后，系统默认所有人都能读写。为了你的数据安全，尽快配置规则表达式。
</blockquote>
