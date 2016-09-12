title:  完整 API 文档
---

# AuthResult

public interface **AuthResult**

结果对象获得的操作会影响认证状态。包含一个方法,在操作完成后返回当前登录用户。

## Public Method Summary

WilddogUser  abstract  getUser() 


## Public Methods

public abstract WilddogUser getUser ()

返回值

当前帐号WilddogUser,如果没有则为null(即用户登出)。

----
# WilddogAuth.AuthStateListener

public static interface **WilddogAuth.AuthStateListener**

当身份验证状态有一个变化的时候调用。

使用`addAuthStateListener(AuthStateListener)`和`removeAuthStateListener(AuthStateListener)`来注册或者注销监听
## Public Method Summary
void    abstract      onAuthStateChanged(WilddogAuth auth)

         当状态发生变化的时候，这个方法在UI线程中调用

               * 注册监听的时候
               * 用户登录的时候
               * 用户登出的时候
               * 当前用户改变的时候
               * 当前用户的token改变的时候

## Public Methods

public abstract void onAuthStateChanged (WilddogAuth auth)


 当状态发生变化的时候，这个方法在UI线程中调用：

               * 注册监听的时候
               * 用户登录的时候
               * 用户登出的时候
               * 当前用户改变的时候
               * 当前用户的token改变的时候


### Parameters
auth  当前WilddogAuth 对象，用来进行Auth相关操作。  


----
             
# WilddogAuthProvider

public interface **WilddogAuthProvider**

提供Auth身份验证类型

## Constant Summary

String  PROVIDER_ID	  身份验证类型唯一字符标识。

## Constants

public static final String **PROVIDER_ID**
Unique string identifier for this provider type.

Constant Value: "wilddog"    
          
-----               
               
# UserInfo


public interface **UserInfo**

已知直接子类

WilddogUser

  获取一个用户的标准用户配置信息。可用于身份验证提供者返回的用户配置信息，例如QQ登录或者微信登录。
  
## Public Method Summary

  abstract String getDisplayName()
  
  如果可用，返回用户昵称。
  
  abstract String getEmail()
  
  如果可用，返回指定认证提供类型的电子邮箱地址
  
  abstract Uri	getPhotoUrl()
  
  如果可用，返回用户设置的形象照片的URL
  
  abstract String getProviderId()
  
 返回提供者类型实例的唯一标识符

  abstract String	getUid()
  
  返回一个身份验证提供者指定的用户标识符。
  
## Public Methods

public abstract String getDisplayName ()
  
如果可用，返回用户昵称。
   
   
public abstract String getEmail ()
  
返回对应于指定提供者的用户帐户的电子邮件地址，包含可选。
  
public abstract Uri getPhotoUrl ()
  
如果可用，返回用户形象照片。
  
public abstract String getProviderId ()
  
返回提供者类型实例的唯一标识符，例如QQ，weixin。
  
public abstract String getUid ()
  
返回一个身份验证提供者指定的用户标识符。例如，如果是qq返回qq的uid，如果是微博，返回微博的openId。

----                 


# AuthCredential
public abstract class **AuthCredential** extends Object

已知直接子类
EmailAuthCredential，QQAuthCredential，WeiboAuthCredential，WeiXinAuthCredential

代表Wilddog支持的身份认证的方式的认证凭据。

## Public Method Summary

abstract String    getProvider\(\)

返回使用的认证方式的类型唯一标识。

## Public Methods

public abstract String getProvider \(\)

返回使用的认证方式的类型唯一标识。例如："weixin"，"qq"，"weibo"，"password"

----
# EmailAuthCredential

public class **EmailAuthCredential** extends AuthCredential

包含邮箱和密码的身份认证方式

## Public Method Summary
String	getProvider()

返回使用的认证方式的类型唯一标识。

## public String getProvider ()

返回类型为"password"类型的认证方式唯一标识。

----
# EmailAuthProvider
public class **EmailAuthProvider** extends Object

代表了电子邮件和密码身份验证机制，使用这个类来获取EmailAuthCredential。

## Constant Summary
String	PROVIDER_ID	认证类型的唯一字符串标识。

## Public Method Summary
static AuthCredential	getCredential(String email, String password)

返回一个带有用户名和密码的用户凭证，用于后续的登录或者绑定邮箱认证方式。

## Constants

public static final String **PROVIDER_ID**

认证方式的唯一字符串标识

