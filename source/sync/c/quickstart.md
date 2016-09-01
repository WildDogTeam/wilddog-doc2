title:  C/嵌入式 快速入门
---

## 环境准备

### 先决条件
- 具备 C 的基础知识。
- 有一个 Wilddog 应用。如果还没有，请去[控制面板](https://www.wilddog.com/dashboard/)创建一个。或者使用我们提供的测试应用 [c_test](https://c_test.wilddogio.com)
- 从该网页下载 SDK： [https://www.wilddog.com/download/](https://www.wilddog.com/download/)

Wilddog C/嵌入式 SDK 分为 C/RTOS、OpenWRT、Arduino 三种，具体支持的平台如下：

名称 | 支持的平台
---- | ----
 | Linux : 支持POSIX标准的平台，例如 Ubuntu、树莓派。
C / RTOS SDK | Broadcom WICED : 例如 Broadcom 的 BCM943362WCD4、AMPAK 的 WSDB733、WSDB750。
 | 乐鑫 Espressif：例如 ESP8266。
 | 庆科 MICO：例如 EMW3162。
OpenWRT SDK | ar71xx 系列。
Arduino SDK | Arduino Yun。

在大部分平台下 C/嵌入式 SDK API 接口一致（Arduino 平台除外），因此下面我们以 Linux 平台为例，快速了解 SDK 的基本 API，其他平台可以参考 SDK 中的 docs 目录和 README。

### 编译 SDK

Linux 平台下，编译 SDK 后生成的库文件在 SDK 的 lib 目录下。使用时需要在源文件中包含 wilddog.h ，将 SDK 的 include 文件夹拷贝到你的工程中，且在编译选项中增加该 lib 库。

    $ cd wilddog-client-c
    $ make 
 

## 入门 Demo 教程
本教程旨在让你在短时间内零基础学会在你的嵌入式设备上使用 Wilddog C/嵌入式 SDK 读写和同步 Wilddog 云端数据。
**第一步：创建 Wdilddog 云端引用**

要读写 Wilddog 云端数据，必须先创建 Wilddog 云端引用：
```c
Wilddog_T ref = wilddog_initWithUrl("https://<appId>.wilddogio.com/");
```
创建引用的时候，需要传入数据的 URL 做为参数，把`<appId>`替换成你应用的 appId 。上面的代码定位到了数据库的根节点。URL 地址也可以包含数据路径，例如：
```c
Wilddog_T ref = wilddog_initWithUrl("https://<appId>.wilddogio.com/users/Jack");
```
上面的代码定位到了数据库的`/users/Jack`节点上。

SDK 提供了许多用于读写数据的方法。例如通过`wilddog_setValue()`、`wilddog_push()`、`wilddog_removeValue()`修改数据； 通过`wilddog_getValue()`读取数据；`wilddog_addObserver()`读取数据并监听该节点数据的变化。

<hr>

**第二步：写入数据**

SDK 提供了一系列节点操作 API 对节点数据进行操作，在这里使用节点 create 函数族将`/users/Jack`节点值设置为字符串"beauty",并通过`wilddog_setValue()`将这个值写入到云端。你可以在 SDK 的`examples/linux`目录下新建一个 C 源文件，将下面代码复制进去,修改 `<appId>` 为你自己的 appId ，并在 SDK 根目录执行`make example`。生成的可执行文件在 SDK 的 bin 目录下。为了简略，下面代码未检查返回值。
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
当收到云端返回或者超时后，回调函数 callback 会被触发。

<hr>

**第三步：读取数据**

读取数据也是通过绑定回调函数来实现的。假设我们按照上面的代码写入了数据，那么可以使用`wilddog_getValue()`来读取`Jack`节点的值。
```c
#include "wilddog.h"
void callback(const Wilddog_Node_T* p_snapshot, void* arg, Wilddog_Return_T err){
    *(BOOL*)arg = TRUE;
    if(p_snapshot){
        wilddog_debug_printnode(p_snapshot);
        printf("\ngetValue success!\n");
    }
    return;
}
int main(void){
    //作为设置是否完成的标志为传入回调函数中.
    BOOL isFinish = FALSE;
    //初始化Wilddog引用，需要将<appId>修改为你自己的appId
    Wilddog_T ref = wilddog_initWithUrl((Wilddog_Str_T*)"https://<appId>.wilddogio.com/users/Jack");
    //从云端读取
    wilddog_getValue(ref, callback, (void*)&isFinish);
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
<hr>

**第四步：同步数据**

同步数据也是通过绑定回调函数来实现的。假设我们按照上面的代码写入了数据，那么就可以使用`widdog_addObserver()`函数来实时同步`/users/Jack`的值。
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
当从云端第一次同步数据，以及数据发生变化时，回调函数 callback 会被触发。每当我们对云端数据进行修改，SDK 就会收到通知。

