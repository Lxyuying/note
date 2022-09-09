# 一、Transform (2D)

> 使用：transform

1、translate(x,y) 平移

2、scale(x,y) 缩放

3、rotate(deg) 旋转

4、skew(deg,deg) 翻转 z？ 轴



#  二、Transform (3D)

0、perspective：x px 透视

1、translate3d(x,y,z)

2、translateX(x)

3、translateY(y)

4、translateZ(z)



# 三、Transition 过渡属性

1、过渡属性

transition-property: none|all|property

2、过渡时间

transition-duration: s|ms

3、过渡函数

transition-timing-function:

- `ease` - 规定过渡效果，先缓慢地开始，然后加速，然后缓慢地结束（默认）
- `linear` - 规定从开始到结束具有相同速度的过渡效果
- `ease-in` -规定缓慢开始的过渡效果
- `ease-out` - 规定缓慢结束的过渡效果
- `ease-in-out` - 规定开始和结束较慢的过渡效果
- `cubic-bezier(n,n,n,n)` - 允许您在三次贝塞尔函数中定义自己的值

4、过渡延迟

transition-delay: s|ms

5、简写

transition: property duration timing-function delay

# 四、animation 动画属性

1、@keyframes

```css
@keyframes name {
  from|0% {css样式}
  to|100% {css样式}
}
```

2、animation

animation-name:

animation-duration: s|ms

animation-timing-function:

animation-delay: s|ms

animation-iteration-count: Number|infinite

animation-direction: normal|alternate // 奇数正常播放，偶数倒放

animation-fill-mode:forwards|none; // 停留在最后一帧

animation-play-state: paused|running; // 暂停or运行

animation: name duration timing-function delay iteration-count direction;