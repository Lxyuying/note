# 一、快速入门

## 1、 Mybatis+MP实现查询User 

### 相关依赖

```xml
<dependencies>
<!-- mybatis-plus插件依赖 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>3.1.1</version>
</dependency>
<!-- MySql -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.47</version>
    </dependency>
    <!-- 连接池 -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.0.11</version>
    </dependency>
    <!--简化bean代码的工具包-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
        <version>1.18.4</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.6.4</version>
    </dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```



### 1.1  UserMapper继承BaseMapper 

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

public interface UserMapper extends BaseMapper<User> {
    List<User> findAll();
}
```

### 1.2  使用MP中的MybatisSqlSessionFactoryBuilder进程构建 

```java
SqlSession sqlSession;

@Before
public void before() throws Exception{
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory build = new MybatisSqlSessionFactoryBuilder().build(resourceAsStream);
    sqlSession = build.openSession();
}

@Test
public void test() {
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
    List<User> users = userMapper.selectList(null);
    for (User user : users) {
        System.out.println(user);
    }
}
```



### 1.3  在User对象中添加@TableName，指定数据库表名 (默认表名为类名)

```java
@TableName("tb_user")
public class User {
    private Long id;
    private String userName;
    private String password;
    private String name;
    private Integer age;
    private String email;
}

```





## 2、 Spring + Mybatis + MP  

### 相关依赖

```xml
<properties>
    <spring.version>5.1.6.RELEASE</spring.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>${spring.version}</version>
    </dependency>
</dependencies>
```

### 1、 编写applicationContext.xml 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    <context:property-placeholder location="classpath:*.properties"/>
    <!-- 定义数据源 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
          destroy-method="close">
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="driverClassName" value="${jdbc.driver}"/><property name="maxActive" value="10"/>
        <property name="minIdle" value="5"/>
    </bean>
    <!--这里使用MP提供的sqlSessionFactory，完成了Spring与MP的整合-->
    <bean id="sqlSessionFactory"
          class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--扫描mapper接口，使用的依然是Mybatis原生的扫描器-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="cn.ouyuming.mp.simple.mapper"/>
    </bean>
</beans>

```

### 2、 编写jdbc.properties 

```xml
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mp?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true&useSSL=false
jdbc.username=root
jdbc.password=lxy1713468473
```

### 3、编写User对象以及UserMapper接口 

```java
package cn.ouyuming.mp.simple.mapper;

import cn.ouyuming.mp.simple.pojo.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;


public interface UserMapper extends BaseMapper<User> {
}
```

```java
package cn.ouyuming.mp.simple.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("tb_user")
public class User {
    private Long id;
    private String userName;
    private String password;
    private String name;
    private Integer age;
    private String email;
}
```

### 4、 编写测试用例 

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class TestMybatis {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void test() {
        List<User> users = this.userMapper.selectList(null);
        for (User user : users) {
            System.out.println(user);
        }
    }

}
```

