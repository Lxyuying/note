# 忽略某个目录或文件不上传

```
touch .gitignore
node_modules

target/         	//忽略这个target目录
angular.json    	//忽略这个angular.json文件
log/*          //忽略log下的所有文件
css/*.css       //忽略css目录下的.css文件
*.css       	//忽略.css类型的文件
```



# 删除文件夹（仅远程仓库）

```
git rm -r --cached target
git commit -m '删除了target'
git push -u origin master
```



# 更换远程仓库

> git remote rm origin
> git remote add origin 你的新远程仓库地址



# 一、 Git 常用命令  

| 命令名称                             | 作用           |
| ------------------------------------ | -------------- |
| git config --global user.name 用户名 | 置用户签名     |
| git config --global user.email 邮箱  | 设置用户签名   |
| git init                             | 初始化本地库   |
| git status                           | 查看本地库状态 |
| git add 文件名                       | 添加到暂存区   |
| git commit -m "日志信息" 文件名      | 提交到本地库   |
| git reflog                           | 查看历史记录   |
| git reset --hard 版本号              | 版本穿梭       |



# 二、 Git 分支操作 

| 命令名称            | 作用                         |
| ------------------- | ---------------------------- |
| git branch 分支名   | 创建分支                     |
| git branch -v       | 查看分支                     |
| git checkout 分支名 | 切换分支                     |
| git merge 分支名    | 把指定的分支合并到当前分支上 |

af3c93d

# 三、 远程仓库操作 

| 命令名称                           | 作用                               |
| ---------------------------------- | ---------------------------------- |
| git remote -v                      | 查看当前所有远程地址别名           |
| git remote add 别名 远程地址       | 起别名                             |
| git push 别名 分支                 | 推送本地分支上的内容到远程仓库     |
| git clone 远程地址                 | 将远程仓库的内容克隆到本地         |
| git pull 远程库地址别名 远程分支名 | git pull 远程库地址别名 远程分支名 |
| git push -u origin 分支名 --force  | 强制提交本地代码到远程             |

