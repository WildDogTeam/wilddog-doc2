title: Android Studio Gradle 配置解决方案
---

本文基于以下环境：

- 系统：Ubuntu 15.10
- Android Studio:2.2.3，其他系统的操作类似。


## Android Studio 假死现象
使用 `Android Studio`（以下简称 AS）导入安卓项目时，经常会在 Gradle build 时卡死在 Building gradle project info 界面上。

原因是被导入项目的 Gradle 构建工具版本与当前使用的版本不一致。因为网络原因使得 Android Studio 在后台下载 Gradle 速度较慢，导致 AS 出现假死的现象。

实际上AS一直在后台下载 Gradle 工具，通过 Ubuntu 的终端可以看到下载的情况。
AS 终端日志：

```
Downloading https://services.gradle.org/distributions/gradle-2.12-all.zip
................................................................
................................................................
//下载成功
Unzipping /home/<user>/.gradle/wrapper/dists/gradle-2.12-all/8ywkdai6puj5z81fume4e7njw/gradle-2.12-all.zip 
to /home/<user>/.gradle/wrapper/dists/gradle-2.12-all/8ywkdai6puj5z81fume4e7njw
Set executable permissions for: /home/<user>/.gradle/wrapper/dists/gradle-2.12-all/8ywkdai6puj5z81fume4e7njw/gradle-2.12/bin/gradle
//...

```
## Gradle 版本配置的位置
说明解决方案前先介绍 Android Plugin for Gradle 和 Gradle 构建工具的版本配置位置 ([Gradle 配置构建](https://developer.android.com/studio/build/index.html))。
### Android Plugin for Gradle 的版本配置位置
顶级 `build.gradle` 文件位于项目根目录，用于定义适用于项目中所有模块的构建配置。
在项目的顶级构建文件中，我们配置了 Android Plugin for Gradle 的版本。

```
buildscript {

    /**
     * The repositories {} block configures the repositories Gradle uses to
     * search or download the dependencies. Gradle pre-configures support for remote
     * repositories such as JCenter, Maven Central, and Ivy. You can also use local
     * repositories or define your own remote repositories. The code below defines
     * JCenter as the repository Gradle should use to look for its dependencies.
     */

    repositories {
        jcenter()
    }

    /**
     * The dependencies {} block configures the dependencies Gradle needs to use
     * to build your project. The following line adds Android Plugin for Gradle
     * version 2.2.0 as a classpath dependency.
     */

    dependencies {
        classpath 'com.android.tools.build:gradle:2.2.0'
    }
}
```

Android Plugin for Gradle 版本不同于 Gradle 版本，Gradle Plugin 是 AS 用来构建安卓 App 的一个插件，提供了一些针对 Android 应用的特征。

Gradle 工具是用来自动化执行和管理构建流程，同时也允许你定义灵活的自定义构建配置的高级构建工具（类比Maven/Ant等）。Android Plugin for Gradle 与这个构建工具包协作，共同提供专用于构建和测试 Android 应用的流程和可配置设置([Android 官网介绍](https://developer.android.com/studio/releases/gradle-plugin.html))。

以下为安卓插件版本与 Gradle 版本的对应关系：

|Plugin version	|Required Gradle version|
|-------------|----------|
|1.0.0 - 1.1.3	|2.2.1 - 2.3|
|1.2.0 - 1.3.1	|2.2.1 - 2.9|
|1.5.0	|2.2.1 - 2.13|
|2.0.0 - 2.1.2	|2.10 - 2.13|
|2.1.3+	|2.14.1+|

### Gradle 构建工具版本配置位置

Gradle 构建工具版本则配置在工程项目的`gradle/wrapper/gradle-wrapper.properties`文件中

```
...
distributionUrl = https\://services.gradle.org/distributions/gradle-2.14.1-all.zip
...

```

## 解决假死问题
解决 Gradle 工具下载时，AS 出现假死有两个方案：

- 手动下载 Gradle 构建工具;
- 使用当前可用的 Gradle 构建工具。

### 手动下载 Gradle 构建工具

1.导入工程，卡在Building gradle project info的界面时，强制退出AS。这一步主要是为了生成第四步需要用到的 `t7wfomcrmv8dmyii9c9waem8` 文件夹。

2.查看需要导入的工程目录下的 `gradle/wrapper/gradle-wrapper.properties`文件，查看当前使用的 Gradle 版本。

```
distributionUrl = https\://services.gradle.org/distributions/gradle-2.14.1-all.zip
```

 3.从 [Gradle 下载](http://services.gradle.org/distributions) 下载相应版本的Gradle Distribution。

4.将下载的.zip复制到如下位置：

```
ubuntu：/home/.gradle/wrapper/dists/gradle-2.14.1-all/t7wfomcrmv8dmyii9c9waem8

win7：C:\Users\Administrator\.gradle\wrapper\dists\gradle-2.14.1-all\8bnwg5hd3w55iofp58khbp6yv
```

**注意**：`t7wfomcrmv8dmyii9c9waem8`这个随机数文件夹是第一步导入时AS 自动生成的，每个人有可能不一样

5.重新启动 AS ,导入项目。


### 使用当前可用的 Gradle 构建工具

1.新建一个 AS 项目或者打开一个已有的可以运行的项目。

2.查看**可运行项目**工程目录下的 `gradle/wrapper/gradle-wrapper.properties`文件，查看当前使用的Gradle 版本。

```
distributionUrl = https\://services.gradle.org/distributions/gradle-2.4-all.zip
```

3.复制distributionUrl这一整行的内容：
```
distributionUrl=https\://services.gradle.org/distributions/gradle-2.4-all.zip
```

4.将复制内容粘贴到**导入工程**`gradle/wrapper/gradle-wrapper.properties`文件的相应位置，替换原有的 `distributionUrl`。

5.打开**可运行项目**的顶级构建文件，查看当前插件版本

```
    dependencies {
        classpath 'com.android.tools.build:gradle:1.3.1'
    }
```

6.修改**导入工程**的顶级构建文件中的插件版本。

7.重新使用 AS 导入工程。

## 总结

第一种解决方案同样需要下载 Gradle ，手动下载的速度依据网络情况不同下载时间也不一样。
例如gradle-2.14.1-all.zip的压缩包大小约为 60 MB，下载时间大概 5 分钟。

第二种解决方案操作相对繁琐，但是不需要下载 Gradle 工具。但是需要注意 Plugin 的版本和 Gradle 构建工具版本的对应情况。

不同版本 Gradle 构建工具的方法有不一致的地方，为了避免出现项目构建失败或者引起其他问题，因此比较推荐第一种解决方案。

如果有 VPN ，直接导入工程，然后等待下载完成，下载时间根据网络情况4-10分钟不等。