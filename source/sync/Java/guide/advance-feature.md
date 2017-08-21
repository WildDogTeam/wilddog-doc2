
title: 高级特性
---

本篇文档介绍 Wilddog Sync 的高级特性，用于实现更丰富的场景需求。

## 云端时间戳

`WilddogSync.getInstance().getReference().getRepo().getServerTime()` 用于记录当前 [云端时间戳](/sync/java/api/ServerValue.html)。

例如，在`servertimestamp` 节点下记录当前云端时间：

```java
SyncReference currentServerTimeRef=WilddogSync.getInstance().getReference("servertimestamp");
//存入当前云端时间戳
currentServerTimeRef.setValue(ServerValue.TIMESTAMP)
```

## 时钟偏差

 `/.info/serverTimeOffset` 节点用于记录本地时间和云端时间的差值。监听该节点可以获取时钟偏差。

例如，利用时钟偏差可以计算云端时间：

```java
  SyncReference connectedRef = WilddogSync.getInstance().getReference(".info/serverTimeOffset");
        connectedRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                long offset = (long) dataSnapshot.getValue(Long.class);
                long estimatedServerTimeMs=System.currentTimeMillis()+offset;
            }

            @Override
            public void onCancelled(SyncError syncError) {

            }
        });
```