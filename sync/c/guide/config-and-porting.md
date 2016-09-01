title:  配置和移植
---
## 配置 SDK

SDK 包含条件编译选项和用户参数，可对 SDK 进行配置(Arduino SDK不支持配置)。

#### 配置条件编译选项

Linux 和 Espressif 平台的编译选项在 make 时指定， WICED 平台的编译选项在 project/wiced/wiced.mk 中，MICO 平台则在工程的配置中。

|APP_SEC_TYPE | 加密方式，目前支持轻量级加密库 tinydtls、ARM 官方加密库 mbedtls 和无加密 nosec；

   PORT_TYPE : 运行的平台，目前支持 Linux 和 Espressif；

Linux 和 Espressif 平台在 make 时指定选项，进行不同的编译，如：

    make APP_SEC_TYPE=nosec PORT_TYPE=linux

在其他平台中，上面的宏在 Makefile 中指定。如 WICED 平台中，Wilddog SDK被嵌入WICED编译框架。因此条件编译选项在 SDK 目录下的`project/wiced/wiced.mk`中，配置项和 Linux 平台中相似，`PORT_TYPE`设置为`wiced`。

#### 配置用户参数

用户参数在SDK 的 include 目录下 wilddog_config.h 中，包含如下参数：

`WILDDOG_LITTLE_ENDIAN` : 目标机字节序，如果为小端则该宏定义的值为1；

`WILDDOG_MACHINE_BITS` : 目标机位数，可为8/16/32/64；

`WILDDOG_PROTO_MAXSIZE` : 应用层协议数据包最大长度，其范围为0~1300；

`WILDDOG_REQ_QUEUE_NUM` : 请求队列的长度；

`WILDDOG_RETRANSMITE_TIME` : 单次请求超时时间，单位为ms，超过该值没有收到服务端回应则触发回调函数,并返回超时。返回码参见`Wilddog_Return_T`；

`WILDDOG_RECEIVE_TIMEOUT` : 接收数据最大等待时间，单位为ms。

<hr>

## 移植 SDK

C/嵌入式 SDK 可以很容易的被移植到各个平台上。本文档以 WICED 平台此为例，说明如何移植 SDK，其他已移植平台可以参考 SDK 的 docs 目录下对应的文档，未移植平台则可以参考下面步骤。

#### 将SDK拷贝到目标位置

首先，将SDK解压，并拷贝到`WICED-SDK-3.1.2\WICED-SDK\apps`中，即SDK位于`WICED-SDK-3.1.2\WICED-SDK\apps\wilddog-client-c\`，注意，由于 WICED 平台不支持带 `-` 符号的文件夹，因此需要将 SDK 目录名字修改，这里修改成`wilddog_client_coap`。

WICED 平台采用 WICED IDE，打开 WICED IDE，能够在工程下的`apps`目录下找到我们的  SDK。

![](https://cdn.wilddog.com/z/iot/images/wiced-wilddog.png)

#### 移植条件编译选项

WICED 平台需要用户为自己的 APP 编写 Makefile，且格式有严格要求，Makefile文件名称的前缀必须与目录名相同，以我们的例子为例，如下图：

![](https://cdn.wilddog.com/z/iot/images/wiced-make.png)

在`project/wiced/wiced.mk`中添加编译选项，并补完 Makefile，详见`wiced.mk`文件。

注意：如果你的平台不支持自定义 Makefile，那么请根据条件编译选项，将你所需的文件拷贝到项目中，避免出现重定义。需要选择拷贝的路径有：

`APP_PROTO_TYPE` : src/networking 目录下，根据编译选项拷贝文件夹以及其中的文件；

`APP_SEC_TYPE` ： src/secure 目录下，根据编译选项拷贝文件夹以及其中的文件，同时，增加全局宏定义 WILDDOG_PORT ，根据选用的加密方式不同值不相同，nosec 时 WILDDOG\_PORT值设为5683,否则设为 5684；

`PORT_TYPE` ： platform 目录下，根据编译选项拷贝文件夹以及其中的文件，如果你的平台不属于`linux`或`wiced`等已支持平台，那么你需要自己实现平台相关的函数接口。

#### 实现平台相关代码

需要实现的平台相关函数接口位于include/wilddog_port.h，如下：
```c
int wilddog_gethostbyname(Wilddog_Address_T* addr,char* host);

int wilddog_openSocket(int* socketId);

int wilddog_closeSocket(int socketId);

int wilddog_send(int socketId,Wilddog_Address_T*,void* tosend,s32 tosendLength);

int wilddog_receive(int socketId,Wilddog_Address_T*,void* toreceive,s32 toreceiveLength, s32 timeout);
```
注意：tinydtls 以及 mbedtls 因为涉及底层，如果需要移植，可能要针对这两个库进行一些调试工作。

