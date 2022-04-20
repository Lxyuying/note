# 一、 SpringBoot的快速上手

https://start.spring.io

https://start.aliyun.com

```java
// Restful风格
@RestController
@RequestMapping("/quick")
public class QuickController {
    @GetMapping
    public String quickStart() {
        System.out.println("Hello SpringBoot");
        return "Hello SpringBoot";
    }
}
```

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.1</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

# 二、yaml

## 1、 yaml语法规则

### （1） 字面值表示方式 

```yml
boolean: TRUE #TRUE,true,True,FALSE,false，False均可
float: 3.14 #6.8523015e+5 #支持科学计数法
int: 123 #0b1010_0111_0100_1010_1110 #支持二进制、八进制、十六进制
null: ~ #使用~表示null
string: HelloWorld #字符串可以直接书写
string2: "Hello World" #可以使用双引号包裹特殊字符
date: 2018-02-17 #日期必须使用yyyy-MM-dd格式
datetime: 2018-02-17T15:02:31+08:00 #时间和日期之间使用T连接，最后使用+代表时区
```

### （2）数组表示方式：

在属性名书写位置的下方使用减号作为数据开始符号，每行书写一个数据，减号与数据间空格分隔 

```yml
subject:
- Java
- 前端
- 大数据
enterprise:
name: itcast
age: 16
subject:
- Java
- 前端
- 大数据
likes: [王者荣耀,刺激战场] #数组书写缩略格式
```

```yml
users: #对象数组格式
- name: Tom
age: 4
- name: Jerry
age: 5
users: #对象数组格式二
-
name: Tom
age: 4
-
name: Jerry
age: 5 #对象数组缩略格式
users2: [ { name:Tom , age:4 } , { name:Jerry , age:5 } ]

```

## 2、yaml数据读取

###  （1）在配置文件中可以使用属性名引用方式引用属性 

```yml
baseDir: /usr/local/fire
center:
dataDir: ${baseDir}/data
tmpDir: ${baseDir}/tmp
logDir: ${baseDir}/log
msgDir: ${baseDir}/msgDir
```

###  （2）属性值中如果出现转移字符，需要使用双引号包裹 

```yml
lesson: "Spring\tboot\nlesson"
```

###  （3）封装全部数据到Environment对象 

```yml
lesson: SpringBoot
server:
port: 82
enterprise:
name: itcast
age: 16
tel: 4006184000
subject:
- Java
- 前端
- 大数据
```

```yml
@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private Environment env;
    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id){
        System.out.println(env.getProperty("lesson"));
        System.out.println(env.getProperty("enterprise.name"));
        System.out.println(env.getProperty("enterprise.subject[0]"));
        return "hello , spring boot!";
    }
}
```

### （4）自定义对象封装指定数据 

```java
@Component
@ConfigurationProperties(prefix = "enterprise")
public class Enterprise {
    private String name;
    private Integer age;
    private String[] subject;
}
```

```java
@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private Enterprise enterprise;
}
```



# 三、整合第三方技术 

## 1、整合JUnit 

```java
@SpringBootTest
class Springboot07JunitApplicationTests {
    @Autowired
    private BookService bookService;
        @Test
        public void testSave(){
        bookService.save();
    }
}

```

- 名称：@SpringBootTest
- 类型：测试类注解
- 位置：测试类定义上方 
- 作用：设置JUnit加载的SpringBoot启动类
- 相关属性 
  - classes：设置SpringBoot启动类 
- 范例： 

```java
@SpringBootTest(classes = Springboot05JUnitApplication.class)
class Springboot07JUnitApplicationTests {}
```

## 2、 整合MyBatis 

### （1）设置数据源参数 

```yml
spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://localhost:3306/ssm_db
        username: root
        password: root
```

 SpringBoot版本低于2.4.3(不含)，Mysql驱动版本大于8.0时，需要在url连接串中配置时区 

```yml
jdbc:mysql://localhost:3306/ssm_db?serverTimezone=UTC
```

### （2） 定义数据层接口与映射配置 

```java
@Mapper
public interface UserDao {
    @Select("select * from user")
    public List<User> getAll();
}
```

### （3） 测试类中注入dao接口，测试功能 

```java
@SpringBootTest
class Springboot08MybatisApplicationTests {
    @Autowired
    private BookDao bookDao;
    @Test
    public void testGetById() {
        Book book = bookDao.getById(1);
        System.out.println(book);
    }
}
```

## 3、 整合MyBatis-Plus 

### （1） 添加坐标

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3</version>
</dependency>
```

（2） 定义数据层接口与映射配置，继承BaseMapper 

```java
@Mapper
public interface UserDao extends BaseMapper<User> {
}
```

## 4、整合Druid

### （1）指定数据源类型 

```yml
spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://localhost:3306/ssm_db?serverTimezone=UTC
        username: root
        password: root
        type: com.alibaba.druid.pool.DruidDataSource
```

### （2） 导入Druid对应的starter 

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.6</version>
</dependency>
```

### （3） 变更Druid的配置方式 

```yml
spring:
    datasource:
        druid:
            driver-class-name: com.mysql.cj.jdbc.Driver
            url: jdbc:mysql://localhost:3306/ssm_db?serverTimezone=UTC
            username: root
            password: root
```

# 四、 基于SpringBoot的SSMP整合案例 

## 1、实体类开发

###  Lombok

####  @Data 

 为当前实体类在编译期设置对应的get/set方法，toString方法，hashCode方法，equals方法等 

## 2、 数据层开发 

###  （1）MyBatisPlus与Druid  starter 

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3</version>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.6</version>
</dependency>
```

### （2） 配置数据源与MyBatisPlus对应的基础配置 

id生成策略使用数据库自增策略

```yml
server:
  port: 80
