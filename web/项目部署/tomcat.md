#  server.xml 

**1、进入到tomcat的bin目录**

使用ls命令，查看自己的目录文件

cd /home/cattsoft/iona/apache-tomcat-7.0.82/bin

（cd 后面接自己的环境目录）

**2、启动tomcat**

运行bin目录下的启动命令脚本

sh startup.sh或者./startup.sh

这样tomcat就启用了

 

**3.查看tomcat进程是否启动**

使用 ps aux | grep tomcat   查看tomcat进程是否启动

 

**4.关闭tomcat**

同样在tomcat的bin目录下，使用sh shutdown.sh可以关闭tomcat

 

**5.重启tomcat**

重启可以理解为先关闭tomcat+再启动tomcat

sh shutdown.sh（关闭）

sh startup.sh或者./startup.sh（启动）