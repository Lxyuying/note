# 基础

## 在Idea中隐藏指定文件/文件夹

**步骤①**：打开设置，【Files】→【Settings】。

<img src="../../../../document/springboot/运维实用篇-资料/讲义/img/image-20211122173835517.png" alt="image-20211122173835517" style="zoom:80%;" />

**步骤②**：打开文件类型设置界面后，【Editor】→【File Types】→【Ignored Files and Folders】，忽略文件或文件夹显示。

<img src="../../../../document/springboot/运维实用篇-资料/讲义/img/image-20211122174020028.png" alt="image-20211122174020028" style="zoom: 67%;" />

**步骤③**：添加你要隐藏的文件名称或文件夹名称，可以使用*号通配符，表示任意，设置完毕即可。

## yaml数据读取

​		yaml中保存的单个数据，可以使用Spring中的注解@Value读取单个数据，属性名引用方式：<font color="#ff0000"><b>${一级属性名.二级属性名……}</b></font>

#### 读取全部数据

​		读取单一数据可以解决读取数据的问题，但是如果定义的数据量过大，这么一个一个书写肯定会累死人的，SpringBoot提供了一个对象，能够把所有的数据都封装到这一个对象中，这个对象叫做Environment，使用自动装配注解可以将所有的yaml数据封装到这个对象中

​	数据封装到了Environment对象中，获取属性时，通过Environment的接口操作进行，具体方法是getProperties（String），参数填写属性名即可

# 运维

## 一、SpringBoot程序的打包与运行

### **程序打包**

​		SpringBoot程序是基于Maven创建的，在Maven中提供有打包的指令，叫做package。本操作可以在Idea环境下执行。

```JAVA
mvn package
```

​		打包后会产生一个与工程名类似的jar文件，其名称是由模块名+版本号+.jar组成的。

### **程序运行**

​		程序包打好以后，就可以直接执行了。在程序包所在路径下，执行指令。

```JAVA
java -jar 工程包名.jar
```

​		执行程序打包指令后，程序正常运行，与在Idea下执行程序没有区别。

​		<font color="#ff0000"><b>特别关注</b></font>：如果你的计算机中没有安装java的jdk环境，是无法正确执行上述操作的，因为程序执行使用的是java指令。

​		<font color="#ff0000"><b>特别关注</b></font>：在使用向导创建SpringBoot工程时，pom.xml文件中会有如下配置，这一段配置千万不能删除，否则打包后无法正常执行程序。

```XML
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

### 命令行启动常见问题及解决方案

​		各位小伙伴在DOS环境下启动SpringBoot工程时，可能会遇到端口占用的问题。给大家一组命令，不用深入学习，备用吧。

```JAVA
# 查询端口
netstat -ano
# 查询指定端口
netstat -ano |findstr "端口号"
# 根据进程PID查询进程名称
tasklist |findstr "进程PID号"
# 根据PID杀死任务
taskkill /F /PID "进程PID号"
# 根据进程名称杀死任务
taskkill -f -t -im "进程名称"
```

​		关于打包与运行程序其实还有一系列的配置和参数，下面的内容中遇到再说，这里先开个头，知道如何打包和运行程序。



### Linux 快速启动

```
nohup java -jar 工程包名.jar > server.log 2>&1 &
```

```
ps -ef | grep "java -jar"
```

```
kill -9 id
```

```
cat server.log
```



### linux安装Jdk1.8

#### 1.下载jdk8

下载Linux环境下的jdk1.8

[Java Downloads | Oracle](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### 2.源码包解压

 使用xftp将jdk源码包，上传到/usr/local（软件一般安装到这个目录） 

 使用解压命令解压

```perl
[root@localhost local]# tar -zxvf jdk-8u181-linux-x64.tar.gz

```

 删掉jdk源码包

```perl
[root@localhost local]# rm -f jdk-8u181-linux-x64.tar.gz

