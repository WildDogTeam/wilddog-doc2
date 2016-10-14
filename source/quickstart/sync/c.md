
title: 快速入门
---
你可以通过快速入门了解在嵌入式设备上实时数据同步的用法。

<div class="env">
    <p class="env-title">环境准备</p>
    <ul>
        <li> 支持 C89 的 gcc 环境</li>
    </ul>
</div>

## 1. 创建应用

首先，你需要在控制面板中创建应用。请参考 [控制面板-创建应用](/console/creat.html)。

## 2. 安装 SDK

**1.获取 SDK**

从该网页下载 SDK [点此下载](https://www.wilddog.com/download/)

Wilddog C/嵌入式 SDK 分为 C/RTOS、OpenWRT、Arduino 三种，具体支持的平台如下：

名称 | 支持的平台
---- | ----
 | Linux : 支持POSIX标准的平台，例如 Ubuntu、树莓派。
C / RTOS SDK | Broadcom WICED : 例如 Broadcom 的 BCM943362WCD4、AMPAK 的 WSDB733、WSDB750。
 | 乐鑫 Espressif：例如 ESP8266。
 | 庆科 MICO：例如 EMW3162。
OpenWRT SDK | ar71xx 系列。
Arduino SDK | Arduino Yun。

在大部分平台下 C/嵌入式 SDK 的 API 接口是一致（Arduino 平台除外），因此下面我们以 Linux 平台为例，快速了解 SDK 的基本 API，其他平台可以参考 SDK 中的 docs 目录和 README。

**2.编译 SDK**

Linux 平台下，编译 SDK 后生成的库文件在 SDK 的 lib 目录下。使用时需要在源文件中包含 wilddog.h ，将 SDK 的 include 文件夹拷贝到你的工程中，且在编译选项中增加该 lib 库。

    $ cd wilddog-client-c
    $ make 

**3.编译应用**

把你的源码 C 文件放到 SDK 的`examples/linux`目录下，并在 SDK 根目录执行`make example`，会在 `bin`目录下生成你应用的可执行文件。

    $ cd wilddog-client-c
    $ make example
    $ ls bin
    demo  my_app

## 3. 创建 Wdilddog Sync 引用

```c
Wilddog_T ref = wilddog_initWithUrl("https://<appId>.wilddogio.com/users/Jack");
```

## 4. 写入数据

`wilddog_setValue()` 方法用于向指定节点写入数据。

例如，设置 Jack 为 beauty 描述：
```c
#include "wilddog.h"
void callback(void* arg, Wilddog_Return_T err){
    *(BOOL*)arg = TRUE;
    if(err >= 200 || err < 400){
        wilddog_debug("setValue success!");
    }

    return;
}
int main(void){
    //作为设置是否完成的标志为传入回调函数中.
    BOOL isFinish = FALSE;
    //初始化 Wilddog 引用，需要将 <appId> 修改为你自己的 appId
    Wilddog_T ref = wilddog_initWithUrl((Wilddog_Str_T*)"https://<appId>.wilddogio.com/users/Jack");
    //将Jack节点的值设为"beauty"
    Wilddog_Node_T *node = wilddog_node_createUString(NULL, (Wilddog_Str_T*)"beauty");
    //向云端写入
    wilddog_setValue(ref, node, callback, (void*)&isFinish);
    //设置完毕，释放空间
    wilddog_node_delete(node);
    while(1){
        //和云端同步
        wilddog_trySync();
        if(TRUE == isFinish)//设置完成，退出
            break;
    }
    wilddog_destroy(&ref);
    return 0;
}
```
当收到云端返回或者接收超时时，回调函数 callback 会被触发。

写入的数据如下图：

 <img src="/images/c_quickstart.png" >

## 5. 监听数据 

[wilddog_addObserver()](/api/sync/c/api.html#wilddog-addObserver) 方法用于监听 [节点](/guide/reference/term.html#节点) 的数据。

```c
#include "wilddog.h"
void callback(const Wilddog_Node_T* p_snapshot, void* arg, Wilddog_Return_T err){
    if(p_snapshot){
        wilddog_debug_printnode(p_snapshot);//打印出节点的值
        printf("\n");
    }
    return;
}
int main(){
    //初始化Wilddog引用，需要将<appId>修改为你自己的appId
    Wilddog_T ref = wilddog_initWithUrl((Wilddog_Str_T*)"https://<appId>.wilddogio.com/users/Jack");
    //向云端订阅该节点数据变化
    wilddog_addObserver(ref, WD_ET_VALUECHANGE, callback, NULL);
    while(1){
        wilddog_trySync();
    }
    wilddog_destroy(&ref);
}
```
回调函数中的 `p_snapshot` 会一直和云端保持同步。如果只想监听一次，请使用 [wilddog_getValue()](/api/sync/c/api.html#wilddog-getValue) 方法。

## 5.更多使用
- 了解 Wilddog Sync 数据访问控制，请参考 [规则表达式](/quickstart/sync/rule.html)
- 了解 Wilddog Sync 更多使用方式，请参考 [完整指南](/guide/sync/c/config-and-porting.html) 和 [API 文档](/api/sync/c/api.html)。
