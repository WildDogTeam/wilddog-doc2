title:  Android API 文档
---

## AuthResult

public interface **AuthResult**

结果对象获得的操作会影响认证状态。包含一个方法,在操作完成后返回当前登录用户。

定义

public abstract WilddogUser getUser ()

说明

当前帐号WilddogUser,如果没有则为null(即用户登出)。


----
## WilddogAuth.AuthStateListener

定义

public static interface WilddogAuth.AuthStateListener

说明

当身份验证状态有一个变化的时候调用。使用`addAuthStateListener(AuthStateListener)`和`removeAuthStateListener(AuthStateListener)`来注册或者注销监听


定义

public abstract void onAuthStateChanged (WilddogAuth auth)

说明

 当状态发生变化的时候，这个方法在UI线程中调用：

* 注册监听的时候
* 用户登录的时候
* 用户登出的时候
* 当前用户改变的时候
* 当前用户的token改变的时候

参数

auth 当前 WilddogAuth 对象，用来进行 Auth 相关操作。  

----
             
## WilddogAuthProvider

定义

public interface **WilddogAuthProvider**

说明

提供Auth身份验证类型

----- 

### PROVIDER_ID

定义

public static final String **PROVIDER_ID**

说明

登录方式的 ID。例如: "qq"    
          
-----               
               
## UserInfo

定义

public interface **UserInfo**

说明

已知直接子类 WilddogUser 。获取一个用户的标准用户配置信息。可用于身份验证提供者返回的用户配置信息，例如QQ登录或者微信登录。
 
 
### getDisplayName ()  
定义

public abstract String getDisplayName ()

说明  

如果可用，返回用户昵称。
   
-----      

### getEmail ()

定义   

public abstract String getEmail ()
  
说明  

返回对应于指定提供者的用户帐户的电子邮件地址，包含可选。

-----   
### getPhotoUrl ()  

定义

public abstract Uri getPhotoUrl ()

说明
  
如果可用，返回用户形象照片。

-----    

### getProviderId ()
 
定义
 
public abstract String getProviderId ()
  
说明

返回提供者类型实例的唯一标识符，例如QQ，weixin。

-----  
 
### getUid ()

定义
 
public abstract String getUid ()
  
说明

返回一个身份验证提供者指定的用户标识符。例如，如果是qq返回qq的uid，如果是微博，返回微博的openId。

----                 


### AuthCredential

定义

public abstract class AuthCredential extends Object

说明

已知直接子类
EmailAuthCredential，QQAuthCredential，WeiboAuthCredential，WeiXinAuthCredential代表Wilddog支持的身份认证的方式的认证凭据。


### getProvider ()

public abstract String getProvider \(\)

返回使用的认证方式的类型唯一标识。例如："weixin"，"qq"，"weibo"，"password"

----

## EmailAuthCredential

定义

public class EmailAuthCredential extends AuthCredential

说明

包含邮箱和密码的身份认证方式



### getProvider ()

定义

 public String getProvider ()

说明

返回类型为"password"类型的认证方式唯一标识。

----
## EmailAuthProvider
 
定义
public class **EmailAuthProvider** extends Object

说明

代表了电子邮件和密码身份验证机制，使用这个类来获取EmailAuthCredential。

----


### PROVIDER_ID

定义

public static final String **PROVIDER_ID**

说明

认证方式的唯一字符串标识。例如："password"


### getCredential()
定义

public static AuthCredential getCredential (String email, String password)

说明

返回一个带有用户名和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

----
## QQAuthCredential 

### AuthCredential
定义

public class QQAuthCredential extends AuthCredential

说明

包含qq accessToken的认证凭据


### getProvider()
定义

public String getProvider ()

说明
返回身份认证的唯一标识 "qq"

### getAccessToken()

定义
public String getAccessToken()

说明
返回要上传的token信息

----
## QQAuthProvider

### QQAuthProvider

定义

public class **QQAuthProvider** extends Object

说明

代表了 QQ 身份认证机制，使用这个类来获取 QQAuthCredential。

----

### PROVIDER_ID

定义

public static final String **PROVIDER_ID**


