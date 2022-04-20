 运行 ：

```
redis-server.exe redis.windows.conf
```

启动

```
redis-cli.exe -h 127.0.0.1 -p 6379
```

# 一、**常用五大数据类型**

> redis常见数据类型操作命令http://www.redis.cn/commands.html

## 1、Redis键(key)

keys *查看当前库所有key  (匹配：keys *1)

exists key判断某个key是否存在

type key 查看你的key是什么类型

del key    删除指定的key数据

仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作。

expire key 10  10秒钟：为给定的key设置过期时间

ttl key 查看还有多少秒过期，-1表示永不过期，-2表示已过期

select命令切换数据库

dbsize查看当前数据库的key的数量

flushdb清空当前库

flushall通杀全部库



## 2、Redis字符串(String)

String是Redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。

String类型是二进制安全的。意味着Redis的string可以包含任何数据。比如jpg图片或者序列化的对象。

String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是512M



set  <key><value>添加键值对

*NX：当数据库中key不存在时，可以将key-value添加数据库

*XX：当数据库中key存在时，可以将key-value添加数据库，与NX参数互斥

*EX：key的超时秒数

*PX：key的超时毫秒数，与EX互斥



get  <key>查询对应键值

append <key><value>将给定的<value> 追加到原值的末尾

strlen <key>获得值的长度

setnx <key><value>只有在 key 不存在时  设置 key 的值

incr <key>

将 key 中储存的数字值增1

只能对数字值操作，如果为空，新增值为1

decr <key>

将 key 中储存的数字值减1

只能对数字值操作，如果为空，新增值为-1

incrby / decrby <key><步长>将 key 中储存的数字值增减。自定义步长。



mset <key1><value1><key2><value2> ..... 

同时设置一个或多个 key-value对 

mget <key1><key2><key3> .....

同时获取一个或多个 value 

msetnx <key1><value1><key2><value2> ..... 

同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。



getrange <key><起始位置><结束位置>

获得值的范围，类似java中的substring，**前包，后包**

setrange <key><起始位置><value>

用 <value> 覆写<key>所储存的字符串值，从<起始位置>开始(**索引从0****开始**)。



**setex <****过期时间****>**

设置键值的同时，设置过期时间，单位秒。

getset <key><value>

以新换旧，设置了新值同时获得旧值。



String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配.  



## 3、**Redis**列表**(List)**

单键多值

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

它的底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。



lpush/rpush <key><value1><value2><value3> .... 从左边/右边插入一个或多个值。

lpop/rpop <key>从左边/右边吐出一个值。值在键在，值光键亡。

 

rpoplpush <key1><key2>从<key1>列表右边吐出一个值，插到<key2>列表左边。

 

lrange <key><start><stop>

按照索引下标获得元素(从左到右)

lrange mylist 0 -1  0左边第一个，-1右边第一个，（0-1表示获取所有）

lindex <key><index>按照索引下标获得元素(从左到右)

llen <key>获得列表长度 

 

linsert <key> before <value><newvalue>在<value>的后面插入<newvalue>插入值

lrem <key><n><value>从左边删除n个value(从左到右)

lset<key><index><value>将列表key下标为index的值替换成value



## 4、 **Redis**集合(**Set)**

sadd <key><value1><value2> ..... 

将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略

smembers <key>取出该集合的所有值。

sismember <key><value>判断集合<key>是否为含有该<value>值，有1，没有0

scard<key>返回该集合的元素个数。

srem <key><value1><value2> .... 删除集合中的某个元素。

spop <key>**随机从该集合中吐出一个值。**

srandmember <key><n>随机从该集合中取出n个值。不会从集合中删除 。

smove <source><destination>value把集合中一个值从一个集合移动到另一个集合

sinter <key1><key2>返回两个集合的交集元素。

sunion <key1><key2>返回两个集合的并集元素。

sdiff <key1><key2>返回两个集合的**差集**元素(key1中的，不包含key2中的)



## 5、**Redis哈希(Hash)**

hset <key><field><value>给<key>集合中的 <field>键赋值<value>

hget <key1><field>从<key1>集合<field>取出 value 

hmset <key1><field1><value1><field2><value2>... 批量设置hash的值

hexists<key1><field>查看哈希表 key 中，给定域 field 是否存在。 

hkeys <key>列出该hash集合的所有field

hvals <key>列出该hash集合的所有value

hincrby <key><field><increment>为哈希表 key 中的域 field 的值加上增量 1  -1