常量值: "password"


## Public Methods
public static AuthCredential getCredential (String email, String password)

返回一个带有用户名和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

----
# QQAuthCredential 
public class QQAuthCredential extends AuthCredential

包含qq accessToken的认证凭据

## Public Method Summary

String	getProvider()

返回身份认证的唯一标识 "qq"

public String getAccessToken()

返回要上传的token信息

## Public Methods

public String getProvider ()

返回身份认证的唯一标识 "qq"

public String getAccessToken()

返回要上传的token信息

----
# QQAuthProvider

public class **QQAuthProvider** extends Object

代表了QQ身份认证机制，使用这个类来获取QQAuthCredential。

## Constant Summary
String	PROVIDER_ID	认证类型的唯一字符串标识。

## Public Method Summary
static AuthCredential	getCredential(String token)

返回一个带有accessToken的QQ用户凭证，用于后续的登录或者绑定邮箱认证方式。

## Constants

public static final String **PROVIDER_ID**

认证方式的唯一字符串标识

常量值: "qq"


## Public Methods
public static AuthCredential getCredential (String token)

返回一个带有用户名和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

----
# WeiboAuthCredential

public class WeiboAuthCredential extends AuthCredential

包含微博 accessToken和uid的认证凭据

## Public Method Summary

String	getProvider()

返回身份认证的唯一标识 "weibo"

public String getAccessToken()

返回要上传的token信息

 public String getUid()
 
 返回要上传的微博平台唯一标识uid。

## Public Methods

public String getProvider ()

返回身份认证的唯一标识 "weibo"

public String getAccessToken()

返回要上传的token信息

public String getUid()
 
返回要上传的微博平台唯一标识uid。

----
# WeiboAuthProvider

public class **WeiboAuthProvider** extends Object

代表了新浪微博身份认证机制，使用这个类来获取WeiboAuthCredential。

## Constant Summary
String	PROVIDER_ID	认证类型的唯一字符串标识。

## Public Method Summary
 static AuthCredential getCredential( String token,String openId) 

返回一个带有token和openId的用户凭证，用于后续的登录或者绑定邮箱认证方式。

## Constants

public static final String **PROVIDER_ID**

认证方式的唯一字符串标识

常量值: "weibo"


## Public Methods
public static AuthCredential getCredential (String token,String openId)

返回一个带有用户名和密码的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

----

# WeiXinAuthCredential

public class WeiboAuthCredential extends AuthCredential

包含微信code的认证凭据

## Public Method Summary

String	getProvider()

返回身份认证的唯一标识 "weixin"

public String getCode()

返回微信授权认证返回的code。

## Public Methods

public String getProvider ()

返回身份认证的唯一标识 "weixin"

public String getCode()

返回微信授权认证返回的code。

----

# WeiXinAuthProvider

public class **WeiXinAuthProvider** extends Object

代表了微信身份认证机制，使用这个类来获取WeiXinAuthCredential。

## Constant Summary
String	PROVIDER_ID	认证类型的唯一字符串标识。

## Public Method Summary
 static AuthCredential getCredential( String code) 

返回一个带有code的用户凭证，用于后续的登录或者绑定邮箱认证方式。

## Constants

public static final String **PROVIDER_ID**

认证方式的唯一字符串标识

常量值: "weixin"


## Public Methods
public static AuthCredential getCredential ( String code)

返回一个带有code的用户凭证，当调用`signInWithCredential(AuthCredential)`或者`linkWithCredential(AuthCredential)`时候使用

----

# GetTokenResult

public class GetTokenResult extends Object

返回WilddogIdToken结果对象

## Public Method Summary

String	getToken()

Wilddog ID Token.

## Public Methods

public String getToken ()

Wilddog ID Token. 身份认证成功后返回的Wilddog Id token字符串。用于验证之后操作的身份完整性和安全性。

----
# UserProfileChangeRequest



public class UserProfileChangeRequest extends Object
implements SafeParcelable

用来更新用户信息的请求对象


## Nested Class Summary

class	UserProfileChangeRequest.Builder	

构建请求的内部类




## Public Method Summary

String	getDisplayName()

返回要修改的昵称信息

Uri	getPhotoUri()

返回要修改的头像URL


## Public Methods

public String getDisplayName ()

返回要修改的昵称信息

public Uri getPhotoUri ()

返回要修改的头像URL