```

#### 3.配置jdk环境变量

/etc/profile文件的改变会涉及到系统的环境，也就是有关Linux环境变量的东西

所以，我们要将jdk配置到/etc/profile，才可以在任何一个目录访问jdk

```perl
[root@localhost local]# vim /etc/profile

```

按i进入编辑，在profile文件尾部添加如下内容

```bash
export JAVA_HOME=/usr/local/jdk1.8.0_181  #jdk安装目录 export JRE_HOME=${JAVA_HOME}/jre export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin export PATH=$PATH:${JAVA_PATH}

```

Esc --> :wq

保存并退出编辑

通过命令source /etc/profile让profile文件立即生效

```perl
[root@localhost local]# source /etc/profile

```

#### 4.测试是否安装成功

```perl
[root@localhost local]# javac

```

```perl
 [root@localhost local]*# java -version* 

```

### linux安装Mysql

#### **一、上传安装包到Linux** 

1、传路径：/usr/local/

**2、解压缩**

```undefined
tar xvf mysql-8.0.17-linux-glibc2.12-x86_64.tar.xz

```

**3、重命名**

```bash
mv mysql-8.0.17-linux-glibc2.12-x86_64 mysql

```



#### **二、安装配置**

1、修改  vi /etc/my.cnf

```javascript
[client]
port=3306
socket=/var/lib/mysql/mysql.sock 
[mysqld]
port=3306
user=mysql
socket=/var/lib/mysql/mysql.sock
basedir=/usr/local/mysql
datadir=/usr/local/mysql/data        

```

**2、创建mysql组与用户**

```undefined
groupadd mysqluseradd -g mysql mysql

```

**3、初始化mysql**

```groovy
/usr/local/mysql/bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data/ 

```

**4、创建sock文件夹与命令链接**

```bash
mkdir -p /var/lib/mysql ; chown -R mysql:mysql /var/lib/mysqlln -s /usr/local/mysql/bin/mysql /usr/bin

```

**5、启动服务**

```sql
/usr/local/mysql/support-files/mysql.server start

```

 ![img](https://img-blog.csdnimg.cn/20190910183255130.png)

**6、修改初始密码**

```css
mysql -uroot -p

```

 修改密码 ，我这里的新密码是123456

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

```

**7、开启远程访问**

```sql
use mysql;update user set host='%' where user='root';flush privileges; exit;

```

 **8、关闭防火墙**

```bash
systemctl stop firewalld.service            #停止firewall        systemctl disable firewalld.service         #禁止firewall开机启动 

```

9、配置成服务并开机启动

```groovy
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqlchkconfig mysql onchkconfig --add mysql

```

 这样可以使用命令

 service mysql start

 service mysql stop

## 二、配置高级

​	SpringBoot提供了灵活的配置方式，如果你发现你的项目中有个别属性需要重新配置，可以使用临时属性的方式快速修改某些配置。方法也特别简单，在启动的时候添加上对应参数就可以了。

```JAVA
java –jar springboot.jar –-server.port=80

```

​		上面的命令是启动SpringBoot程序包的命令，在命令输入完毕后，空一格，然后输入两个-号。下面按照属性名=属性值的形式添加对应参数就可以了。记得，这里的格式不是yaml中的书写格式，当属性存在多级名称时，中间使用点分隔，和properties文件中的属性格式完全相同。

​		如果你发现要修改的属性不止一个，可以按照上述格式继续写，属性与属性之间使用空格分隔。

```JAVA
java –jar springboot.jar –-server.port=80 --logging.level.root=debug

```

### **属性加载优先级**

https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config

### 开发环境中使用临时属性

Idea界面

打开SpringBoot引导类的运行界面，在里面找到配置项。其中Program arguments对应的位置就是添加临时属性的

我们运行main方法的时候，如果想使用main方法的参数，也就是下面的args参数，就是在上面这个位置添加的参数。

```JAVA
public static void main(String[] args) {
}

```

通过这个args就可以获取到参数

```JAVA
public static void main(String[] args) {
    SpringApplication.run(SSMPApplication.class,args);
}

```

这个args参数传递给了run方法，使用下面的调用方式，这样外部临时属性就无法进入到SpringBoot程序中了。

