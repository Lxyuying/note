 官方网址 ：http://www.mybatis.org/mybatis-3/ 

# 一、快速入门

## 1、 环境搭建 

### 1.1 导入MyBatis的坐标和其他相关坐标 

```xml
<!--mybatis坐标-->
<dependency>
	<groupId>org.mybatis</groupId>
	<artifactId>mybatis</artifactId>
	<version>3.4.5</version>
</dependency>
<!--mysql驱动坐标-->
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<version>5.1.6</version>
	<scope>runtime</scope>
</dependency>

```

### 1.2  编写UserMapper映射文件 

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="userMapper">
    <select id="findAll" resultType="com.ouyuming.mybatis.bean.User">
        select * from user
    </select>
</mapper>
```

### 1.3  编写MyBatis核心文件 

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="lxy1713468473"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="com/ouyuming/mapper/userMapper.xml"></mapper>
    </mappers>
</configuration>
```

### 1.4   编写测试代码 

```java
//加载核心配置文件
InputStream resourceAsStream = Resources.getResourceAsStream("SqlMapConfig.xml");
//获得sqlSession工厂对象
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
//获得sqlSession对象
SqlSession sqlSession = sqlSessionFactory.openSession();
//执行sql语句
List<User> userList = sqlSession.selectList("userMapper.findAll");
//打印结果
System.out.println(userList);
//释放资源
sqlSession.close();
```



## 2、 映射文件概述 

![1637475480068](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637475480068.png)



## 3、增删改查

### 3.1  MyBatis的插入数据操作 

```xml
<insert id="add" parameterType="com.ouyuming.mybatis.bean.User">
    insert into user values(#{id},#{username},#{password})
</insert>
```

```java
User user = new User(2, "张三", "12356");

InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
SqlSession sqlSession = sqlSessionFactory.openSession();
sqlSession.insert("userMapper.add",user);
sqlSession.commit();
sqlSession.close();
```

### 3.2  MyBatis的修改数据操作 

```xml
<update id="update" parameterType="com.ouyuming.mybatis.bean.User">
    update user set username=#{username},password=#{password} where id = #{id}
</update>
```

```
User user = new User(2, "zhangsan", "12356");

InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
SqlSession sqlSession = sqlSessionFactory.openSession();
sqlSession.update("userMapper.update",user);
sqlSession.commit();
sqlSession.close();
```

### 3.3  MyBatis的删除数据操作 

```
InputStream resourceAsStream = Resources.getResourceAsStream("SqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
SqlSession sqlSession = sqlSessionFactory.openSession();
int delete = sqlSession.delete("userMapper.delete",3);
System.out.println(delete);
sqlSession.commit();
sqlSession.close();
```

```
InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
SqlSession sqlSession = sqlSessionFactory.openSession();
sqlSession.delete("userMapper.delete",2);
sqlSession.commit();
sqlSession.close();
```



## 4、 MyBatis核心配置文件概述 

### 4.1  MyBatis核心配置文件层级关系  

![1637476533884](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637476533884.png)

### 4.2  常用配置解析 

#### 1.environments标签 

![1637476652871](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637476652871.png)

![1637476664082](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637476664082.png)

#### 2.mapper标签  

![1637476691465](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637476691465.png)

#### 3.Properties标签  

![1637476715346](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637476715346.png)

#### 4.typeAliases标签 

![1637476752323](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637476752323.png)

![1637476771416](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637476771416.png)



## 5、  MyBatis相应API  

###  5.1 SqlSession工厂构建器SqlSessionFactoryBuilder 

![1637477134835](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637477134835.png)

### 5.2 SqlSession工厂对象SqlSessionFactory 

![1637477160009](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637477160009.png)

###  5.3 SqlSession会话对象 

![1637477182120](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637477182120.png)



# 二、 .Mybatis的Dao层实现 

## 1、 代理开发方式 

### 1.1  代理开发方式介绍 

![1637478029532](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637478029532.png)

###  1.2 编写UserMapper接口  

![1637478057719](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637478057719.png)

### 1.3  测试代理方式  

```
InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
SqlSession sqlSession = sqlSessionFactory.openSession();

UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
List<User> userList = userMapper.findAll();
System.out.println(userList);
sqlSession.close();
```



# 三、 MyBatis映射文件深入  

## 1、 动态sql语句 

### 1.1  动态 SQL 之 <if>

```xml
<select id="findByCondition" resultType="com.ouyuming.mybatis.bean.User">
        select * from user
        <where>
            <if test="id!=0">
                and id=#{id}
            </if>
            <if test="username!=null">
                and username=#{username}
            </if>
        </where>
</select>
```

### 1.2 动态 SQL 之 <foreach>

