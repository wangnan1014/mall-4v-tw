(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ae06cec","chunk-0e4ddc73"],{"0c10":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.dataForm.userId?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"用户头像",prop:"pic"}},[a("img",{staticClass:"image",attrs:{src:t.dataForm.pic}})]),a("el-form-item",{attrs:{label:"用户昵称",prop:"nickName"}},[a("el-input",{attrs:{disabled:!0,placeholder:"用户昵称"},model:{value:t.dataForm.nickName,callback:function(e){t.$set(t.dataForm,"nickName",e)},expression:"dataForm.nickName"}})],1),a("el-form-item",{attrs:{label:"狀態",size:"mini",prop:"status"}},[a("el-radio-group",{model:{value:t.dataForm.status,callback:function(e){t.$set(t.dataForm,"status",e)},expression:"dataForm.status"}},[a("el-radio",{attrs:{label:0}},[t._v("禁用")]),a("el-radio",{attrs:{label:1}},[t._v("正常")])],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},i=[],r=a("20ca"),n={data(){return{visible:!1,dataForm:{userId:0,nickName:"",pic:"",status:1},page:{total:0,currentPage:1,pageSize:10},resourcesUrl:"http://43.142.163.14:8081/images/",dataRule:{nickName:[{required:!0,message:"用户名不能为空",trigger:"blur"}]}}},methods:{init(t){this.dataForm.userId=t||0,this.visible=!0,this.$nextTick(()=>{this.$refs.dataForm.resetFields()}),this.dataForm.userId&&this.$http({url:this.$http.adornUrl("/admin/user/info/"+this.dataForm.userId),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm=t})},dataFormSubmit:Object(r["a"])((function(){this.$refs["dataForm"].validate(t=>{t&&this.$http({url:this.$http.adornUrl("/admin/user"),method:this.dataForm.userId?"put":"post",data:this.$http.adornData({userId:this.dataForm.userId||void 0,nickName:this.dataForm.nickName,status:this.dataForm.status})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList",this.page)}})})})}))}},l=n,o=a("2877"),d=Object(o["a"])(l,s,i,!1,null,null,null);e["default"]=d.exports},"20ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));const s=(t,e)=>{let a,s=e||300;return function(){let e=arguments;a&&clearTimeout(a);let i=!a;a=setTimeout(()=>{a=null},s),i&&t.apply(this,e)}}},"7fe0":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-user"},[a("avue-crud",{ref:"crud",attrs:{page:t.page,data:t.dataList,option:t.tableOption},on:{"search-change":t.searchChange,"selection-change":t.selectionChange,"on-load":t.getDataList},scopedSlots:t._u([{key:"status",fn:function(e){return[0===e.row.status?a("el-tag",{attrs:{size:"small",type:"danger"}},[t._v("禁用")]):a("el-tag",{attrs:{size:"small"}},[t._v("正常")])]}},{key:"menu",fn:function(e){return[t.isAuth("admin:user:update")?a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(a){return a.stopPropagation(),t.addOrUpdateHandle(e.row.userId)}}},[t._v("編輯")]):t._e(),t.isAuth("admin:user:delete")?a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(a){return a.stopPropagation(),t.deleteHandle(e.row.userId)}}},[t._v("重置密碼")]):t._e(),t.isAuth("admin:user:delete")?a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(a){return a.stopPropagation(),t.deleteHandle(e.row.userId)}}},[t._v("删除")]):t._e()]}}])}),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},i=[];const r={border:!0,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:350,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,props:{label:"label",value:"value"},column:[{label:"用户昵称",prop:"nickName",search:!0},{label:"姓名",prop:"realName",search:!0},{label:"狀態",prop:"status",search:!0,type:"select",slot:!0,dicData:[{label:"禁用",value:0},{label:"正常",value:1}]},{label:"注册時間",prop:"userRegtime",imgWidth:150}]};var n=a("0c10"),l={data(){return{dataList:[],dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,tableOption:r,page:{total:0,currentPage:1,pageSize:10}}},components:{AddOrUpdate:n["default"]},methods:{getDataList(t,e){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/admin/user/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==t?this.page.currentPage:t.currentPage,size:null==t?this.page.pageSize:t.pageSize},e))}).then(({data:t})=>{this.dataList=t.records,this.page.total=t.total,this.dataListLoading=!1})},addOrUpdateHandle(t){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t)})},deleteHandle(t){var e=t?[t]:this.dataListSelections.map(t=>t.userId);this.$confirm(`确定进行[${t?"删除":"批量删除"}]操作?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/admin/user"),method:"delete",data:this.$http.adornData(e,!1)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList(this.page)}})})}).catch(()=>{})},searchChange(t){this.getDataList(this.page,t)},selectionChange(t){this.dataListSelections=t}}},o=l,d=a("2877"),u=Object(d["a"])(o,s,i,!1,null,null,null);e["default"]=u.exports}}]);