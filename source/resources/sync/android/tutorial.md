title: 实战教程
---
在网络飞速发展的今天，实时通信应用层出不穷，QQ，微信，易信，陌陌已经遍布各大手机平台，它们之间的通信极其重要。设备通信中最重要的是数据同步和更新的实时性。

本部分展示了借助 Wilddog Android Sync SDK 实现一个简单的实时通信文字聊天的示例。在示例中可以支持多人聊天，用户以游客的身份匿名聊天，只要打开实时聊天，默认为您生成一个用户的匿名id，并且将用户id缓存到本地，方便下次进入应用聊天。然后可以发送文字消息到服务器，再由服务器同步数据到各个手机端，实现实时聊天功能。




# 实时聊天

## 示例说明

实时聊天示例的最终的效果如下：
![](/images/android_tutorial_a.jpg)

在这种数据实时同步需求较高的应用中，借助 Wilddog Android Sync SDK，只需要少量的代码即可实现，足见 Wilddog 在实时领域的简单与强大。


## 具体步骤

### 引入Wilddog Android SDk

SDK 的导入方式有两种：

1. 使用gradle

创建新的工程，在应用级别的build.gradle里添加如下代码

```
dependencies {
    compile 'com.wilddog.client:wilddog-auth-android:2.0.0'
}
```

2. 使用maven

```
<dependency>
    <groupId>com.wilddog.client</groupId>
    <artifactId>wilddog-auth-android</artifactId>
    <version>2.0.0</version>
</dependency> 
```


### 建立 Wilddog 引用
初始化一个 Wilddog 对象，该对象连接到 `WILDDOG_URL` 。

```
             Wilddog mWilddogRef = new Wilddog(WILDDOG_URL).child("chat");
```

### 监听输入

监听聊天应用的chat节点，一旦有新的聊天内容被增加进去时，客户端会收到推送。

将推送内容解析，并且更新UI界面。

    mListener = this.mRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String previousChildName) {

                T model = (T) dataSnapshot.getValue(WilddogListAdapter.this.mModelClass);
                String key = dataSnapshot.getKey();

                // Insert into the correct location, based on previousChildName
                if (previousChildName == null) {
                    mModels.add(0, model);
                    mKeys.add(0, key);
                } else {
                    int previousIndex = mKeys.indexOf(previousChildName);
                    int nextIndex = previousIndex + 1;
                    if (nextIndex == mModels.size()) {
                        mModels.add(model);
                        mKeys.add(key);
                    } else {
                        mModels.add(nextIndex, model);
                        mKeys.add(nextIndex, key);
                    }
                }

                notifyDataSetChanged();
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                // One of the mModels changed. Replace it in our list and name mapping
                String key = dataSnapshot.getKey();
                T newModel = (T) dataSnapshot.getValue(WilddogListAdapter.this.mModelClass);
                int index = mKeys.indexOf(key);

                mModels.set(index, newModel);

                notifyDataSetChanged();
            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

                // A model was removed from the list. Remove it from our list and the name mapping
                String key = dataSnapshot.getKey();
                int index = mKeys.indexOf(key);

                mKeys.remove(index);
                mModels.remove(index);

                notifyDataSetChanged();
            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String previousChildName) {

                // A model changed position in the list. Update our list accordingly
                String key = dataSnapshot.getKey();
                T newModel = (T) dataSnapshot.getValue(WilddogListAdapter.this.mModelClass);
                int index = mKeys.indexOf(key);
                mModels.remove(index);
                mKeys.remove(index);
                if (previousChildName == null) {
                    mModels.add(0, newModel);
                    mKeys.add(0, key);
                } else {
                    int previousIndex = mKeys.indexOf(previousChildName);
                    int nextIndex = previousIndex + 1;
                    if (nextIndex == mModels.size()) {
                        mModels.add(newModel);
                        mKeys.add(key);
                    } else {
                        mModels.add(nextIndex, newModel);
                        mKeys.add(nextIndex, key);
                    }
                }
                notifyDataSetChanged();
            }

            @Override
            public void onCancelled(WilddogError wilddogError) {
                Log.e("WilddogListAdapter", "Listen was cancelled, no more updates will occur");
            }

        });


网页端的数据结构如下：
![](/images/android_tutorial_b.jpg)

### 获取输入

首次调用增加监听方法会将数据直接返回，通过`mWilddogRef.limitToLast(50)`方法，可以返回最后50条聊天的内容。

    mChatListAdapter = new ChatListAdapter(mWilddogRef.limitToLast(50), this, R.layout.chat_message, mUsername);



利用`DataSnapshot`对象的`getValue（）`方法获取它们的 value 如下 ： 

     T model = (T) dataSnapshot.getValue(WilddogListAdapter.this.mModelClass);
                String key = dataSnapshot.getKey();


### 将聊天内容发送到服务器
通过 `push()`方法生成一个聊天消息的Id ，然后通过创建Chat对象来封装对应的 `value` ，并调用 `setValue()` 把数据推送到服务端。

    private void sendMessage() {
        EditText inputText = (EditText) findViewById(R.id.messageInput);
        String input = inputText.getText().toString();
        if (!input.equals("")) {
            // Create our 'model', a Chat object
            Chat chat = new Chat(input, mUsername);
            // Create a new, auto-generated child of that chat location, and save our chat data there
            mWilddogRef.push().setValue(chat);
            inputText.setText("");
        }
    }

## 获取源码
本示例只是一个简单的实时聊天示例，展示如何利用 Wilddog Android Sync SDK 构建一个文本聊天的实时应用，你可以动手利用 Wilddog 构建更加有意思的实时应用。
点此查看完整的[示例源码](https://github.com/WildDogTeam/demo-android-chat)。