```JAVA
public static void main(String[] args) {
    SpringApplication.run(SSMPApplication.class);
}

```

或者还可以使用如下格式来玩这个操作，就是将配置不写在配置文件中，直接写成一个字符串数组，传递给程序入口

```JAVA
public static void main(String[] args) {
    String[] arg = new String[1];
    arg[0] = "--server.port=8082";
    SpringApplication.run(SSMPApplication.class, arg);
}


```

### 配置文件分类

- 类路径下配置文件（一直使用的是这个，也就是resources目录中的application.yml文件）
- 类路径下config目录下配置文件
- 程序包所在目录中配置文件
- 程序包所在目录中config目录下配置文件

​		上面4个文件的加载优先顺序为

1. file ：config/application.yml **【最高】**
2. file ：application.yml
3. classpath：config/application.yml
4. classpath：application.yml  **【最低】**



## 三、自定义配置文件

**方式一：使用临时属性设置配置文件名，注意仅仅是名称，不要带扩展名**

<img src="../../../../document/springboot/运维实用篇-资料/讲义/img/image-20211206105548238.png" alt="image-20211206105548238" style="zoom:67%;" />

**方式二：使用临时属性设置配置文件路径，这个是全路径名**

<img src="../../../../document/springboot/运维实用篇-资料/讲义/img/image-20211206105716450.png" alt="image-20211206105716450" style="zoom:67%;" />

​		也可以设置加载多个配置文件

<img src="../../../../document/springboot/运维实用篇-资料/讲义/img/image-20211206105750285.png" alt="image-20211206105750285" style="zoom:67%;" />

​		使用的属性一个是spring.config.name，另一个是spring.config.location，这个一定要区别清楚。



## 四、多环境开发

### yaml单一文件版

多环境开发：就是针对不同的环境设置不同的配置属性。比如你自己开发时，配置你的端口如下：

```yaml
server:
  port: 80

```

设计两组环境，中间使用三个减号分隔开

```yaml
server:
  port: 80
---
server:
  port: 81

```

区分环境呢

```yaml
spring:
	profiles: pro
server:
	port: 80
---
spring:
	profiles: dev
server:
	port: 81

```

设置默认启动

```yaml
spring:
	profiles:
		active: pro		# 启动pro
---
spring:
	profiles: pro
server:
	port: 80
---
spring:
	profiles: dev
server:
	port: 81

```

其中关于环境名称定义上述格式是过时格式，标准格式如下

```yaml
spring:
	config:
    	activate:
        	on-profile: pro

```

### yaml多文件版

​		将所有的配置都放在一个配置文件中，尤其是每一个配置应用场景都不一样，这显然不合理，于是就有了将一个配置文件拆分成多个配置文件的想法。拆分后，每个配置文件中写自己的配置，主配置文件中写清楚用哪一个配置文件就好了。

**主配置文件**

```yaml
spring:
	profiles:
		active: pro		# 启动pro

```

**环境配置文件**

```yaml
server:
	port: 80

```

​		环境配置文件因为每一个都是配置自己的项，所以连名字都不用写里面了。那问题是如何区分这是哪一组配置呢？使用文件名区分。

**application-pro.yaml**

```yaml
server:
	port: 80

```

**application-dev.yaml**

```yaml
server:
	port: 81

```

​		文件的命名规则为：application-环境名.yml。

​		在配置文件中，如果某些配置项所有环境都一样，可以将这些项写入到主配置中，只有哪些有区别的项才写入到环境配置文件中。

- 主配置文件中设置公共配置（全局）

- 环境分类配置文件中常用于设置冲突属性（局部）

  

### properties多文件版

​		SpringBoot最早期提供的配置文件格式是properties格式的，这种格式的多环境配置也了解一下吧。

**主配置文件**

```properties
spring.profiles.active=pro

```

**环境配置文件**

**application-pro.properties**

```properties
server.port=80

```

**application-dev.properties**

```properties
server.port=81

```