```xml
<select id="findByIds" parameterType="list" resultType="user">
	select * from User
	<where>
        <foreach collection="array" open="id in(" close=")" item="id" separator=",">
            #{id}
        </foreach>
	</where>
</select>
```

• collection：代表要遍历的集合元素，注意编写时不要写#{} 

• open：代表语句的开始部分 

• close：代表结束部分 

• item：代表遍历集合的每个元素，生成的变量名 

• sperator：代表分隔符 

### 1.3 SQL片段抽取  

```
<sql id="selectUser">select * from user</sql>
<select id="findAll" resultType="com.ouyuming.mybatis.bean.User">
	<include refid="selectUser"></include>
</select>
```



# 四、 MyBatis核心配置文件深入 

## 1、 typeHandlers标签 

无论是 MyBatis 在预处理语句（PreparedStatement）中设置一个参数时，还是从结果集中取出一个值时， 都会用 类型处理器将获取的值以合适的方式转换成 Java 类型。下表描述了一些默认的类型处理器（截取部分）。  

![1637482091918](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637482091918.png)

 你可以重写类型处理器或创建你自己的类型处理器来处理不支持的或非标准的类型。

具体做法为：实现 org.apache.ibatis.type.TypeHandler 接口， 或继承一个很便利的类 org.apache.ibatis.type.BaseTypeHandler， 然 后可以选择性地将它映射到一个JDBC类型。 

 开发步骤：

① 定义转换类继承类BaseTypeHandler

② 覆盖4个未实现的方法，其中setNonNullParameter为java程序设置数据到数据库的回调方法，getNullableResult 为查询时 mysql的字符串类型转换成 java的Type类型的方法 

③ 在MyBatis核心配置文件中进行注册 ④ 测试转换是否正确 



例如需求：一个Java中的Date数据类型，我想将之存到数据库的时候存成一 个1970年至今的毫秒数，取出来时转换成java的Date，即java的Date与数据库的bigint毫秒值之间转换。  

```
public class MyDateTypeHandlers extends BaseTypeHandler<Date> {
    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, Date date, JdbcType jdbcType) throws SQLException {
        preparedStatement.setLong(i,date.getTime());
    }

    @Override
    public Date getNullableResult(ResultSet resultSet, String s) throws SQLException {
        return new Date(resultSet.getLong(s));
    }

    @Override
    public Date getNullableResult(ResultSet resultSet, int i) throws SQLException {
        return new Date(resultSet.getLong(i));
    }

    @Override
    public Date getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        return callableStatement.getDate(i);
    }
}
```

```
<typeHandlers>
    <typeHandler handler="com.ouyuming.mybatis.typehandlers.MyDateTypeHandlers">		</typeHandler>
 </typeHandlers>
```



##  2、 plugins标签  

 MyBatis可以使用第三方的插件来对功能进行扩展，分页助手PageHelper是将分页的复杂操作进行封装，使用简单的方式即 可获得分页的相关数据 

开发步骤： 

① 导入通用PageHelper的坐标 

```xml
<!-- 分页助手 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>3.7.5</version>
</dependency>
<dependency>
    <groupId>com.github.jsqlparser</groupId>
    <artifactId>jsqlparser</artifactId>
    <version>0.9.1</version>
</dependency>
```

② 在mybatis核心配置文件中配置PageHelper插件 

```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageHelper">
    	<!-- 指定方言 -->
    	<property name="dialect" value="mysql"/>
    </plugin>
</plugins>
```

③ 测试分页数据获取 

```java
@Test
public void test() throws Exception{
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();

    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    PageHelper.startPage(1,3);
    List<User> userList = userMapper.findAll();
    for (User user : userList) {
    	System.out.println(user);
    }
    sqlSession.close();
    PageInfo<User> pageInfo = new PageInfo<User>(userList);
    System.out.println("总条数："+pageInfo.getTotal());
    System.out.println("总页数："+pageInfo.getPages());
    System.out.println("当前页："+pageInfo.getPageNum());
    System.out.println("每页显示长度："+pageInfo.getPageSize());
    System.out.println("是否第一页："+pageInfo.isIsFirstPage());
    System.out.println("是否最后一页："+pageInfo.isIsLastPage());
}
```



# 五、 Mybatis多表查询  

## 1、 一对一查询 

### 1.1 配置OrderMapper.xml  