spring:
  datasource:
    druid:
      url: jdbc:mysql://localhost:3306/test?serverTimezone=UTC
      username: root
      password: lxy1713468473
      driver-class-name: com.mysql.cj.jdbc.Driver
mybatis-plus:
  global-config:
    db-config:
      table-prefix: tb1_
      id-type: auto
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

### （3） 继承BaseMapper并指定泛型

```java
@Mapper
public interface BookDao extends BaseMapper<Book> {
}
```

### （4） 制作测试类测试结果 

```java
@SpringBootTest
public class BookDaoTest {
    @Autowired
    private BookDao bookDao;

    @Test
    void testGetById() {
        System.out.println(bookDao.selectById(42));
    }
}

```

### （5） 分页功能 

 设定分页对象Page 

```java
@Test
void testGetPage() {
    Page page = new Page(1, 5);
    Page page1 = bookDao.selectPage(page, null);
}
```

IPage对象中封装了分页操作中的所有数据 

- 数据 
- 当前页码值 
- 每页数据总量 
- 最大页码值 
- 数据总量 

分页操作是在MyBatisPlus的常规操作基础上增强得到，内部是动态的拼写SQL语句，因此需要增强对应的功能， 使用MyBatisPlus拦截器实现 

```java
@Configuration
public class MpConfig {
    @Bean
    public MybatisPlusInterceptor mpInterceptor() {
        //1.定义Mp拦截器
        MybatisPlusInterceptor mpInterceptor = new MybatisPlusInterceptor();
        //2.添加具体的拦截器
        mpInterceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return mpInterceptor;
    }
}
```

### （6） 条件查询功能 

使用QueryWrapper对象封装查询条件，推荐使用LambdaQueryWrapper对象，所有查询操作封装成方法调用 

```java
@Test
void testGetByCondition() {
    LambdaQueryWrapper<Book> blqw = new LambdaQueryWrapper<>();
    blqw.like(Book::getName,"爱");
    List<Book> books = bookDao.selectList(blqw);
}
```

 支持动态拼写查询条件 

```java
@Test
void testGetByCondition() {
    String name = "";
    LambdaQueryWrapper<Book> blqw = new LambdaQueryWrapper<>();
    blqw.like(Strings.isNotEmpty(name),Book::getName,"爱");
    List<Book> books = bookDao.selectList(blqw);
}
```

## 3、业务层开发

### （1） 接口定义 

```java
public interface BookService {
    boolean save(Book book);
    boolean delete(Integer id);
    boolean update(Book book);
    Book getById(Integer id);
    List<Book> getAll();
    IPage<Book> getByPage(int currentPage,int PageSize);
}
```

### （2） 实现类定义 

```java
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public boolean save(Book book) {
        return bookDao.insert(book) > 0;
    }

    @Override
    public boolean delete(Integer id) {
        return bookDao.deleteById(id) > 0;
    }

    @Override
    public boolean update(Book book) {
        return bookDao.updateById(book) > 0;
    }

    @Override
    public Book getById(Integer id) {
        return bookDao.selectById(id);
    }

    @Override
    public List<Book> getAll() {
        return bookDao.selectList(null);
    }

    @Override
    public IPage<Book> getByPage(int currentPage, int PageSize) {
        IPage<Book> page = new Page<>(currentPage, PageSize);
        return bookDao.selectPage(page,null);
    }
}
```

### （3） 测试类定义 

```java
@SpringBootTest
public class BookServiceTest {
    @Autowired
    private BookService bookService;

    @Test
    void  testGetById() {
        bookService.getById(30);
    }
}

```

### （4）快速开发

 使用MyBatisPlus提供有业务层通用接口（ISerivce）与业务层通用实现类（ServiceImpl 

```java
public interface IBookService extends IService<Book> {
}
```

```java
@Service
public class BookServiceImpl2 extends ServiceImpl<BookDao, Book> implements IBookService {
}
```

## 4、表现层开发

### （1）基于Restful制作表现层接口 

- 新增：POST 
- 删除：DELETE 
- 修改：PUT 
- 查询：GET 

### （2）接收参数 

- 实体数据：@RequestBody 
- 路径变量：@PathVariable 

```java
@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private IBookService bookService;

    @GetMapping
    public List<Book> getAll() {
        return bookService.list();
    }

    @PostMapping
    public Boolean save(@RequestBody Book book) {
        return bookService.save(book);
    }

    @PutMapping
    public Boolean update(@RequestBody Book book) {
        return bookService.update(book,null);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Integer id) {
        return bookService.removeById(id);
    }

    @GetMapping("/{id}")
    public Book getById(@PathVariable Integer id) {
        return bookService.getById(id);
    }

    @GetMapping("/{currentPage}/{pageSize}")
    public List<Book> getAll(@PathVariable Integer currentPage,@PathVariable Integer pageSize) {
        return bookService.getPage(currentPage,pageSize).getRecords();
    }
}
```

### （3） 表现层消息一致性处理 

 业务消息一致性处理 

```java
@Data
public class R {
    private Boolean flag;
    private Object data;
    private String msg;

    public R() {
    }

    public R(Boolean flag) {
        this.flag = flag;
    }

    public R(Boolean flag, Object data) {
        this.flag = flag;
        this.data = data;
    }

    public R(Boolean flag, Object data, String msg) {
        this.flag = flag;
        this.data = data;
        this.msg = msg;
    }
}
```

 对异常进行统一处理，出现异常后，返回指定信息 

```java
public class ProjectExceptionAdvice {
    @ExceptionHandler(Exception.class)
    public R doOtherException(Exception ex){
        ex.printStackTrace();
        return new R(false,null,"系统错误，请稍后再试！");
    }
}
```

