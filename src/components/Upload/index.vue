<template>
  <div>
    <div style="text-align:center;position:relative;display:inline-block" v-if="!disabled">
      <el-upload
        class="avatar-uploader"
        name="files"
        :action="action"
        accept="image/jpeg,image/jpg,image/png"
        :data="{bizType: 2}"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
      >
        <img v-if="value" :src="value" class="avatar">
        <i v-if="!value && !loading" class="el-icon-plus avatar-uploader-icon"></i>
        <i v-if="!value && loading" class="el-icon-loading avatar-uploader-icon"></i>
      </el-upload>
      <i class="el-icon-close remove-icon" v-if="value" @click="removePhoto"/>
    </div>
    <el-image
      v-if="disabled"
      style="width: 100px; height: 100px"
      :src="value"
    />
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { upload } from '@/api/com'
export default {
  props: {
    value: '',
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: {
        'Authorization': getToken()
      },
      action: upload(),
      loading: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    beforeUpload() {
      this.loading = true
    },
    handleSuccess(res, file) {
      this.loading = false
      if (res.status == 200) {
        this.$emit('input', res.data[0])
      } else {
        this.$emit('input', '')
        this.$message.error(res.message)
      }
    },
    handleError(res) {
      this.loading = false
      this.$message.error(res.message)
    },

    removePhoto() {
      this.$emit('input', '')
    },
  }
}
</script>
<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409EFF;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}

.remove-icon{
  position: absolute;
  right: 0;
  top: 0;
  font-size: 16px;
  background: #F56C6C;
  color: #fff;
  cursor: pointer;
}
</style>