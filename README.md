描述： 可视化网页搭建项目

我现在要做的就是要不让用户下载源码就能用我的项目，所以我可以直接将我的项目部署到服务器上，后端还是要的。

就是基本上用动态渲染，比如你点击创建相当于创建了一个页面，那这个页面肯定会绑定一个schema表单，并且有一个自己的页面唯一标识，然后根据传入得schema信息，动态导入所需的组件，并且动态渲染它

我们的基础组件那么多，肯定需要一个东西来把这些组件都schema化，明确这些组件的可配置参数，和具体参数的值是很重要的，json schema就是一个很好的工具，我们可以根据json schema来描述组件的参数哪些是可以配置的，组件的参数具体应该满足什么样的条件，这样达到规范组件的需求。
这里所用的json schema是草拟版本4

现在发现单个页面并不能满足搭建网站的需求，所以要增加页面功能，登录之后首先要进入页面管理，然后选择页面，点击具体的页面之后再进入页面编辑。

部署在线上的项目有另一个后端，这一个后端监听webhook的push事件，当执行push操作的时候就拉取gitee的代码，然后覆盖掉原来的build。

同步代码脚本
#!/bin/bash
echo ""
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "Start"
#判断宝塔WebHook参数是否存在
if [ ! -n "$1" ];
then
          echo "param参数错误"
          echo "End"
          exit
fi
#git项目路径
gitPath="/www/wwwroot/webhook/public"
#git 网址
gitHttp="https://gitee.com/angus-zc/template-server-build.git"
 	
echo "Web站点路径：$gitPath"
 
#判断项目路径是否存在
if [ -d "$gitPath" ]; then
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                git clone $gitHttp gittemp
                mv gittemp/.git .
				rm -rf gittemp
        fi
        git reset --hard origin/master
        #拉取最新的项目文件
        git pull origin master
        echo "拉取完成"
        #执行npm
        #执行编译
        npm run build
        echo "拉取完成"
        #设置目录权限
        chown -R www:www $gitPath
        echo "End"
        exit
else
        echo "该项目路径不存在"
        echo "End"
        exit
fi

这里记住项目里面千万不要有其他的 .git文件，要不就会直接克隆那个 .git 文件里面的仓库了，就不会拉取自己写的git路径了。

/*DONE*/
后端问题：现在还要做的就只有生成代码那里的装饰器和部署到线上的打包问题了。线上的部署功能看来是不能实现了，因为pm2根本不能操作shell命令，除非手动启动服务器，否则根本不能用git来push项目，所以也就不能发布了。
/*DONE*/
前端问题：前端的话新增一个导入json就可以生成页面的功能，然后我现在的json schema如果校验到错误是不会纠正错误的，下一次就把它改一下，如果校验到错误就撤回这次的修改，回退一下，另外由于导入到页面的json没有经过校验，不能确定是否符合生成页面的规则，所以也要新增页面的json schema的校验。
/*DONE*/
要增加增多的组件进来，光有基础组件不够，还要加另一些直接可以用的组件，然后美化一下页面
现在的页面太难看了，这个就要很多时间做了，暂且放一放。

/*TODO*/
还要对网站进行性能优化，我的网站速度太慢了，现在能做的有g压缩，路由按需导入，后面的再看。
//DOME
打包个鸡毛，直接发送请求到webhook那个服务器，webhook的服务器的数据直接来自于
数据库中，webhook直接用数据库里面的数据就行了。
//TODO
但是这样我的项目就没有用到webhook了，其实也可以把webhook作为Angus的持续集成工具。
//TODO
组件需要动态导入，还需要新的组件注册，可以开发一个cli帮助完成组件注册的逻辑，注册之后
的组件是在npm上面的，在angus里面还要动态拉取组件才行。

首先componentList里面加一条设置，然后编写对应的组件（记住组件要和store建立连接），然后BaseComponent里面把type对应的组件加上去

