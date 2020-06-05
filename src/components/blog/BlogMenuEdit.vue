<template>
  <el-container>
    <el-aside width="80px">
      <!--      左侧边栏,占位用  -->
    </el-aside>
    <el-main class="blog_menu_edit_container">
      <div>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>后台管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blog/admin' }">MD文档管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"></el-cascader>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="menuId"
          label="菜单id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="menuName"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="menuLevel"
          label="菜单级别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="menuParentId"
          label="父菜单id">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-form :model="menuform" :rules="rules" ref="menuform" label-width="100px" size="small">
        <el-form-item label="菜单名称" prop="fmenuname">
          <el-input v-model="menuform.fmenuname" class="form-full-size"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单" prop="fmenuparentid">
          <el-input v-model="menuform.fmenuparentid" class="form-full-size"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别" prop="fmenulevel">
          <el-select v-model="menuform.fmenulevel" placeholder="请选择菜单级别" class="form-full-size">
            <el-option label="一级菜单" value="1"></el-option>
            <el-option label="二级菜单" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('menuform')">立即创建</el-button>
          <el-button @click="resetForm('menuform')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-aside width="80px">
      <!--      右侧边栏，占位用  -->
    </el-aside>
  </el-container>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { MessageBox } from 'element-ui'
export default {
  name: 'BlogMenuEdit',
  data () {
    return {
      value: [],
      tableData: [],
      selectlevel: 0,
      options: [{
        value: 'menuquery',
        label: '菜单查询',
        children: [{
          value: 'level1',
          label: '一级菜单'
        }, {
          value: 'level2',
          label: '二级菜单'
        }, {
          value: 'level3',
          label: '三级菜单'
        }
        ]
      }],
      menuform: {
        fmenuname: '',
        fmenuparentid: '',
        fmenulevel: ''
      },
      rules: {
        fmenuname: [
          {required: true, message: '请输入菜单名称', trigger: 'blur'}
        ],
        fmenuparentid: [
          {required: true, message: '请输入父级菜单id', trigger: 'blur'}
        ],
        fmenulevel: [
          {required: true, message: '请输入菜单级别', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleClick (row) {
      MessageBox.alert('确认要删除此菜单吗？ --' + row.menuName, '删除菜单', {
        showCancelButton: true,
        confirmButtonText: '确定'
      }).then((action) => {
        if (action === 'confirm') {
          this.delMenu(row.menuId)
        }
      }).catch(() => {})
    },
    onSubmit (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.addMenu()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (menuform) {
      this.$refs[menuform].resetFields()
    },
    handleChange (value) {
      console.log(value[1])
      switch (value[1]) {
        case 'level1': {
          this.selectlevel = 1
          this.getMenuLevel(this.selectlevel)
          break
        }
        case 'level2': {
          this.selectlevel = 2
          this.getMenuLevel(this.selectlevel)
          break
        }
        case 'level3': {
          this.selectlevel = 3
          this.getMenuLevel(this.selectlevel)
          break
        }
      }
    },
    delMenu (menuid) {
      let url = this.gohost + '/delmenu'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'menuid': menuid
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            console.log(response.data.message)
          } else {
            console.log(response.data.message)
          }
          vm.getMenuLevel(vm.selectlevel)
        })
        .catch(function (response) {
          console.log(response.date)
        })
    },
    addMenu () {
      console.log(this.menuform)
      let url = this.gohost + '/addmenu'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        fmenuname: vm.menuform.fmenuname,
        fmenuparentid: vm.menuform.fmenuparentid,
        fmenulevel: vm.menuform.fmenulevel
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.resetForm('menuform')
            vm.getMenuLevel(vm.selectlevel)
            MessageBox.alert('添加菜单成功', '添加菜单', {
              confirmButtonText: '确定'
            })
          } else {
            MessageBox.alert('添加菜单失败: ' + response.data.message, '添加菜单', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(function (response) {
          MessageBox.alert('添加菜单失败' + response, '添加菜单', {
            confirmButtonText: '确定'
          })
        })
    },
    getMenuLevel (level) {
      let url = this.gohost + '/getmenulevel'
      var vm = this
      axios.defaults.withCredentials = false
      axios.post(url, qs.stringify({
        'menulevel': level
      }))
        .then(function (response) {
          if (response.data.code === 1) {
            vm.tableData = response.data.data
            console.log(response.data.data)
          } else {
            console.log(response.data.message)
          }
        })
        .catch(function (response) {
          console.log(response.date)
        })
    }
  }
}
</script>

<style scoped>
.blog_menu_edit_container{
  background-color: #ffffff;
  text-align: left;
  min-height: calc(100vh - 176px);
  padding: 10px;
}
  .form-full-size{
    width: 380px;
  }
</style>
