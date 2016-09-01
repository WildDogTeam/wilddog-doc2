title:  组织数据
---

节点是 SDK 的一个重要组件，数据的解析和组合全部要通过节点操作来完成。下面我们了解一下节点的数据格式以及一些基本操作，更多细节请参阅 API 文档。
### 节点数据格式
C/RTOS/OpenWRT SDK 和 Arduino SDK 的节点数据格式略有不同，下面分别进行阐述。
#### C / RTOS / OpenWRT 节点数据格式

野狗 SDK 采用树形结构组织，C/RTOS/OpenWRT SDK 使用类 JSON 格式（树型结构），能够和云端数据树互相转化。例如，我们在云端建立一组数据：

![](https://cdn.wilddog.com/z/iot/images/guide_2_1.png)

在 SDK 中，节点的格式为`Wilddog_Node_T`，接收到云端数据后，我们建立的节点树如下，与云端是一一对应的。其中，上下两层次间是父子关系，父节点只指向第一个子节点；同一层次则是兄弟关系，是一个双向链表：

![](https://cdn.wilddog.com/z/iot/images/guide_2_2.png)

节点支持的数据类型包括：字符串、二进制数组、整数、浮点型、布尔型、Object 。

#### Arduino 节点数据格式
Arduino SDK 采用 JSON 字符串形式组织节点数据，上面的节点数据在 Arduino SDK 中的格式为：

	{\"mydevice\":{\"Temperature\":{\"east\":24,\"north\":24,\"south\":24,\"west\":22}}}

Arduino SDK 的节点操作是字符串操作，因此不做赘述，只介绍 C / RTOS / OpenWRT SDK 的节点操作。

### 创建节点

#### 创建叶节点

创建叶节点可以直接调用节点 create 函数族中对应类型的创建函数，例如，我们想要创建一个 key 为 "wilddog"，value 为 UTF-8 字符串 "hello word" 的节点，调用如下：
```c
Wilddog_Node_T* node = wilddog_node_createUString("wilddog", "hello world");
```
#### 创建节点树

树的创建较上面更复杂，现在我们想要创建下面节点树：

	{
		"data" :
		{
			"pm25" : 60,
			"temperature" : -1,
			"humidity" : 0.3,
			"time" : "2016-01-01"
	    }
	}

从上面可以得出，这棵树根节点下面有一个 "data" 子节点，"data" 节点下又有4个叶节点。代码及注释如下：
```c
//创建根节点，该节点为一个对象，key 为 NULL 
Wilddog_Node_T *head = wilddog_node_createObject(NULL);

//创建子节点 "data"，同样为对象
Wilddog_Node_T *data = wilddog_node_createObject("data");

//创建叶节点 "pm25"，value 为 60，是一个数字
Wilddog_Node_T *pm25 = wilddog_node_createNum("pm25", 60);

//创建叶节点 "temperature"，value 为 -1，是一个数字
Wilddog_Node_T *temperature = wilddog_node_createNum("temperature", -1);

//创建叶节点 "humidity"，value 为 0.3，是一个浮点数
Wilddog_Node_T *humidity = wilddog_node_createFloat("humidity", 0.3);

//创建叶节点 "time"，value 为 "2016-01-01"，是一个 UTF-8 字符串
Wilddog_Node_T *time = wilddog_node_createUString("time", "2016-01-01");

//将叶节点插入到 "data" 节点中
wilddog_node_addChild(data, pm25);
wilddog_node_addChild(data, temperature);
wilddog_node_addChild(data, humidity);
wilddog_node_addChild(data, time);

//将 "data" 节点插入根节点中
wilddog_node_addChild(head, data);
```

自此，一颗节点树创建完成。

### 修改节点

节点的 key 和类型创建后无法修改，只能对 value 进行修改，API 为`wilddog_node_setValue()`。

### 删除节点

节点删除 API 为`wilddog_node_delete()`，将该节点以及其下面所有子节点删除。