----

# UserProfileChangeRequest.Builder




public static class UserProfileChangeRequest.Builder extends Object

请求构建器

## Public Constructor Summary

UserProfileChangeRequest.Builder()

## Public Method Summary

UserProfileChangeRequest	build()

构建一个修改用户信息的请求对象

UserProfileChangeRequest.Builder setDisplayName(String displayName)

设置要更新的昵称

UserProfileChangeRequest.Builder setPhotoUri(Uri photoUri)

设置要更新头像的URL.


## Public Constructors

public UserProfileChangeRequest.Builder ()

## Public Methods

public UserProfileChangeRequest build ()

### 返回值

* 一个UserProfileChangeRequest实例



public UserProfileChangeRequest.Builder setDisplayName (String displayName)

设置要修改的昵称。

### 返回值

* 一个可以链式调用的UserProfileChangeRequest.Builder对象



public UserProfileChangeRequest.Builder setPhotoUri (Uri photoUri)

设置要修改的头像的URL。


### 返回值

* 一个可以链式调用的UserProfileChangeRequest.Builder对象

----




# WilddogAuth

public abstract class WilddogAuth extends Object

WilddogAuth SDK入口对象。

首先通过调用 getInstance("appId",context)获取一个WilddogAuth实例对象。
接着，可以使用一下方法进行用户登录认证：
    
*      createUserWithEmailAndPassword(String, String)
*      signInWithEmailAndPassword(String, String)
*      signInWithCredential(AuthCredential)
*      signInAnonymously()
*      signInWithCustomToken(String)

最后，调用 `getCurrentUser()`获取包含用户信息的WilddogUser对象.

## Nested Class Summary
interface	WilddogAuth.AuthStateListener	
    当认证状态发生变化的时候调用
    
 ## Public Method Summary
 
 void	addAuthStateListener(WilddogAuth.AuthStateListener listener)
 
 注册认证状态改变的监听.
 

 
 Task<```AuthResult```>	createUserWithEmailAndPassword(String email, String password)
 
 试图去创建一个新的邮箱密码的用户账号。
 

 
 Task<```ProviderQueryResult```>	fetchProvidersForEmail(String email)
 
 如果存在，则通过邮箱获取所有的认证类型。
 

 
 WilddogUser	getCurrentUser()
 
 
 返回当前认证的用户信息，如果未认证返回null.
 

 
 static WilddogAuth	getInstance()
 
 返回初始化之后，可以用本方法获取WilddogAuth实例对象
 

 
 static WilddogAuth	getInstance(String appId，Context context)
 
 返回初始化WilddogAuth 实例对象。
 
 

 
 void	removeAuthStateListener(WilddogAuth.AuthStateListener listener)
 
 注销曾经认证状态监听对象
 

 
 Task<Void>	sendPasswordResetEmail(String email)
 
 给当前应用中现有的绑定当前email的用户发送密码重置邮件.
 

 Task<```AuthResult```>	signInAnonymously()
 
 使用匿名方法登录，不需要凭据，可以绑定其他认证方式.
 

 
 Task<```AuthResult```>	signInWithCredential(AuthCredential credential)
 
 通过AuthCredential进行用户认证，支持的认证方式：qq，微博，微信，密码
 

 
 Task<```AuthResult```>	signInWithCustomToken(String token)
 
 通过用户自定义的token进行用户认证。
 

 
 Task<```AuthResult```>	signInWithEmailAndPassword(String email, String password)
 
 通过用户邮箱密码的方式进行用户认证
 

 
 void	signOut()
 
 登出当前用户，清除登录数据
 
 ## Public Methods
 
 
 public void addAuthStateListener (WilddogAuth.AuthStateListener listener)
 
 注册一个认证状态的监听。一个WilddogAuth对象可以设置多个监听对象，也可以为不同的WilddogAuth添加监听对象。
 
   当以下情况出现，会在UI线程中触发回调：
 
   * 在监听对象注册的时候
   * 在用户登录认证的时候
   * 在当前用户登出的时候
   * 在当前用户改变的时候
   * 在当前用户的Wilddog Id token 改变的时候

    推荐的做法总是监听注销事件，因为你可能要提示用户再次登录并且可能限制用户获取信息或者操作.
    
    可以使用`removeAuthStateListener(AuthStateListener)`注销监听.
    
 
    
  public Task<```AuthResult```> createUserWithEmailAndPassword (String email, String password)  
  试图用给定的邮箱和密码创建一个用户账号，如果成功，这个用户也将登录成功。
  
  然后可以通过`getCurrentUser()`访问用户信息和进行用户操作.
  
  一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法
  
  **注意:** 你必须在Wilddog控制面板中打开这种登录认证方式。
  
  ### 返回值

