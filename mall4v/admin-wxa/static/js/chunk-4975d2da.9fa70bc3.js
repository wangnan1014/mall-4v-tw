(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4975d2da","chunk-451bf266"],{"20ca":function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));const r=(e,t)=>{let a,r=t||300;return function(){let t=arguments;a&&clearTimeout(a);let s=!a;a=setTimeout(()=>{a=null},r),s&&e.apply(this,t)}}},"3a57":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-sys-area"},[a("el-input",{staticClass:"area-search-input",attrs:{placeholder:"地区关键词"},model:{value:e.areaName,callback:function(t){e.areaName=t},expression:"areaName"}}),a("el-button",{staticClass:"area-add-btn",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.addOrUpdateHandle()}}},[e._v("新增")]),a("el-tree",{ref:"tree2",attrs:{data:e.data,"node-key":"areaId","filter-node-method":e.filterNode,props:e.props,"expand-on-click-node":!1},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.node,s=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(r.label))]),a("span",[a("el-button",{attrs:{type:"text",icon:"el-icon-edit",size:"small"},on:{click:function(){return e.update(r,s)}}},[e._v(" 修改 ")]),a("el-button",{attrs:{type:"text",icon:"el-icon-delete",size:"small"},on:{click:function(){return e.remove(r,s)}}},[e._v(" 删除 ")])],1)])}}])}),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},s=[];const i={border:!0,index:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",align:"center",addBtn:!1,editBtn:!1,column:[{label:"",prop:"areaId"},{label:"",prop:"areaName"},{label:"",prop:"parentId"},{label:"",prop:"level"}]};var n=a("6d1b"),d=a("ed08"),l={data(){return{dataList:[],page:{total:0,currentPage:1,pageSize:10},dataListLoading:!1,tableOption:i,addOrUpdateVisible:!1,areaName:"",dataForm:{},data:[],params:{areaName:null},props:{id:"areaId",label:"areaName",children:"children"}}},created(){this.getDataList(this.page)},mounted(){},components:{AddOrUpdate:n["default"]},watch:{areaName(e){this.$refs.tree2.filter(e)}},methods:{getDataList(e,t){this.$http({url:this.$http.adornUrl("/admin/area/list"),method:"get",params:this.$http.adornParams(Object.assign({current:null==e?this.page.currentPage:e.currentPage,size:null==e?this.page.pageSize:e.pageSize},t))}).then(({data:e})=>{let t=Object(d["e"])(e,"areaId","parentId");this.data=t})},addOrUpdateHandle(e){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(e)})},deleteHandle(e){this.$confirm("确定进行删除操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/admin/area/"+e),method:"delete",data:this.$http.adornData({})}).then(({data:e})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList(this.page)}})})}).catch(()=>{})},update(e,t){this.addOrUpdateHandle(t.areaId)},remove(e,t){this.deleteHandle(t.areaId)},filterNode(e,t){return!e||-1!==t.areaName.indexOf(e)}}},o=l,p=(a("3e51"),a("2877")),c=Object(p["a"])(o,r,s,!1,null,"a2bafa86",null);t["default"]=c.exports},"3e51":function(e,t,a){"use strict";a("d5f8")},"6d1b":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.areaId?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"100px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"地区名称",prop:"areaName"}},[a("el-input",{attrs:{placeholder:"请输入地区名称",maxlength:"50","show-word-limit":""},model:{value:e.dataForm.areaName,callback:function(t){e.$set(e.dataForm,"areaName",t)},expression:"dataForm.areaName"}})],1),a("el-form-item",{attrs:{label:"上级地区",prop:"parentId"}},[a("el-cascader",{attrs:{"expand-trigger":"hover",options:e.areaList,props:e.categoryTreeProps,"change-on-select":"",filterable:""},on:{change:e.handleChange},model:{value:e.selectedOptions,callback:function(t){e.selectedOptions=t},expression:"selectedOptions"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.visible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},s=[],i=a("ed08"),n=a("20ca"),d={data(){return{visible:!1,roleList:[],dataForm:{areaId:"",areaName:null,parentId:null,level:null},page:{total:0,currentPage:1,pageSize:20},dataRule:{areaName:[{required:!0,message:"区域名称不能为空",trigger:"blur"},{pattern:/\s\S+|S+\s|\S/,message:"请输入正确的区域名称",trigger:"blur"}]},areaList:[],categoryTreeProps:{value:"areaId",label:"areaName"},selectedOptions:[]}},methods:{init(e){this.dataForm.areaId=e||0,this.visible=!0,this.selectedOptions=[],this.$nextTick(()=>{this.$refs["dataForm"].resetFields(),this.dataForm.areaId&&this.$http({url:this.$http.adornUrl("/admin/area/info/"+this.dataForm.areaId),method:"get",params:this.$http.adornParams()}).then(({data:e})=>{this.dataForm=e,this.selectedOptions.push(this.dataForm.parentId),this.categoryTreeProps.areaId=this.dataForm.areaId,this.categoryTreeProps.areaName=this.dataForm.areaName}),this.$http({url:this.$http.adornUrl("/admin/area/list"),method:"get",params:this.$http.adornParams()}).then(({data:e})=>{this.areaList=Object(i["e"])(e,"areaId","parentId")})})},dataFormSubmit:Object(n["a"])((function(){this.$refs["dataForm"].validate(e=>{e&&this.$http({url:this.$http.adornUrl("/admin/area"),method:this.dataForm.areaId?"put":"post",data:this.$http.adornData(this.dataForm)}).then(({data:e})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList",this.page)}})})})})),handleChange(e){this.dataForm.parentId=e[e.length-1]}}},l=d,o=a("2877"),p=Object(o["a"])(l,r,s,!1,null,null,null);t["default"]=p.exports},d5f8:function(e,t,a){}}]);