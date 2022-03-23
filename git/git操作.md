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



