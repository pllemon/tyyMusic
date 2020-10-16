// 用于数据的添加、详情、编辑
export default {
    props: {
        mes: {
            type: Object,
            default: () => {
                return {
                    data: {},
                    type: 0
                }
            }
        }
    },
    data() {
        return {
            loading: false,
            form: {},
            readonly: false,
            rules: {},
            updateType: {
                0: '添加',
                1: '详情',
                2: '编辑',
                3: '克隆'
            },
            assignData: true // 是否合并数据
        }
    },
    created() {
        let mes = this.mes.data
        if (this.assignData) {
            this.form = Object.assign({}, this.form, mes)
        }
        this.readonly = this.mes.type == 1
    },
    methods: {
        close() {
            this.$emit('close')
        },

        // 新增或编辑
        updateSingle() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if (this.beforeUpdate) {
                        let beforeRes = this.beforeUpdate()
                        if (beforeRes === false) {
                            return false
                        }
                    }
                    this.loading = true
                    if (this.mes.type == 3) {
                        this.form.id = ''
                    }
                    this.api.updateSingle(this.form).then(res => {
                        if (this.updateHandle) {
                            this.updateHandle(res)
                        } else {
                            if (this.updateSuccess) {
                                this.$common.successNotify(res.message)
                                this.updateSuccess(res)
                            } else {
                                this.$emit('close', {
                                    'notify': true,
                                    'reload': true
                                })
                            }
                        }
                    }).catch(res => {
                        if (this.catchHandle) {
                            this.catchHandle(res)
                        }
                    }).finally(() => {
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}