​		文件的命名规则为：application-环境名.properties。

​		properties文件多环境配置仅支持多文件格式



### 多环境开发独立配置文件书写技巧

**准备工作**

​		将所有的配置根据功能对配置文件中的信息进行拆分，并制作成独立的配置文件，命名规则如下

- application-devDB.yml
- application-devRedis.yml
- application-devMVC.yml

**使用**

​		使用include属性在激活指定环境的情况下，同时对多个环境进行加载使其生效，多个环境间使用逗号分隔

```yaml
spring:
	profiles:
    	active: dev
        include: devDB,devRedis,devMVC

```

​		比较一下，现在相当于加载dev配置时，再加载对应的3组配置，从结构上就很清晰，用了什么，对应的名称是什么

**注意**

​		当主环境dev与其他环境有相同属性时，主环境属性生效；其他环境中有相同属性时，最后加载的环境属性生效

**改良**

​		但是上面的设置也有一个问题，比如我要切换dev环境为pro时，include也要修改。因为include属性只能使用一次，这就比较麻烦了。SpringBoot从2.4版开始使用group属性替代include属性，降低了配置书写量。简单说就是我先写好，你爱用哪个用哪个。

```yaml
spring:
	profiles:
    	active: dev
        group:
        	"dev": devDB,devRedis,devMVC
      		"pro": proDB,proRedis,proMVC
      		"test": testDB,testRedis,testMVC

```



### 多环境开发控制

​		多环境开发到这里基本上说完了，最后说一个冲突问题。就是maven和SpringBoot同时设置多环境的话怎么搞。

​		要想处理这个冲突问题，你要先理清一个关系，究竟谁在多环境开发中其主导地位。也就是说如果现在都设置了多环境，谁的应该是保留下来的，另一个应该遵从相同的设置。

​		maven是做什么的？项目构建管理的，最终生成代码包的，SpringBoot是干什么的？简化开发的。简化，又不是其主导作用。最终还是要靠maven来管理整个工程，所以SpringBoot应该听maven的。整个确认后下面就好做了。大体思想如下：

- 先在maven环境中设置用什么具体的环境
- 在SpringBoot中读取maven设置的环境即可

**maven中设置多环境（使用属性方式区分环境）**

```xml
<profiles>
    <profile>
        <id>env_dev</id>
        <properties>
            <profile.active>dev</profile.active>
        </properties>
        <activation>
            <activeByDefault>true</activeByDefault>		<!--默认启动环境-->
        </activation>
    </profile>
    <profile>
        <id>env_pro</id>
        <properties>
            <profile.active>pro</profile.active>
        </properties>
    </profile>
</profiles>

```

**SpringBoot中读取maven设置值**

```yaml
spring:
	profiles:
    	active: @profile.active@

```

​		上面的@属性名@就是读取maven中配置的属性值的语法格式。

**总结**

1. 当Maven与SpringBoot同时对多环境进行控制时，以Mavn为主，SpringBoot使用@..@占位符读取Maven对应的配置属性值
2. 基于SpringBoot读取Maven配置属性的前提下，如果在Idea下测试工程时pom.xml每次更新需要手动compile方可生效



## 五、日志

### 代码中使用日志工具记录日志

​		日志的使用格式非常固定，直接上操作步骤：

**步骤①**：添加日志记录操作

```JAVA
@RestController
@RequestMapping("/books")
public class BookController extends BaseClass{
    private static final Logger log = LoggerFactory.getLogger(BookController.class);
    @GetMapping
    public String getById(){
        log.debug("debug...");
        log.info("info...");
        log.warn("warn...");
        log.error("error...");
        return "springboot is running...2";
    }
}

```

​		上述代码中log对象就是用来记录日志的对象，下面的log.debug，log.info这些操作就是写日志的API了。

**步骤②**：设置日志输出级别

​		日志设置好以后可以根据设置选择哪些参与记录。这里是根据日志的级别来设置的。日志的级别分为6种，分别是：