说明
认证方式的唯一字符串标识。值为 "qq"

----

### getCredential

定义
public static AuthCredential getCredential (String token)


返回一个带有用户名和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

---

## WeiboAuthCredential

定义
public class WeiboAuthCredential extends AuthCredential

说明
包含微博 accessToken 和 uid 的认证凭据

---

### getProvider ()

定义

public String getProvider ()

说明

返回身份认证的唯一标识 "weibo"

---

### getAccessToken()

定义

public String getAccessToken()

说明

返回要上传的token信息

---


### getUid()
 
定义

public String  getUid()

说明

返回要上传的微博平台唯一标识uid。

----

## WeiboAuthProvider

定义
public class WeiboAuthProvider extends Object

代表了新浪微博身份认证机制，使用这个类来获取WeiboAuthCredential。



### PROVIDER_ID

public static final String **PROVIDER_ID**

认证方式的唯一字符串标识

常量值: "weibo"

### getCredential ()
public static AuthCredential getCredential (String token,String openId)

返回一个带有用户名和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

----

## WeiXinAuthCredential

public class WeiboAuthCredential extends AuthCredential

包含微信code的认证凭据

### getProvider ()

定义

public String getProvider ()

说明

返回身份认证的唯一标识 "weixin"

定义

public String getCode()

说明

返回微信授权认证返回的code。

----

## WeiXinAuthProvider

public class **WeiXinAuthProvider** extends Object

代表了微信身份认证机制，使用这个类来获取WeiXinAuthCredential。


### PROVIDER_ID

public static final String **PROVIDER_ID**

认证方式的唯一字符串标识

常量值: "weixin"


### getCredential ()
public static AuthCredential getCredential ( String code)

返回一个带有code的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

----

## GetTokenResult

public class GetTokenResult extends Object

返回WilddogIdToken结果对象

### getToken ()

定义

public String getToken ()

说明

Wilddog ID Token. 身份认证成功后返回的Wilddog Id token字符串。用于验证之后操作的身份完整性和安全性。

----

## UserProfileChangeRequest

定义

public class UserProfileChangeRequest extends Object
implements SafeParcelable

说明

用来更新用户信息的请求对象


### getDisplayName ()

定义

String	getDisplayName()

说明

返回要修改的昵称信息

### getPhotoUri ()

定义

Uri	getPhotoUri()

说明

返回要修改的头像URL


### getPhotoUri ()

定义

public String getDisplayName ()

说明

返回要修改的昵称信息

### getPhotoUri ()

定义

public Uri getPhotoUri ()

说明

返回要修改的头像URL

----

## UserProfileChangeRequest.Builder




public static class UserProfileChangeRequest.Builder extends Object

请求构建器


### setDisplayName ()

定义

public UserProfileChangeRequest.Builder setDisplayName (String displayName)

说明

设置要修改的昵称。

### setPhotoUri ()

定义

public UserProfileChangeRequest.Builder setPhotoUri (Uri photoUri)

说明

设置要修改的头像的URL。

----




## WilddogAuth

定义

public abstract class WilddogAuth extends Object

说明

WilddogAuth SDK 入口对象。

首先通过调用 getInstance("appId",context)获取一个WilddogAuth实例对象。
接着，可以使用一下方法进行用户登录认证：
    
*      createUserWithEmailAndPassword(String, String)
*      signInWithEmailAndPassword(String, String)
*      signInWithCredential(AuthCredential)
*      signInAnonymously()
*      signInWithCustomToken(String)

最后，调用 `getCurrentUser()`获取包含用户信息的WilddogUser对象.

### WilddogAuth.AuthStateListener

定义
	
interface	WilddogAuth.AuthStateListener	