返回带有AuthResult的操作结果对象Task



public Task<```ProviderQueryResult```> fetchProvidersForEmail (String email)

  返回通过绑定的主邮箱获取当前用户的认证方式列表

当你绑定多种认证机制的时候，这个方法将会返回所有的认证方式列表。

### Parameters

email

用户返回登录认证方式列表的邮箱地址

### 返回值

返回带有AuthResult的操作结果对象Task


public WilddogUser getCurrentUser ()

如果有用户认证登录返回登录用户，如果没有登录，则返回为空。

可以通过 `getCurrentUser() != null` 来判断当前是否有用户登录

### 返回值
* 当前认证用户或者null




public static WilddogAuth getInstance ()



 返回初始化之后，可以用本方法获取当前WilddogAuth实例对象



 public static WilddogAuth getInstance(String appId，Context context)
 
  返回初始化WilddogAuth 实例对象。
 

 
 public void removeAuthStateListener (WilddogAuth.AuthStateListener listener)
 
 注销认证状态的监听
 
 
 
 public Task<Void> sendPasswordResetEmail (String email)
 
  给当前应用中现有的绑定当前email的用户发送密码重置邮件.
  
  
  返回当前操作结果的Task对象
  

  
  public Task<```AuthResult```> signInAnonymously ()
  
   使用匿名方法登录，不需要凭据，可以绑定其他认证方式.
   
   这个操作将在Wilddog创建一个匿名的用户账号，其中通过`getCurrentUser()`获取用户信息包含uid。
   
一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
   
   
  
   
  **注意:** 你必须在Wilddog控制面板中打开这种登录认证方式。
    
    

public Task<AuthResult> signInWithCredential (AuthCredential credential)

通过给定的`AuthCredential`对象进行相应的认证登录。其中包含QQ，微信，新浪微博和密码认证登录。

所有`AuthCredential`都会创建一个用户账号。

**注意:** 你必须在Wilddog控制面板中打开相应的登录认证方式。
    
 ### 返回值

返回带有AuthResult的操作结果对象Task    


public Task<`AuthResult`> signInWithCustomToken (String token)

通过用户自定义的token进行用户认证。

  从用户服务器首先获取到Wilddog Custom Token,然后登录到Wilddog服务器，进行数据操作，可以通过getCurrentUser获取当前登录认证用户信息。
  
  一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
  
  阅读[自定义Token]()
  
### 返回值

返回带有AuthResult的操作结果对象Task   

public Task<AuthResult> signInWithEmailAndPassword (String email, String password)

通过邮箱和密码进行登录认证。

可以通过getCurrentUser获取当前登录认证用户信息。

  一旦登录成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.
  
  **注意:** 你必须在Wilddog控制面板中打开这种登录认证方式。
  
  这个方法和`signInWithCredential（）`的`EmailAuthCredential`登录认证方式是等效的。
  
### 返回值

返回带有AuthResult的操作结果对象Task


public void signOut ()

登出当前用户，清除登录数据

一旦登出成功，就会回调所有的注册的`WilddogAuth.AuthStateListener`的`onAuthStateChanged(WilddogAuth)`方法.


----

# WilddogUser

public abstract class WilddogUser extends Object
implements UserInfo

获取用户在Wilddog Auth的个人资料信息。它还有辅助方法进行用户信息的修改和查询，以及管理用户的身份验证方式。

## Public Constructor Summary
WilddogUser（）

## Public Method Summary

Task<Void> delete()

从Wilddog Auth 系统中删除用户.



abstract String	getDisplayName()

获取在Wilddog Auth 系统中的用户的昵称.



abstract String	getEmail()

获取在Wilddog Auth 系统中的用户的邮箱.


abstract Uri	getPhotoUrl()

获取在Wilddog Auth 系统中的用户的头像的URL.



abstract List<? extends UserInfo>	getProviderData()

获取在Wilddog Auth 系统中用户绑定的所有认证类型的用户信息列表.



abstract String	getProviderId()

返回PROVIDER_ID，例如 "qq","weixin".



