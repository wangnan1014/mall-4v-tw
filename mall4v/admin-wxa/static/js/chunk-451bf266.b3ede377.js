(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-451bf266"],{"20ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));const r=(t,e)=>{let a,r=e||300;return function(){let e=arguments;a&&clearTimeout(a);let s=!a;a=setTimeout(()=>{a=null},r),s&&t.apply(this,e)}}},"6d1b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.dataForm.areaId?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"100px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"地区名称",prop:"areaName"}},[a("el-input",{attrs:{placeholder:"请输入地区名称",maxlength:"50","show-word-limit":""},model:{value:t.dataForm.areaName,callback:function(e){t.$set(t.dataForm,"areaName",e)},expression:"dataForm.areaName"}})],1),a("el-form-item",{attrs:{label:"上级地区",prop:"parentId"}},[a("el-cascader",{attrs:{"expand-trigger":"hover",options:t.areaList,props:t.categoryTreeProps,"change-on-select":"",filterable:""},on:{change:t.handleChange},model:{value:t.selectedOptions,callback:function(e){t.selectedOptions=e},expression:"selectedOptions"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.visible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},s=[],i=a("ed08"),o=a("20ca"),l={data(){return{visible:!1,roleList:[],dataForm:{areaId:"",areaName:null,parentId:null,level:null},page:{total:0,currentPage:1,pageSize:20},dataRule:{areaName:[{required:!0,message:"区域名称不能为空",trigger:"blur"},{pattern:/\s\S+|S+\s|\S/,message:"请输入正确的区域名称",trigger:"blur"}]},areaList:[],categoryTreeProps:{value:"areaId",label:"areaName"},selectedOptions:[]}},methods:{init(t){this.dataForm.areaId=t||0,this.visible=!0,this.selectedOptions=[],this.$nextTick(()=>{this.$refs["dataForm"].resetFields(),this.dataForm.areaId&&this.$http({url:this.$http.adornUrl("/admin/area/info/"+this.dataForm.areaId),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm=t,this.selectedOptions.push(this.dataForm.parentId),this.categoryTreeProps.areaId=this.dataForm.areaId,this.categoryTreeProps.areaName=this.dataForm.areaName}),this.$http({url:this.$http.adornUrl("/admin/area/list"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.areaList=Object(i["e"])(t,"areaId","parentId")})})},dataFormSubmit:Object(o["a"])((function(){this.$refs["dataForm"].validate(t=>{t&&this.$http({url:this.$http.adornUrl("/admin/area"),method:this.dataForm.areaId?"put":"post",data:this.$http.adornData(this.dataForm)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList",this.page)}})})})})),handleChange(t){this.dataForm.parentId=t[t.length-1]}}},n=l,d=a("2877"),m=Object(d["a"])(n,r,s,!1,null,null,null);e["default"]=m.exports}}]);