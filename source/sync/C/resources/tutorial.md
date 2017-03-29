
title: 实战教程
---
在网络飞速发展的今天，设备已经遍布各处，它们之间的通信极其重要。设备通信中最重要的是同步和更新的实时性。以物联网为例，传感器采集的数据需要实时同步到用户 APP ，以及控制中心；同时用户的操作和控制指令，也需要实时更新到设备中。

本部分展示了借助 Wilddog C/嵌入式 SDK 实现一个简单的远程加法器的示例。在示例中有两个端（或抽象成设备），即网页端和客户端。在控制台网页上输入两个值，这两个值能够被实时同步到客户端。当客户端收到这两个值后，将这两个值的和计算出来，并同步到网页端。抽象到物联网设备上，网页端可以类比成用户 APP，客户端可以类比成嵌入式设备。用户 APP 发送控制命令给嵌入式设备，设备执行操作后并将结果实时反馈回用户 APP。



## 示例说明

远程加法器示例的最终的效果如下：
![](/images/c_tutorial_a.jpg)

在这种多端交互的应用，即使是在嵌入式中，借助 Wilddog C/嵌入式 SDK，只需要百余行代码即可实现，足见 Wilddog 在实时领域的简单与强大。


## 具体步骤

### 引入 Wilddog Sync C/嵌入式 SDK

从 github 中下载 [Sync C/嵌入式 SDK](https://github.com/WildDogTeam/wilddog-client-c) 。

为简便起见，我们直接使用 SDK 的编译框架。以 Linux 为例，我们在 `examples/linux` 目录下新建一个 C 文件 remote-cal.c ，然后开始编写远程加法器示例。

### 建立 Wilddog Sync 引用

初始化一个 Wilddog Sync 会话，该会话连接到 `DEMO_YOUR_URL` 。

```c
Wilddog_T wilddog = wilddog_initWithUrl((Wilddog_Str_T*)DEMO_YOUR_URL);
```

### 监听输入

监听加数和被加数对应的父节点，一旦加数和被加数被修改时，客户端会收到推送。
注意我们监听的是操作数的父节点，收到的推送如下  '"/":{"sum":0, "augend":0, "addend":0}'。

```c
wilddog_addObserver(wilddog,WD_ET_VALUECHANGE,(onEventFunc)addObserver_callback,(void*)wilddog);
```

网页端的数据结构如下：
![](/images/c_tutorial_b.jpg)

### 获取输入

客户端接收到的数据节点加数 `append`、被加数`augend`和结果`sum`位于同一层级，是通过双向链表组织起来，可以遍历这个链表获取对应的节点.

```c
/* get node pointer according the key value */
STATIC Wilddog_Node_T *node_get(Wilddog_Node_T *p_head,const char* key_name)
{
    Wilddog_Node_T *node = p_head;
    u8 len = 0;
    while(node )
    {
        if( node->p_wn_key )
        {
            /* get the short len*/
            len = strlen((const char*)key_name)>strlen((const char*)node->p_wn_key)\
                    ?strlen((const char*)node->p_wn_key):strlen((const char*)key_name);
            if( !memcmp(key_name,node->p_wn_key,len))
                return node;
        }
        node=node->p_wn_next;
        if(node == p_head)
            return NULL;
    }
    return NULL;
}
```

利用wilddog_node_getValue() 方法获取它们的 value ，如下 ： 

```c
    Wilddog_Node_T *p_augend = node_get(p_node,"augend");
    Wilddog_Node_T *p_addend = node_get(p_node,"append");
    Wilddog_Node_T *p_sum = node_get(p_node,"sum");
    s32 augend = *(s32*)wilddog_node_getValue(p_augend,&len);   
    s32 addend = *(s32*)wilddog_node_getValue(p_addend,&len);
```

### 推送计算结果到服务端
通过 `wilddog_node_setValue()` 方法设置`sum`节点对应的 `value` ，并调用 `wilddog_setValue` 把数据推送到服务端。

```c
s32 sum = augend + addend;
wilddog_node_setValue(p_sum,(u8*)&sum,sizeof(sum));
wilddog_setValue(wilddog,(Wilddog_Node_T*)p_newdata,sumSet_callback,NULL);
```

## 获取示例源码
点此获取完整的[示例源码](https://github.com/WildDogTeam/sync-tutorial-c)。