Task<`GetTokenResult`>	getToken(boolean forceRefresh)

获取Wilddog ID Token



abstract String	getUid()

获取在Wilddog Auth 系统中的用户的唯一标识.



abstract boolean	isAnonymous()

判断当前用户是否是匿名登录，表示当前未绑定其他登录认证方式。



Task<`AuthResult`>	linkWithCredential(AuthCredential credential)

将当前用户与给定的登录认证方式绑定。



Task<`Void`>	reauthenticate(AuthCredential credential)

用给定的登录认证方式重新认证。


Task<`Void`>	reload()

手动刷新当前用户的数据。（连接提供者，显示名称等等）



Task<`AuthResult`>	unlink(String provider)

将给定的登录认证类型从当前用户绑定列表中解除绑定.



Task<`Void`>	updateEmail(String email)

更新当前登录认证用户的邮箱信息.



Task<`Void`>	updatePassword(String password)

更新当前登录认证用户的密码信息.



Task<`Void`>	updateProfile(UserProfileChangeRequest request)

更新当前用户的昵称信息和头像URL



## Public Constructors

public WilddogUser ()




## Public Methods


  public Task<`Void`> delete ()
  
  从Wilddog Auth 系统中删除用户.
  如果操作成功，用户将从登录系统中登出。
  这个是一个安全敏感操作，需要用户用户最近登录过才能操作成功，如果失败，请先使用`reauthenticate(AuthCredential)`方法.
  

  
  public abstract String getDisplayName ()
  
    获取当前用户的昵称，如果是第三方登录方式，不能修改昵称信息，因此不会第三方登录平台昵称不会受到影响。使用`updateProfile(UserProfileChangeRequest)`方法会更新这个属性。

如果使用`signInWithCredential （ AuthCredential ）`登录的时候包含这个属性，将在登录时候自动创建填充属性。
  

  
  public abstract String getEmail ()
  
  
  返回当前用户设置的邮箱地址，如果第三方登录中含有这个属性，将不能被修改。
  其他情况下可以通过`updateProfile(UserProfileChangeRequest)`方法会更新这个属性.
  
  这个属性将会在`signInWithCredential(AuthCredential)`的`EmailAuthCredential`或者`createUserWithEmailAndPassword(String, String)`填充这个属性.
  

  
  public abstract Uri getPhotoUrl ()
  
  返回当前用户的头像的url，如果第三方登录中含有这个属性，将不能被修改。
   其他情况下可以通过`updateProfile(UserProfileChangeRequest)`方法会更新这个属性.
   
   如果使用`signInWithCredential （ AuthCredential ）`登录的时候包含这个属性，将在登录时候自动创建填充属性。
   

   
  abstract List<? extends UserInfo>	getProviderData()

获取在Wilddog Auth 系统中用户绑定的所有认证类型的用户信息列表.




abstract String	getProviderId()

返回PROVIDER_ID，例如 "qq","weixin"，"weibo"，"password"。


public Task<`GetTokenResult`> getToken (boolean forceRefresh)

获取Wilddog ID Token，使用我们的服务器SDK或按照官方文件安全地验证此token的完整性和有效性。


### 返回值

返回一个带有`GetTokenResult`信息的Task对象.




public abstract String getUid ()

获取在Wilddog Auth 系统中的用户的唯一标识.
   
该标识符是不透明的，不一定对应于用户的电子邮件地址或任何其它属性.

  


public abstract boolean isAnonymous ()

判断当前用户是否是匿名登录，表示当前未绑定其他登录认证方式。



public Task<`AuthResult`> linkWithCredential (AuthCredential credential)

将当前用户与给定的登录认证方式绑定。之后支持绑定的所有登录认证方式。


public Task<`Void`> reauthenticate (AuthCredential credential)

用给定的登录认证方式重新认证。



Task<`Void`>	reload()

手动刷新当前用户的数据。（连接提供者，显示名称等等）


Task<`AuthResult`>	unlink(String provider)

将给定的登录认证类型从当前用户绑定列表中解除绑定.




Task<`Void`>	updateEmail(String email)

更新当前登录认证用户的邮箱信息.



Task<`Void`>	updatePassword(String password)

更新当前登录认证用户的密码信息.



Task<`Void`>	updateProfile(UserProfileChangeRequest request)

更新当前用户的昵称信息和头像URL

----

