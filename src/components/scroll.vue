<template>
    <div class = 'car_list' ref='scrollbox' @scroll='scrollready($event)'>
    </div>
</template>
<script>
    export default {
        data() {
            return  {
                lengthThreshold: 50, //当滑动到距离低端50px时，更新数据
                timeThreshold: 300,
                promise: null
            }
        },
        methods: {
            // 滚动加载列表
            scrollready() {
                if(this.shouldScroll()) {
                    if (this.promise) {
                        return;
                    }
                    // 进行加载
                    this.fn();
                    // 防止多次滑动，频繁请求后台资源
                    let self = this;
                    this.promise = setTimeout(() => {
                        self.promise = null;
                    }, this.timeThreshold);
                }
            },
            // 调用父组件请求资源服务
            fn() {
                this.$emit('scrollChange');
            },
            shouldScroll() {
                if(document.scrollTop === 0) {// 滑动距离为0，还没开始滑动
                    return false;
                }               // 列表高度 - 列表可视高度 - 滑动的高度 < 50px , 则加载更多
                return this.$refs.scrollbox.scrollHeight - this.$refs.scrollbox.clientHeight - this.$refs.scrollbox.scrollTop < this.lengthThreshold;
            },
        }
    }
</script> 