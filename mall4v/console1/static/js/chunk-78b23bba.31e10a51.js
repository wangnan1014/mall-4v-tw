(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78b23bba","chunk-83dce29c"],{"0558":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:this.dataList[0].propId?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""}},[a("el-table-column",{attrs:{prop:"propName","header-align":"center",align:"center",label:"属性名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{placeholder:"请输入内容",maxlength:"10","show-word-limit":"",clearable:""},model:{value:e.row.propName,callback:function(a){t.$set(e.row,"propName",a)},expression:"scope.row.propName"}})]}}])}),a("el-table-column",{attrs:{prop:"prodPropValues","header-align":"center",align:"center",label:"属性值"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row.prodPropValues,(function(e){return a("el-col",{key:e.valueId,attrs:{span:12}},[a("el-input",{staticClass:"prop-value-input",attrs:{placeholder:"请输入内容",maxlength:"20","show-word-limit":"",clearable:""},on:{clear:t.clearProdPropValues},model:{value:e.propValue,callback:function(a){t.$set(e,"propValue",a)},expression:"item.propValue"}})],1)})),a("el-col",{attrs:{span:4}},[a("el-button",{staticClass:"add-input",attrs:{type:"primary",icon:"el-icon-circle-plus"},on:{click:function(e){return t.addInput()}}})],1)]}}])})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},s=[],i=a("20ca"),o={data(){return{visible:!1,dataList:[{propId:0,propName:"",prodPropValues:[{valueId:0}]}],dataRule:{propName:[{required:!0,message:"属性名称不能为空",trigger:"blur"}]},page:{total:0,currentPage:1,pageSize:10}}},methods:{init(t){this.dataList=t?[JSON.parse(JSON.stringify(t))]:[{propId:0,propName:"",prodPropValues:[{valueId:0}]}],this.visible=!0},dataFormSubmit:Object(i["a"])((function(){if(this.dataList[0].prodPropValues){let t=[];for(const e in this.dataList[0].prodPropValues)if(this.dataList[0].prodPropValues.hasOwnProperty(e)){const a=this.dataList[0].prodPropValues[e];a.propValue&&t.push(this.dataList[0].prodPropValues[e])}this.dataList[0].prodPropValues=t}return this.dataList[0].propName.trim()?this.dataList[0].prodPropValues.length<1?(this.dataList[0].prodPropValues=[{valueId:0}],void this.$message.error("规格项不能为空")):void(this.dataList[0].propName.length>10?this.$message.error("属性名称长度不能大于10"):this.dataList[0].prodPropValues.find(t=>!t.propValue.trim())?this.$message.error("属性值不能为空"):this.dataList[0].prodPropValues.find(t=>t.propValue.length>20)?this.$message.error("属性值长度不能大于20"):this.$http({url:this.$http.adornUrl("/prod/spec"),method:this.dataList[0].propId?"put":"post",data:this.$http.adornData({propId:this.dataList[0].propId||void 0,propName:this.dataList[0].propName,prodPropValues:this.dataList[0].prodPropValues})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList",this.page)}})})):(this.dataList[0].propName="",void this.$message.error("属性名不能为空"))})),clearProdPropValues(){if(1!==this.dataList[0].prodPropValues.length)for(let t=0;t<this.dataList[0].prodPropValues.length;t++){const e=this.dataList[0].prodPropValues[t];e.propValue||this.dataList[0].prodPropValues.splice(t,1)}},addInput(){let t=this.dataList[0].prodPropValues;t[t.length-1].propValue&&t.push({})}}},p=o,l=(a("29d0"),a("2877")),n=Object(l["a"])(p,r,s,!1,null,"632ac00b",null);e["default"]=n.exports},"20ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));const r=(t,e)=>{let a,r=e||300;return function(){let e=arguments;a&&clearTimeout(a);let s=!a;a=setTimeout(()=>{a=null},r),s&&t.apply(this,e)}}},2137:function(t,e,a){},"29d0":function(t,e,a){"use strict";a("2137")},"4abd":function(t,e,a){"use strict";a("e030")},7866:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-prod"},[a("avue-crud",{ref:"crud",attrs:{page:t.page,data:t.dataList,option:t.tableOption,permission:t.permission},on:{"search-change":t.searchChange,"on-load":t.getDataList},scopedSlots:t._u([{key:"prodPropValues",fn:function(e){return t._l(e.row.prodPropValues,(function(e){return a("div",{key:e.valueId,staticClass:"prop-value"},[a("el-tag",[t._v(t._s(e.propValue))])],1)}))}},{key:"menu",fn:function(e){return[t.isAuth("prod:spec:update")?a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(a){return a.stopPropagation(),t.addOrUpdateHandle(e.row)}}},[t._v("編輯")]):t._e(),t.isAuth("prod:spec:delete")?a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(a){return a.stopPropagation(),t.deleteHandle(e.row.propId)}}},[t._v("删除")]):t._e()]}}])},[a("template",{slot:"menuLeft"},[t.isAuth("shop:pickAddr:save")?a("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(e){return e.stopPropagation(),t.addOrUpdateHandle()}}},[t._v("新增")]):t._e()],1)],2),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},s=[],i=a("0558");const o={border:!0,index:!0,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:350,align:"center",refreshBtn:!0,searchSize:"mini",addBtn:!1,editBtn:!1,viewBtn:!1,delBtn:!1,props:{label:"label",value:"value"},column:[{label:"属性名称",prop:"propName",search:!0},{label:"属性值",prop:"prodPropValues",slot:!0}]};var p={data(){return{dataForm:{prodProp:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,page:{total:0,currentPage:1,pageSize:10},permission:{delBtn:this.isAuth("prod:prod:delete")},tableOption:o}},components:{AddOrUpdate:i["default"]},methods:{getDataList(t,e){this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/prod/spec/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==t?this.page.currentPage:t.currentPage,size:null==t?this.page.pageSize:t.pageSize},e))}).then(({data:t})=>{this.dataList=t.records,this.page.total=t.total,this.dataListLoading=!1})},addOrUpdateHandle(t){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t)})},deleteHandle(t){var e=t?[t]:this.dataListSelections.map(t=>t.propId);this.$confirm(`确定进行[${t?"删除":"批量删除"}]操作?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/prod/spec/"+e),method:"delete",data:this.$http.adornData(e,!1)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList(this.page)}})})}).catch(()=>{})},searchChange(t){this.getDataList(this.page,t)}}},l=p,n=(a("4abd"),a("2877")),d=Object(n["a"])(l,r,s,!1,null,"df3cfae2",null);e["default"]=d.exports},e030:function(t,e,a){}}]);