hsetnx <key><field><value>将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 .



## 6、 **Redis**有序集合**Zset(sorted set)** 

zadd <key><score1><value1><score2><value2>…

将一个或多个 member 元素及其 score 值加入到有序集 key 当中。

**zrange  [WITHSCORES]**  

返回有序集 key 中，下标在<start><stop>之间的元素

带WITHSCORES，可以让分数一起和值返回到结果集。

zrangebyscore key minmax [withscores] [limit offset count]

返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。有序集成员按 score 值递增(从小到大)次序排列。 

zrevrangebyscore key maxmin [withscores] [limit offset count]        

同上，改为从大到小排列。 

zincrby <key><increment><value>   为元素的score加上增量

zrem <key><value>删除该集合下，指定值的元素 

zcount <key><min><max>统计该集合，分数区间内的元素个数 

zrank <key><value>返回该值在集合中的排名，从0开始。



# 二、手机验证码

```xml
<dependency>
  <groupId>redis.clients</groupId>
  <artifactId>jedis</artifactId>
  <version>3.2.0</version>
</dependency>

```



```js
package com.ouyuming.redis;

import redis.clients.jedis.Jedis;

import java.util.Random;

public class PhoneCode {
    public static void main(String[] args) {
        System.out.println(getCode());
    }

    // 3.验证码校验
    public static void getRedisCode(String phone,String code) {
        Jedis jedis = new Jedis("127.0.0.1", 6379);
        String codeKey = "VerifyCode" + phone+ ":code";
        String redisCode = jedis.get(codeKey);
        if(redisCode.equals(code)) {
            System.out.println("YES");
        } else {
            System.out.println("NO");
        }
        jedis.close();
    }

    // 1、输入手机号，点击发送后随机生成6位数字码，2分钟有效
    // 2、输入验证码，点击验证，返回成功或失败
    // 3、每个手机号每天只能输入3次
    public static void verifyCode(String phone) {
        Jedis jedis = new Jedis("127.0.0.1", 6379);

        // 手机发送次数key
        String countKey = "VerifyCode" + phone + ":count";
        // 验证码key
        String codeKey = "VerifyCode" + phone + ":code";

        // 每个手机每天只能发送三次
        String count = jedis.get(countKey);
        if (count == null) {
            jedis.setex(countKey,24*60*60,"1");
        } else if (Integer.parseInt(count) < 2) {
            jedis.incr(countKey);
        } else if (Integer.parseInt(count) > 2) {
            System.out.println("今天3次免费次数已用完！");
            jedis.close();
            return;
        }
        String vcode =getCode();
        jedis.setex(codeKey,120,vcode);
    }

    // 1.生产6位数字验证码
    public static String getCode() {
        Random random = new Random();
        String code = "";
        for (int i = 0;i < 6;i++) {
            int rand = random.nextInt(10);
            code += rand;
        }
        return code;
    }
}
```



# 三、SpringBoot整合Redis

## 1、相关依赖

```xml
<!-- redis -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- spring2.X集成redis所需common-pool2-->
<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-pool2</artifactId>
  <version>2.6.0</version>
</dependency>

```

## 2、redis配置  

```yaml
#Redis服务器地址
spring.redis.host=192.168.140.136
#Redis服务器连接端口
spring.redis.port=6379
#Redis数据库索引（默认为0）
spring.redis.database= 0
#连接超时时间（毫秒）
spring.redis.timeout=1800000
#连接池最大连接数（使用负值表示没有限制）
spring.redis.lettuce.pool.max-active=20
#最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-wait=-1
#连接池中的最大空闲连接
spring.redis.lettuce.pool.max-idle=5
#连接池中的最小空闲连接
spring.redis.lettuce.pool.min-idle=0

```



## 3、配置类

```java
@EnableCaching
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setConnectionFactory(factory);
//key序列化方式
        template.setKeySerializer(redisSerializer);
//value序列化
        template.setValueSerializer(jackson2JsonRedisSerializer);
//value hashmap序列化
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
//解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
// 配置序列化（解决乱码的问题）,过期时间600秒
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(600))
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(redisSerializer))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer))
                .disableCachingNullValues();
        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
}

```



## 4、测试

```java
@RestController
@RequestMapping("/redisTest")
public class RedisTestController {
    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping
    public String testRedis() {
        //设置值到redis
        redisTemplate.opsForValue().set("name","lucy");
        //从redis获取值
        String name = (String)redisTemplate.opsForValue().get("name");
        return name;
    }
}

```