说明

    当认证状态发生变化的时候调用
    
    ---
   
 ### addAuthStateListener ()
 
 定义
 
 public void addAuthStateListener (WilddogAuth.AuthStateListener listener)
 
 说明
 
 注册一个认证状态的监听。一个WilddogAuth对象可以设置多个监听对象，也可以为不同的WilddogAuth添加监听对象。
 
   当以下情况出现，会在UI线程中触发回调：
 
   * 在监听对象注册的时候
   * 在用户登录认证的时候
   * 在当前用户登出的时候
   * 在当前用户改变的时候
   * 在当前用户的Wilddog Id token 改变的时候

    推荐的做法总是监听注销事件，因为你可能要提示用户再次登录并且可能限制用户获取信息或者操作.
    
    可以使用`removeAuthStateListener(AuthStateListener)`注销监听.

    ---
    
    ### createUserWithEmailAndPassword ()
    
    定义
    
  public Task<```AuthResult```> createUserWithEmailAndPassword (String email, String password)  
  
  说明
  
  试图用给定的邮箱和密码创建一个用户账号，如果成功，这个用户也将登录成功。
  
  然后可以通过`getCurrentUser()`访问用户信息和进行用户操作.
  
  一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法
  
  **注意:** 你必须在Wilddog控制面板中打开这种登录认证方式。
  
  ---


### fetchProvidersForEmail ()

定义

public Task<```ProviderQueryResult```> fetchProvidersForEmail (String email)

说明

  返回通过绑定的主邮箱获取当前用户的认证方式列表

当你绑定多种认证机制的时候，这个方法将会返回所有的认证方式列表。

---

### getCurrentUser ()

定义

public WilddogUser getCurrentUser ()

说明

如果有用户认证登录返回登录用户，如果没有登录，则返回为空。

可以通过 `getCurrentUser() != null` 来判断当前是否有用户登录



### getInstance ()

定义

public static WilddogAuth getInstance ()

说明

 返回初始化之后，可以用本方法获取当前WilddogAuth实例对象
 
 ---

### getInstance

定义

 public static WilddogAuth getInstance(String appId，Context context)

说明
 
  返回初始化WilddogAuth 实例对象。
  
  ---
 
### removeAuthStateListener ()
 
 定义
 
 public void removeAuthStateListener (WilddogAuth.AuthStateListener listener)
 
 说明
 
 注销认证状态的监听

 ---
 
### sendPasswordResetEmail ()
 
 定义
 
 public Task<Void> sendPasswordResetEmail (String email)
 
 说明
 
  给当前应用中现有的绑定当前email的用户发送密码重置邮件.
  
  
  返回当前操作结果的Task对象
  
  ---

### signInWithCredential ()
  
  定义
  
  public Task<```AuthResult```> signInAnonymously ()
  
  说明
  
   使用匿名方法登录，不需要凭据，可以绑定其他认证方式.
   
   这个操作将在Wilddog创建一个匿名的用户账号，其中通过`getCurrentUser()`获取用户信息包含uid。
   
一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
     
   
  **注意:** 你必须在Wilddog控制面板中打开这种登录认证方式。
  
  ---
    
### signInWithCredential ()
 
 定义

public Task<AuthResult> signInWithCredential (AuthCredential credential)

说明

通过给定的`AuthCredential`对象进行相应的认证登录。其中包含QQ，微信，新浪微博和密码认证登录。

所有`AuthCredential`都会创建一个用户账号。

**注意:** 你必须在Wilddog控制面板中打开相应的登录认证方式。
     

---

### signInWithCustomToken ()

定义

public Task<`AuthResult`> signInWithCustomToken (String token)

说明

通过用户自定义的token进行用户认证。

  从用户服务器首先获取到Wilddog Custom Token,然后登录到Wilddog服务器，进行数据操作，可以通过getCurrentUser获取当前登录认证用户信息。
  
  一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
  
  阅读[自定义Token]()
 
  ---
  
### signInWithEmailAndPassword ()

定义

public Task<AuthResult> signInWithEmailAndPassword (String email, String password)

说明

通过邮箱和密码进行登录认证。

可以通过getCurrentUser获取当前登录认证用户信息。

  一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
  
  **注意:** 你必须在Wilddog控制面板中打开这种登录认证方式。
  
  这个方法和`signInWithCredential（）`的`EmailAuthCredential`登录认证方式是等效的。
  
  ---

### signOut ()

定义

public void signOut ()

说明

登出当前用户，清除登录数据

一旦登出成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.


