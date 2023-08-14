# 人力资源后台管理系统

项目介绍| [模板介绍](./TEMPLATE-MSG.md)

## 介绍

一个基于`vue-admin-template`模板的后台管理

对`axios`进行二次封装，实现`模块化`管理

### 页面鉴权

引入`router`和`store`

设置一个数组表明哪些页面是不需要登录就可以进入的

在`router.beforeEach()`中全局路由守卫中进行判断

判断中`store`的`token`属性是否有值

如果`token`有值,接着进行判断所前往的页面是否为登录页

如果是,在有`token`的情况下前往登录页,使用next方法使其返回登录页

如果不是登录页则在放行钱继续判断`vuex`中是否有`用户信息`,如果没有就调用函数获取`用户信息`

若是`token`没有值,则判断所前往的页面路径是否存在于白名单

若存在于白名单就对其放行,

<img src="https://furuixin-1317686530.cos.ap-nanjing.myqcloud.com/%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E8%B5%84%E6%96%99.jpg" alt="示意图" style="transform: rotate(270deg); zoom: 33%;" />

## 登录

1. 封装登录所需api接口文件
2. 登陆时进行非空校验,通过校验后调用`vuex`中`action`内定义的方法发送登录请求
3. 登录后根据返回的状态码判断是否登录成功
4. 成功的话调用函数将token存至`本地`并更新`vuex`中的token属性,接着使用`this.$router.push()`使调转至首页并提示登录成功
5. 如果登陆失败,提示登陆失败

## 首页

1. 进入首页后需要用到用户信息，我们通过`vuex`中的`getter`来获取
2. 实现退出登录,在点击退出按钮时调用`vuex`中的函数删除本地和vuex中的`token`以及用户信息,随后跳转至登录页

## 组织页

> 组织页面我们需要使用到`elment-ui`里面的**Tree 树形控件**组件

### 渲染

1. 首先调用获取列表数据的接口,因为后端返回的使`平铺数据`，而我们需要的是`树形列表`，我们首先封装一个用于转换的函数`transListToTree`,这个函数其他页面也会用到，所以将这个函数放在`utils`公共方法文件夹中
2. `transListToTree`封装思路为定义一个空数组用于存放最终数据，然后`遍历`传递过来的平铺列表数据，判断遍历出的数据是否等于`transListToTree`接收过来的id,如果将其添加到数组内，然后递归继续遍历list，只不过这次接收的id是`item`的id
3. 操作菜单使用`elment-ui`中的**dropdown 下拉菜单**组件，并在每个**dropdown-item 菜单选项**中定义`command`属性，以此在**dropdown-item 菜单选项**被点击使让**dropdown 下拉菜单**的`@command`事件得到参数,接着我们通过判断默认属性$event的值来确定执行添加还是编辑亦或者删除函数

### 封装弹窗组件

> 由于添加和编辑所需弹窗中表单一致,为了提高代码质量，需要将其合二为一封装成组件

1. 注册弹窗组件并在父组件内引用

2. 父组件内使用一个状态来控制弹窗的显示隐藏,另外在定义一个pid属性用以确定要添加到或编辑那个数据

3. 在编辑时需要数据回填，但由于prop更新pid属性是异步的,所以要使用`this.$refs.childComponent.childMethod()`异步方法在数据更新后再调用子组件内的方法，获取要编辑的数据并将获取到的数据对象赋值给表单对象使其完成回填

   ```vue
    addDept(type,id){
          if(type ==='add'){
           // 模态框显示
           this.showDialog = true
           // 记录父级id
           this.currentNodeId  = id
          }else if(type ==='edit'){
           // 编辑
           this.showDialog = true
           // 记录id
           this.currentNodeId = id
           // 更新props是 异步动作
           this.$nextTick(()=>{
           // 通过ref获取组件实例 调用子组件的方法  同步方法
             this.$refs.adddept.getDepartmentDetail()
           })
          }
       },
   ```

4. 获取到的数据对象会有表单对象所没有的属性，提交时就可以通过判断表单对象是否具有这个属性来确定将表单数据发送到更新接口还是添加接口

## 角色页
> 使用`elment-ui`的**table 表格**组件渲染

1. 调用角色列表接口获取数据并渲染
2. 首先点击添加角色,弹出模态框,点击确定对表单进行校验,校验通过请求添加角色接口将表单数据传入,添加成功后关闭模态框并调用角色列表接口进行视图更新
3. 因为此页面编辑功能是行内的,我们需要一个状态去判断,所以我们需要在角色列表请求回来的数据中添加一个`flag`来判断当前行的状态并且我们需要对原有数据进行备份,因为当我们点击编辑后再点击取消时,数据是不会修改的,
4. 当我们点击编辑,在`template`中使用`v-if` `v-else`来判断,点击确定调用编辑接口,给出对应提示并请求角色列表进行视图更新
5. 删除就是点击删除按钮,记录当前行的id,并请求删除接口,删除成功后给出对应提示并请求角色列表进行视图更新

## 员工页

* . 左侧需要为`树形列表`，而接口获取到的是`平铺数据`，所以我们调用公共方法`transListToTree`转换一下，树形控件我们默认第一个高亮,我们将数据数组下标为0的对象的id赋值给一个对象的属性上，这个对象是右侧table获取数据所需要的数据，

* . 右侧根据对象获取到数据后使用表格渲染即可

   > 导入excel
   1. 导入excel的实现为使用类型为file的input，并将input的accept属性赋值为'.xlsx,xls'限制上传文件类型
   2. 给input添加change事件，再input发生变化后判断事件目标元素(触发该事件的节点)的files属性的的长度是否大于0，如果长度大于的话创建一个FormData对象并将文件赋值为这个FormDate对象
   3. 将FormData对象通过接口发送给后端后就可以重新获取渲染数据了

``` js
    async uploadChang(event) {
        console.log(event);
        let file = event.target.files
        if (file.length > 0) {
            const data = new FormData()
            data.append('file', file[0])
            importEmployee(data)
            this.$emit('uploadExcel')
            this.close()
        }
    }

```

   > 导出excel

   1. 导出员工接口返回的是二进制流blob
   2. 所以需要给axios配置responseType为blob，因为接收二进制流格式是blob
   3. `npm install file-saver --save`引入`file-saver`插件
   4. 调用接口获取二进制流
   5. 使用插件的saveAs(blob,fileName)

   ``` js
   async downloadExcel() {
        const res = await downloadExcel()
        saveAs(res, '员工信息标.xlsx')
    }
   ```