```xml
<mapper namespace="com.ouyuming.mybatis.dao.OrderMapper">
    <resultMap id="orderMap" type="order">
        <!--手动指定字段与实体属性的映射关系
            column: 数据表的字段名称
            property：实体的属性名称
        -->
        <id column="oid" property="id"></id>
        <result column="ordertime" property="time"></result>
        <result column="total" property="total"></result>
<!--        <result column="uid" property="user.id"></result>-->
<!--        <result column="username" property="user.username"></result>-->
<!--        <result column="password" property="user.password"></result>-->
<!--        <result column="birthday" property="user.birthday"></result>-->

        <!--
            property: 当前实体(order)中的属性名称(private User user)
            javaType: 当前实体(order)中的属性的类型(User)
        -->
        <association property="user" javaType="user">
            <id column="uid" property="id"></id>
            <result column="username" property="username"></result>
            <result column="password" property="password"></result>
            <result column="birthday" property="birthday"></result>
        </association>

    </resultMap>
    <select id="findAll" resultMap="orderMap">
        SELECT *,o.id oid FROM `order` o,`user` u WHERE o.uid=u.id
    </select>
</mapper>
```

```xml
<typeAliases>    
    <typeAlias type="com.ouyuming.mybatis.bean.Order" alias="order"></typeAlias>   		<typeAlias type="com.ouyuming.mybatis.bean.User" alias="user"></typeAlias></typeAliases>
```



## 2、 一对多查询 

```xml
<resultMap id="userMap" type="com.ouyuming.mybatis.bean.User">
    <id column="id" property="id"></id>
    <result column="username" property="username"></result>
    <result column="password" property="password"></result>
    <result column="birthday" property="birthday"></result>
    <collection property="orders" ofType="com.ouyuming.mybatis.bean.Order">
        <result column="oid" property="id"></result>
        <result column="odertime" property="time"></result>
        <result column="total" property="total"></result>
    </collection>
</resultMap>

<select id="findUAR" resultMap="userMap">
    SELECT *,o.id oid FROM `order` o,`user` u WHERE o.uid=u.id
</select>
```



## 3、  多对多查询 

```
<resultMap id="userRoleMap" type="com.itheima.domain.User">
    <result column="id" property="id"></result>
    <result column="username" property="username"></result>
    <result column="password" property="password"></result>
    <result column="birthday" property="birthday"></result>
    <collection property="roleList" ofType="com.itheima.domain.Role">
        <result column="rid" property="id"></result>
        <result column="rolename" property="rolename"></result>
    </collection>
</resultMap>
<select id="findAllUserAndRole" resultMap="userRoleMap">
    select u.*,r.*,r.id rid from user u left join user_role ur on 
    u.id=ur.user_id
    inner join role r on ur.role_id=r.id
</select>
```



# 六、 MyBatis的注解开发  

## 1、  MyBatis的常用注解 

@Insert：实现新增 

@Update：实现更新 

@Delete：实现删除 

@Select：实现查询 

@Result：实现结果集封装 

@Results：可以与

@Result 一起使用，封装多个结果集 

@One：实现一对一结果集封装 

@Many：实现一对多结果集封装  



```xml
    <mappers>
        <package name="com.ouyuming.mybatis.dao"></package>
    </mappers>

<!--    <mappers>-->
<!--        <mapper class="com.ouyuming.mybatis.dao.UserMapper"></mapper>-->
<!--    </mappers>-->

```



## 2、简单增删改查

```java
@Select("select * from user where id=#{id}")
User findById(int id);
```

```java
private UserMapper userMapper;

@Before
public void testUser() throws Exception{
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession(true);

    this.userMapper = sqlSession.getMapper(UserMapper.class);
}

@Test
public void test() throws Exception {
    User user = userMapper.findById(1);
    System.out.println(user);
}
```



## 3、 MyBatis的注解实现复杂映射开发 

![1637574100791](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637574100791.png)

![1637574110262](C:\Users\17134\AppData\Roaming\Typora\typora-user-images\1637574110262.png)

### 3.1 一对一

```java
    @Select("select * from `order`")
    @Results({
            @Result(id = true,property = "id",column = "id"),
            @Result(property = "ordertime",column = "odertime"),
            @Result(property = "total",column = "total"),
            @Result(property = "user",column = "uid",
                    javaType = User.class,
                    one = @One(
                            select = "com.ouyuming.mybatis.dao.UserMapper.findById"
                    ))

    })
    List<Order> findAll();
```

### 3.2 一对多

```java
@Select("select * from user")
@Results({
    @Result(id = true,property = "id",column = "id"),
    @Result(property = "username",column = "username"),
    @Result(property = "password",column = "password"),
    @Result(property = "birthday",column = "birthday"),
    @Result(property = "orderList",column = "id",
        javaType = List.class,
        many = @Many(select = 
        "com.itheima.mapper.OrderMapper.findByUid"))
})
List<User> findAllUserAndOrder();
```

```java
public interface OrderMapper {
    @Select("select * from orders 
    where uid=#{uid}")
    List<Order> findByUid(int uid);
}
```

### 3.2 多对多