----

## WilddogUser

定义

public abstract class WilddogUser extends Object
implements UserInfo

说明

获取用户在 Wilddog Auth的个人资料信息。它还有辅助方法进行用户信息的修改和查询，以及管理用户的身份验证方式。

---

### delete ()

定义

  public Task<`Void`> delete ()
  
说明  
  
  从Wilddog Auth 系统中删除用户.
  如果操作成功，用户将从登录系统中登出。
  这个是一个安全敏感操作，需要用户用户最近登录过才能操作成功，如果失败，请先使用`reauthenticate(AuthCredential)`方法.
  
---

  ### getDisplayName ()
  
  定义
  
  public abstract String getDisplayName ()
  
  说明 
  
    获取当前用户的昵称，如果是第三方登录方式，不能修改昵称信息，因此不会第三方登录平台昵称不会受到影响。使用`updateProfile(UserProfileChangeRequest)`方法会更新这个属性。

如果使用`signInWithCredential （ AuthCredential ）`登录的时候包含这个属性，将在登录时候自动创建填充属性。  

---

  ### getEmail ()
  定义
  
  public abstract String getEmail ()
  
  说明
  
  返回当前用户设置的邮箱地址，如果第三方登录中含有这个属性，将不能被修改。
  其他情况下可以通过`updateProfile(UserProfileChangeRequest)`方法会更新这个属性.
  
  这个属性将会在`signInWithCredential(AuthCredential)`的`EmailAuthCredential`或者`createUserWithEmailAndPassword(String, String)`填充这个属性.
  
  ---
  
### getPhotoUrl ()

定义
  
  public abstract Uri getPhotoUrl ()
  
说明

  返回当前用户的头像的url，如果第三方登录中含有这个属性，将不能被修改。
   其他情况下可以通过`updateProfile(UserProfileChangeRequest)`方法会更新这个属性.
   
   如果使用`signInWithCredential （ AuthCredential ）`登录的时候包含这个属性，将在登录时候自动创建填充属性。

  ---

### getProviderData ()  

定义

  abstract List<? extends UserInfo> getProviderData()

说明

获取在 Wilddog Auth 系统中用户绑定的所有认证类型的用户信息列表.


---

### getProviderId ()

定义

abstract String	getProviderId()

说明

返回 PROVIDER_ID，例如 "qq","weixin"，"weibo"，"password"。

---

### getToken ()

定义

public Task<`GetTokenResult`> getToken (boolean forceRefresh)

说明

获取 Wilddog ID Token，使用我们的服务器SDK或按照官方文件安全地验证此token的完整性和有效性。

---

### getUid ()

定义

public abstract String getUid ()

说明

获取在Wilddog Auth 系统中的用户的唯一标识.
   
该标识符是不透明的，不一定对应于用户的电子邮件地址或任何其它属性.

---
  
### isAnonymous ()

定义

public abstract boolean isAnonymous ()

说明

判断当前用户是否是匿名登录，表示当前未绑定其他登录认证方式。

---

### linkWithCredential

定义

public Task<`AuthResult`> linkWithCredential (AuthCredential credential)

说明

将当前用户与给定的登录认证方式绑定。之后支持绑定的所有登录认证方式。

---

### reauthenticate ()

定义

public Task<`Void`> reauthenticate (AuthCredential credential)

说明

用给定的登录认证方式重新认证。

---

### reload ()

定义


Task<`Void`>	reload()

说明

手动刷新当前用户的数据。（连接提供者，显示名称等等）

---

### unlink ()

定义

Task<`AuthResult`>	unlink(String provider)

说明

将给定的登录认证类型从当前用户绑定列表中解除绑定.

---

### updateEmail ()

定义

Task<`Void`>	updateEmail(String email)

说明

更新当前登录认证用户的邮箱信息.

---

### updatePassword ()

定义

Task<`Void`>	updatePassword(String password)

说明
更新当前登录认证用户的密码信息.

---

### updateProfile ()

定义

Task<`Void`>	updateProfile(UserProfileChangeRequest request)

说明

更新当前用户的昵称信息和头像URL

----