- TRACE：运行堆栈信息，使用率低
- DEBUG：程序员调试代码使用
- INFO：记录运维过程数据
- WARN：记录运维过程报警数据
- ERROR：记录错误堆栈信息
- FATAL：灾难信息，合并计入ERROR

​		一般情况下，开发时候使用DEBUG，上线后使用INFO，运维信息记录使用WARN即可。下面就设置一下日志级别：

```yaml
# 开启debug模式，输出调试信息，常用于检查系统运行状况
debug: true

```

​		这么设置太简单粗暴了，日志系统通常都提供了细粒度的控制

```yaml
# 开启debug模式，输出调试信息，常用于检查系统运行状况
debug: true

# 设置日志级别，root表示根节点，即整体应用日志级别
logging:
	level:
    	root: debug

```

​		还可以再设置更细粒度的控制

**步骤③**：设置日志组，控制指定包对应的日志输出级别，也可以直接控制指定包对应的日志输出级别

```yaml
logging:
	# 设置日志组
    group:
    	# 自定义组名，设置当前组中所包含的包
        ebank: com.itheima.controller
    level:
    	root: warn
        # 为对应组设置日志级别
        ebank: debug
    	# 为对包设置日志级别
        com.itheima.controller: debug

```

​		说白了就是总体设置一下，每个包设置一下，如果感觉设置的麻烦，就先把包分个组，对组设置，没了，就这些。

**总结**

1. 日志用于记录开发调试与运维过程消息
2. 日志的级别共6种，通常使用4种即可，分别是DEBUG，INFO,WARN,ERROR
3. 可以通过日志组或代码包的形式进行日志显示级别的控制

### 优化日志对象创建代码

​		写代码的时候每个类都要写创建日志记录对象，这个可以优化一下，使用前面用过的lombok技术给我们提供的工具类即可。

```JAVA
@RestController
@RequestMapping("/books")
public class BookController extends BaseClass{
    private static final Logger log = LoggerFactory.getLogger(BookController.class);	//这一句可以不写了
}

```

​		导入lombok后使用注解搞定，日志对象名为log

```JAVA
@Slf4j		//这个注解替代了下面那一行
@RestController
@RequestMapping("/books")
public class BookController extends BaseClass{
    private static final Logger log = LoggerFactory.getLogger(BookController.class);	//这一句可以不写了
}

```

### 日志输出格式控制

​		日志已经能够记录了，但是目前记录的格式是SpringBoot给我们提供的，如果想自定义控制就需要自己设置了。先分析一下当前日志的记录格式。

![image-20211206123431222](SpringBoot.assets/image-20211206123431222.png)

​		对于单条日志信息来说，日期，触发位置，记录信息是最核心的信息。级别用于做筛选过滤，PID与线程名用于做精准分析。了解这些信息后就可以DIY日志格式了。

```yaml
logging:
	pattern:
    	console: "%d %clr(%p) --- [%16t] %clr(%-40.40c){cyan} : %m %n"

```

### 日志文件

​		日志信息显示，记录已经控制住了，下面就要说一下日志的转存了。日志不能仅显示在控制台上，要把日志记录到文件中，方便后期维护查阅。

​		对于日志文件的使用存在各种各样的策略，例如每日记录，分类记录，报警后记录等。这里主要研究日志文件如何记录。

​		记录日志到文件中格式非常简单，设置日志文件名即可。

```YAML
logging:
	file:
    	name: server.log

```

​		虽然使用上述格式可以将日志记录下来了，但是面对线上的复杂情况，一个文件记录肯定是不能够满足运维要求的，通常会每天记录日志文件，同时为了便于维护，还要限制每个日志文件的大小。下面给出日志文件的常用配置方式：

```YAML
logging:
	logback:
    	rollingpolicy:
        	max-file-size: 3KB
            file-name-pattern: server.%d{yyyy-MM-dd}.%i.log

```

​		以上格式是基于logback日志技术设置每日日志文件的设置格式，要求容量到达3KB以后就转存信息到第二个文件中。文件命名规则中的%d标识日期，%i是一个递增变量，用于区分日志文件。