```java
public interface UserMapper {
@Select("select * from user")
@Results({
    @Result(id = true,property = "id",column = "id"),
    @Result(property = "username",column = "username"),
    @Result(property = "password",column = "password"),
    @Result(property = "birthday",column = "birthday"),
    @Result(property = "roleList",column = "id",
        javaType = List.class,
        many = @Many(select = 
                     
        "com.itheima.mapper.RoleMapper.findByUid"))
})
List<User> findAllUserAndRole();}
```

```java
public interface RoleMapper {
    @Select("select * from role 
    r,user_role ur where 
    r.id=ur.role_id and 
    ur.user_id=#{uid}")
    List<Role> findByUid(int uid);
}
```



# 七、相关依赖

pom.xml

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.32</version>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.6</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>

<!-- 分页助手 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>3.7.5</version>
</dependency>
<dependency>
    <groupId>com.github.jsqlparser</groupId>
    <artifactId>jsqlparser</artifactId>
    <version>0.9.1</version>
</dependency>
```

jdbc.properties

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mybatis
jdbc.username=root
jdbc.password=lxy1713468473
```

log4j.properties

```properties
### direct log messages to stdout ###
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### direct messages to file mylog.log ###
log4j.appender.file=org.apache.log4j.FileAppender
log4j.appender.file.File=c:/mylog.log
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

### set log levels - for more verbose logging change 'info' to 'debug' ###

log4j.rootLogger=debug, stdout
```

sqlMapConfig.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>



    <properties resource="jdbc.properties"></properties>

    <typeAliases>
        <typeAlias type="com.ouyuming.mybatis.bean.Order" alias="order"></typeAlias>
        <typeAlias type="com.ouyuming.mybatis.bean.User" alias="user"></typeAlias>
    </typeAliases>

    <environments default="developement">
        <environment id="developement">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <package name="com.ouyuming.mybatis.dao"></package>
    </mappers>

<!--    <mappers>-->
<!--        <mapper class="com.ouyuming.mybatis.dao.UserMapper"></mapper>-->
<!--    </mappers>-->

</configuration>
```

orderMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ouyuming.mybatis.dao.OrderMapper">
    <resultMap id="orderMap" type="order">
        <!--手动指定字段与实体属性的映射关系
            column: 数据表的字段名称
            property：实体的属性名称
        -->
        <id column="oid" property="id"></id>
        <result column="odertime" property="time"></result>
        <result column="total" property="total"></result>
<!--        <result column="uid" property="user.id"></result>-->
<!--        <result column="username" property="user.username"></result>-->
<!--        <result column="password" property="user.password"></result>-->
<!--        <result column="birthday" property="user.birthday"></result>-->

        <!--
            property: 当前实体(order)中的属性名称(private User user)
            javaType: 当前实体(order)中的属性的类型(User)
        -->
        <association property="user" javaType="user">
            <id column="uid" property="id"></id>
            <result column="username" property="username"></result>
            <result column="password" property="password"></result>
            <result column="birthday" property="birthday"></result>
        </association>

    </resultMap>
    <select id="findAll" resultMap="orderMap">
        SELECT *,o.id oid FROM `order` o,`user` u WHERE o.uid=u.id
    </select>
</mapper>
```

userMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.ouyuming.mybatis.dao.UserMapper">

    <resultMap id="userMap" type="com.ouyuming.mybatis.bean.User">
        <id column="id" property="id"></id>
        <result column="username" property="username"></result>
        <result column="password" property="password"></result>
        <result column="birthday" property="birthday"></result>
        <collection property="orders" ofType="com.ouyuming.mybatis.bean.Order">
            <result column="oid" property="id"></result>
            <result column="odertime" property="time"></result>
            <result column="total" property="total"></result>
        </collection>
    </resultMap>
    
    <select id="findUAR" resultMap="userMap">
        SELECT *,o.id oid FROM `order` o,`user` u WHERE o.uid=u.id
    </select>
    
    
    <sql id="selectUser">select * from user</sql>
    <select id="findAll" resultType="com.ouyuming.mybatis.bean.User">
        <include refid="selectUser"></include>
    </select>

    <select id="findByCondition" resultType="com.ouyuming.mybatis.bean.User">
        select * from user
        <where>
            <if test="id!=0">
                and id=#{id}
            </if>
            <if test="username!=null">
                and username=#{username}
            </if>
        </where>
    </select>

    <insert id="add" parameterType="com.ouyuming.mybatis.bean.User">
        insert into user values(#{id},#{username},#{password},#{birthday})
    </insert>

    <update id="update" parameterType="com.ouyuming.mybatis.bean.User">
        update user set username=#{username},password=#{password} where id = #{id}
    </update>

    <delete id="delete" parameterType="java.lang.Integer">
        delete from user where id=#{id}
    </delete>

</mapper>
```

