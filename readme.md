
# 模块化思想
为什么前端需要有模块化
1、解决全局变量名污染的问题
2、把相同功能的代码放在一个模块(一个js文件中)方便后期维护
3、便于复用

NodeJS中如何体现模块化
1、Node本身是基于CommonJS规范，
参考:http://javascript.ruanyifeng.com/nodejs/module.html#toc0

2、Node作者在设计这门语言的时候，就严格按照CommonJS
的规范，将它的API设计成模块化了，比如它将开启Web服务这
个功能所有代码都放入一个http模块中

3、Node本质来说就是将相同功能的代码放入到一个.js文件中管理


# 常用NodeJS中的模块

模块              作用
http              开启一个Web服务，给浏览器提供服务
url            给浏览器发送请求用，还可以传递参数(GET)
querystring       处理浏览器通过GET/POST发送过来的参数
path              查找文件的路径
fs              在服务器端读取文件用的

上面五大核心模块加上其它一些第三方的模块，就可以完成基本的数据库操作了

# nodeJS核心模块及其操作

# http

使用http模块开启web服务
步骤:
    //1、导入我们需要的核心模块(NodeJS提供的模块我们称之为核心模块)
        var http = require('http');
    
    //2、利用获取到的核心模块的对象，创建一个server对象
        var server = http.createServer();

    //3、利用server对象监听浏览器的请求，并且处理(请求-处理-响应)
    server.on('request',function(req,res){
        res.end("welcome");
    });

    //4、开启web服务开始监听
    server.listen(8080,'127.0.0.1',function(){
        console.log('开启服务器成功');
    });

# url

1、导入url这个核心模块

2、调用url.parse(url字符串,true)，如果是true的话代表把我们
的username=zhangsan&pwd=123 字符串解析成js对象
// 使用url模块获取url中的一些相关信息
const url = require('url')
var testURL = http://127.0.0.1:8899/login?username=zhangsan&pwd=123 
console.log(url.parse(testURL,true))//{username:zhangsan,pwd:123}
# QueryString

作用:
将GET/POST传递过来的参数，进行解析
GET : ?username=zhangsan&pwd=123
POST : username=zhangsan&pwd=123
使用:
    const querystring = require('querystring')
    
    const paramsObj = querystring.parse(键值对的字符串)

# GET&POST

相同点:
都是HTTP协议的方法
都能传递参数给服务器

不同点:
1、传参的方式不一样
GET 放在路径后面 ?开始，后面键值对
POST 放在请求体 键值对的方式

2、传参的限制不一样
GET 2048B
POST 2M

3、GET有缓存，POST没有

4、GET传参不安全，POST相对安全
建议：
如果只是单纯的获取数据，就用GET，因为GET有缓存效率高

如果是要向服务器提交数据，就用POST 

# fs&path

# path

作用：获取路径
path.join(__dirname,'你要读取的文件夹下面的文件名称即可')

__dirname全局属性，代表当前文件所在的文件夹路径

path.join会自动判断文件的路径，并且给他加上`/`

# fs

作用:读取服务器硬盘上面的某一个文件(操作文件)

fs.readFile ： 异步读取服务器硬盘上面的某一个文件

fs:node去读取服务器硬盘中的文件(操作文件)

path:获取文件的路径

上面两个基本上配合起来用

# 自定义模块

CommonJS规范认为，一个.js文件就可以看成一个模块，如果我们想把模块中定义的变量，方法，对象给外面的js使用，就必须使用CommonJS提供module将我们需要给外面用的东西，导出去

注意点
在commonjs中导入模块用 require
在commonjs中在模块中导出 使用module.exports
如果是自定义模块，在导入自定义模块的时候，得把路径写完整
require导入的东西，就是别的文件modulu.exports导出的东西

# Express 框架

基本概念
它是对HTTP封装，用来简化我们网络功能那一块

官网:http://www.expressjs.com.cn/
官方解释:
基于 Node.js 平台，快速、开放、极简的 web 开发框架。

重点
1、如何去接收GET/POST传递过来的参数
2、如何通过Express进行分门别类的处理路由
3、静态资源的处理

# 1.使用
1、Hello World 案例

.步骤:
1、导入包
2、创建一个app
3、请求处理响应
4、开启web服务，开始监听

# 2、获取GET/POST参数
GET参数：登录 http://127.0.0.1:3000/login?username=zhangsan&pwd=123

可以直接在我们的req.query中就可以获取了

POST参数：因为express没有直接提供获取POST参数的方法，需要借助一个第三方包 body-parser
参考:
https://www.npmjs.com/package/body-parser

步骤:
1、npm install body-parser --save
2、导包
3、实现某些方法

最后通过req.body即可以获取到post提交过来的参数

# 路由处理

前端路由:
作用:当触发了某个超链接之后，根据路由的配置，决定
跳转到哪个页面，最终将这个页面呈现出来

后台的路由
作用:就是用来分门别类的出路用户发送过来的请求

    http://127.0.0.1:3000/login
    http://127.0.0.1:3000/register
    
    http://127.0.0.1:3000/getGoodsList
    http://127.0.0.1:3000/getGoodsInfo
    
    jd购物
    男士:(专门创建一个man.js文件来实现男士区域商品的请求)
        http://www.jd.com/man/xz
        http://www.jd.com/man/ld
        http://www.jd.com/man/px
        
    女士:(专门创建一个girl.js文件来实现女士区域商品的请求)
        http://www.jd.com/girl/xs
        http://www.jd.com/girl/bag
        http://www.jd.com/girl/kh

# express中代码实现?

步骤:
1、先要创建一个单独的路由(js文件)，来处理某一类
请求下面的所有用户请求，并且需要导出去
1.1 导入包 express
1.2 创建一个路由对象
const manRouter = express.Router()
1.3 在具体的路由js中处理属于我们该文件的路由
manRouter.get(xxx)
manRouter.post(xxx)
1.4 将上面创建的路由对象导出去，在入口文件中使用

2、在入口文件中，导入我们的路由文件，并且使用就可以了

//导入路由文件
const manRouter = require(path.join(__dirname,"man/manRouter.js"))
//在入口文件中使用
app.use('/man',manRouter)
                ```
                
## Express中静态资源的处理
Express希望对我们后台静态资源处理，达到简单的目的，
    然后只希望我们程序员写一句话就能搞定
    
步骤:
    1、在我们入口文件中设置静态资源的根目录
        注意点:一定要在路由处理之前设置
app.use(express.static(path.join(__dirname,'statics')))
```

2、在我们的页面中，按照我们Express的规则来请求后台
静态资源数据
写link的href,script的src写的时候，除开静态资源根
路径之外，按照他在服务器上面的路径规则写

