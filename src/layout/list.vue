<template>
    <div class="list-layout">
        <div class="side" v-if="hasSide" ref="side">
            <slot name="side" />
        </div>
        <div class="drag-line" v-if="hasSide" ref="dragLine">
          <span></span>  
        </div>
        <div class="content column">
            <div class="header">
                <div class="search">
                    <slot name="search" />
                </div>
                <div class="action">
                    <slot name="action" />
                </div>
            </div>
            <div class="table">
                <slot />
            </div>
            <!-- <div class="pagination">
                <slot name="pagination" />
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hasSide: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.initDrag()
    },
    methods: {
        initDrag() {
            let that = this
            if (!that.hasSide) {
                return false
            }
            this.$refs.dragLine.onmousedown = function(e1) {
                let offsetWidth = that.$refs.side.offsetWidth
                document.onmousemove = function (e2) {
                    let moveX = parseInt(offsetWidth + e2.clientX - e1.clientX)
                    if (moveX < 200) {
                        moveX = 200
                    }
                    if (moveX > 600) {
                        moveX = 600
                    }
                    that.$refs.side.style.width = moveX + 'px'
                }
                document.onmouseup = function (evt) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
                return false
            }
        }
    }
}
</script>

<style lang="scss">
.list-content{
    height: 100%;

    &.list-tab>.list-layout>.content{
        padding: 0;
    }

    &.list-tab>.list-layout>.content .search{
        margin-right: 0;
    }
}
.list-layout{
    height: 100%;
    display: flex;
    .side{
        width: 250px;
        padding: 10px 0;
        overflow: auto;
        flex-shrink: 0;
        .grg-tree{
            position: relative;
            left: -8px;
        }
    }
    .drag-line{
        background: #EBEEF5;
        width: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: col-resize;
        margin-right: 10px;
        span{
            border-left: 1px solid #aaa;
            border-right: 1px solid #aaa;
            width: 4px;
            height: 20px;
        }
    }
    .content{
        padding: 10px;
        overflow: auto;
        flex: 1;
        .breadcrumb{
            margin-bottom: 10px;
            border-bottom: 1px solid #EBEEF5;
            padding-bottom: 10px;
            position: relative;
            padding-left: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:after{
                content: '';
                position: absolute;
                width: 3px;
                height: 16px;
                border-radius: 2px;
                background: #4279de;
                top: 7px;
                left: 0px;
            }
        }
        .header{
            display: flex;
            margin-bottom: 10px;
            align-items: flex-start;
            .search{
                flex: 1;
                margin-right: 20px;
                .el-button{
                    margin-left: 10px;
                }
            }
            .action{
                max-width: 300px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                flex-wrap: wrap;
                button{
                    margin-bottom: 10px;
                    margin-left: 10px;
                    & + button{
                        margin-left: 10px;
                    }
                }
            }
        }
        .table{
            flex: 1;
            overflow: auto;
        }
    }
}
</style>
