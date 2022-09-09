# 部署前端项目

```txt

sudo su root
apt-get/yum install nginx
```

```
nginx -v
```

```
/usr/sbin/nginx：主程序
/etc/nginx：配置文件所在路径
/usr/share/nginx：静态文件所在路径
/var/log/nginx：日志文件所在路径
```

 修改配置文件/etc/nginx/nginx.conf的部分内容，在http中增加server如下： 

```
http {
    server {
        listen       8080;
        server_name  localhost;

        location / {
            root   /home/simple-website-frontend;
            index  index.html index.htm;
        }

 
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```

```
nginx -t // 检验配置是否正确
nginx -s reload // 重新加载修改的配置
service nginx restart // 重新启动
```

