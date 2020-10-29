// 用于列表页
import { mapState } from 'vuex'
import ListLayout from '@/layout/list'
import Pagination from '@/components/Pagination'

export default {
    components: {
        ListLayout,
        Pagination
    },
    data() {
        return {
            loading: true,
            
            query: {
                page: 1,
                limit: 20,
                orderBy: 'crtTime_descending',
                keyword: ''
            },
            list: [],
            total: 0,
            defaultOrder: 'crtTime_descending',
            ignoreReset: [],

            chooseIds: [],
            chooseArr: [],

            currentComponent: '',
            componentMes: {}
        }
    },
    methods: {
        // 导出
        exportExcel() {
            $(this.$refs.exportForm).find('div').html('')
            for (let i in this.query) {
              if (this.query[i] != '' && i != 'page' && i != 'limit') {
               $(this.$refs.exportForm).find('div').append(
                 `<input type="text" name="${i}" value="${this.query[i]}"/>`
               ) 
              }
            }
            $(this.$refs.exportForm).submit()
        },

        // 获取列表
        getList() {
            if (this.beforeGetList) {
                const beforeRes = this.beforeGetList()
                if (beforeRes === false) {
                    return false
                }
            }
            this.loading = true
            for (const i in this.query) {
                if (this.query[i] == '' && this.query[i] !== 0) {
                    this.query[i] = undefined
                }
            }
            this.api.getList(this.query).then(({ data }) => {
                if (this.afterGetList) {
                    this.afterGetList(data)
                } else {
                    this.list = data
                }
                // this.total = data.total
                this.$nextTick(() => {
                    if (this.$refs.table) {
                        this.$refs.table.bodyWrapper.scrollTop = 0
                    }
                })
            }).finally(() => {
                this.loading = false
            })
        },

        // 改变每页数量
        sizeChange(val) {
            this.query.page = 1
            this.query.limit = val
            this.getList()
        },

        // 改变页数
        currentChange(val) {
            this.query.page = val
            this.getList()
        },

        // 搜索
        search() {
            this.query.page = 1
            this.getList()
        },

        // 重置搜索
        reset() {
            if (this.$refs.table) {
                this.$refs.table.clearFilter()
                this.$refs.table.clearSort()
            }
            const specialArr = ['limit'].concat(this.ignoreReset)
            for (const i in this.query) {
                if (i == 'page') {
                    this.query[i] = 1
                } else if (i == 'orderBy') {
                    this.query[i] = this.defaultOrder || 'crtTime_descending'
                } else if (specialArr.indexOf(i) == -1) {
                    this.query[i] = undefined
                }
            }
            this.getList()
        },

        // 表格选择
        tableSelect(arr) {
            const chooseIds = arr.map(item => {
                return item.id
            })
            this.chooseArr = arr
            this.chooseIds = chooseIds
        },

        // 表格排序
        tableSort(sort) {
            if (!sort.order) {
                this.query.orderBy = this.defaultOrder || 'crtTime_descending'
            } else {
                this.query.orderBy = sort.prop + '_' + sort.order
            }
            this.query.page = 1
            this.getList()
        },

        // 表格筛选
        filterHandler() {
            return true
        },
        tableFilter(filter) {
            for (const i in filter) {
                this.query[i] = filter[i][0]
            }
            this.query.page = 1
            this.getList()
        },

        // 批量操作
        batchOperate(callback) {
            if (!this.chooseIds.length) {
                this.$message({
                    showClose: true,
                    message: '请至少选中一项',
                    type: 'error'
                })
                return false
            }
            if (callback) {
                callback()
            }
        },

        // 单项查增改
        updateSingle(name, type, data) {
            this.componentMes = {
                data: data ? this.$common.deepCopy(data) : {},
                type
            }
            this.currentComponent = name
        },

        // 单项删除
        removeSingle(id) {
            this.$confirm('确定删除该记录？', '提示', {
                type: 'warning'
            }).then(() => {
                this.api.removeSingle({
                    id: id
                }).then(() => {
                    this.$common.successNotify()
                    this.getList()
                })
            }).catch((err) => {
                console.log(err)
            })
        },

        // 加载组件
        loadComponent(name, data) {
            this.componentMes = data ? this.$common.deepCopy(data) : {}
            this.currentComponent = name
        },

        // 注销组件
        closeComponent(res) {
            this.currentComponent = ''
            this.componentMes = {}
            if (res) {
                if (res.notify) {
                    this.$common.successNotify()
                }
                if (res.reload) {
                    this.getList()
                }
            }
        },

        compCallback(res) {
            this[res.method](res)
        }
    },
    computed: {
        ...mapState({
            dict: state => state.dict,
            elements: state => state.user.elements
        })
    },
    beforeRouteLeave (to, from, next) {
        if (to.meta.inlinePage) {
            this.$route.meta.keepAlive = true
        } else {
            this.$route.meta.keepAlive = false
        }
        next()
    },
    activated() {
        if (this.$route.meta.update && this.init) {
            this.init()
        }
    }
}
