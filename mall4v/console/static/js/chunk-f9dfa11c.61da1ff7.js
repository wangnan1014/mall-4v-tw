(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f9dfa11c","chunk-6c644620","chunk-2d22c702","chunk-2d0c04c7"],{"06b9":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAwCAYAAAC8NUKEAAADBElEQVRoQ+2aXW7aQBDHZyLwa+kJmpyg5AQlJ2h6gsIDs+Kp6QkCJ2h49PIAuUF6gqYnCD1B6QnqvmJZU421RmvHH+LDGKSdhwh58c78ZnbR/neCYJnv+7cA8AERu/bzU/zMzMHFxcWy1WpNB4NBIDGi/JnP5531ej1HRIE5NwuYeaCUeophtNY/AKB3bhR2vMz8CbXWfSnOOYNI7My8Ephn2ScWzDSKoofRaLQ6ZUDZ34j4AADvkjgF5i8AdAzdP6VU/PkcTGstMF9sGLYC/0lEZ7N3fN8fI+K9gzm1pecqc2oVSeJxlXGVOUIG3DI7QpJ3cuEqY6fNaB85QlwCwKPoiLK0GsH3GQBWnudNEiGV984Oc+9+nDHOXhBRQBKbEtFdXnDZZQAAQRRF13kncpk7DMPfyaHXHHwnSqlxUbL2WmY5wcV+iCgWeVnTWtuH2HiYmb8qpeS0m7KCuQMientUGAC4JqJldjmGYSjyImXMLEtTBGHKssf5ZDCKoqsibbVXZbTWctHxYkfBzIUaSGst++ljJu4BES1yYF7NDQB/iMhe0qXVFHG2lZ4Rmc3Md4j4XpwhYn84HIpafWVmHyyYuYeIbwCgcH/Jy9m5AeA2W3HbyV6VKVq7TT13ME1lvsqvq0xVhpoad5VpKvNVfl1lqjLU1LirTFOZr/LrKlOVoabGSysjDRul1FVTwW3rNw8m1WxCxJuiI/22zur8vpEX0r7cNJOxQK6Kaow7uBkhJs+elFKP9nMz8Tdm7iDipEyDyHum67VpEu0CzcyX9l2EiEQ0gUjwm3Za1eRZKev7/gIR5QZGTIBvioDq6qEy8yTpNneZ+dmowSoWyC7FnL5oLlBdIImC3dyqmGskuTXpGklcBPWdiFL/LzCbzXrMLOvXthTQoUHiZYW4RMRxssdzr4gqS5PzhYJgYyCzSVPteWb+5Xler+xScNs4DgYjjkuAUh3sOkDE/0FhSoA2Sa4LpBaYMqA6QWqDyQOqG6RWGJnc/MrJxXfQbrf7h9zseT8O/wFi7GFUHtda7AAAAABJRU5ErkJggg=="},"20c2":function(t,a,e){},"40d9":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-dialog",{attrs:{modal:!1,title:"选择發貨地址","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(a){t.visible=a}}},[e("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.dataFormSubmit()}}},[e("el-form-item",{attrs:{label:"快递公司"}},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.dataForm.dvyId,callback:function(a){t.$set(t.dataForm,"dvyId",a)},expression:"dataForm.dvyId"}},t._l(t.dataForm.dvyNames,(function(t){return e("el-option",{key:t.dvyId,attrs:{label:t.dvyName,value:t.dvyId}})})),1)],1),e("el-form-item",{attrs:{label:"快递单号",prop:"dvyFlowId"}},[e("el-input",{attrs:{"controls-position":"right",min:0,label:"快递单号"},model:{value:t.dataForm.dvyFlowId,callback:function(a){t.$set(t.dataForm,"dvyFlowId",a)},expression:"dataForm.dvyFlowId"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.visible=!1}}},[t._v("取消")]),e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},i=[],s={data(){return{visible:!1,dataForm:{dvyId:"",dvyFlowId:0,dvyNames:[],orderNumber:0},dataRule:{dvyFlowId:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{init(t,a,e){this.visible=!0,this.dataForm.orderNumber=t||"",this.dataForm.dvyId=a||"",this.dataForm.dvyFlowId=e||"",this.$http({url:this.$http.adornUrl("/admin/delivery/list"),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm.dvyNames=t})},dataFormSubmit(){this.$refs["dataForm"].validate(t=>{t&&this.$http({url:this.$http.adornUrl("/order/order/delivery"),method:"put",data:this.$http.adornData({orderNumber:this.dataForm.orderNumber,dvyId:this.dataForm.dvyId,dvyFlowId:this.dataForm.dvyFlowId})}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.visible=!1,this.$emit("refreshDataList")}})})})}}},d=s,l=e("2877"),o=Object(l["a"])(d,r,i,!1,null,null,null);a["default"]=o.exports},"4fac":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("el-dialog",{attrs:{title:t.dataForm.orderNumber?"查看":"新增","close-on-click-modal":!1,visible:t.visible,width:"80%"},on:{"update:visible":function(a){t.visible=a}}},[r("el-form",{ref:"dataForm",attrs:{model:t.dataForm,"label-width":"80px"},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.dataFormSubmit()}}},[r("div",{staticClass:"main"},[r("div",{staticClass:"content"},[r("div",{staticClass:"order-number"},[r("div",{staticClass:"num-cont"},[r("el-form-item",{attrs:{label:"訂單編號:"}},[r("span",{staticClass:"text"},[t._v(t._s(t.dataForm.orderNumber))])]),r("el-form-item",[r("el-steps",{attrs:{active:t.stepsStatus,"align-center":"","process-status":6==t.dataForm.status?"error":"wait"}},[r("el-step",{attrs:{title:"提交訂單",description:t.dataForm.orderTime}}),r("el-step",{attrs:{title:"买家已付款",description:t.dataForm.payTime}}),1!==t.dataForm.orderType?r("el-step",{attrs:{title:"卖家已發貨",description:t.dataForm.dvyTime}}):t._e(),1!==t.dataForm.orderType?r("el-step",{attrs:{title:"买家已收货",description:t.dataForm.finallyTime}}):t._e()],1)],1)],1)]),r("div",{staticClass:"order-state"},[r("div",{staticClass:"state-cont"},[r("div",{staticClass:"state-title"},[r("el-form-item",{attrs:{label:"訂單狀態:"},scopedSlots:t._u([{key:"default",fn:function(a){return[1===t.dataForm.status?r("el-tag",{attrs:{size:"small",type:"warning"}},[t._v("待付款")]):t._e(),2===t.dataForm.status&&1!==t.dataForm.orderType?r("el-tag",{attrs:{size:"small",type:"warning"}},[t._v("待發貨")]):t._e(),3===t.dataForm.status&&1!==t.dataForm.orderType?r("el-tag",{attrs:{size:"small",type:"warning"}},[t._v("待收货")]):t._e(),4===t.dataForm.status&&1!==t.dataForm.orderType?r("el-tag",{attrs:{size:"small",type:"warning"}},[t._v("待评价")]):t._e(),5===t.dataForm.status?r("el-tag",{attrs:{size:"small",type:"success"}},[t._v("成功")]):t._e(),6===t.dataForm.status?r("el-tag",{attrs:{size:"small",type:"danger"}},[t._v("失败")]):t._e()]}}])}),r("el-form-item",[r("el-row",[2===t.dataForm.status&&1!==t.dataForm.orderType?r("el-button",{attrs:{type:"primary",plain:""},on:{click:function(a){return t.changeOrder(t.dataForm.orderNumber)}}},[t._v("發貨")]):t._e()],1)],1)],1),r("div",{staticClass:"order-info"},[r("div",{staticClass:"order-details"},[r("div",{staticClass:"detail-title"},[r("img",{attrs:{src:e("5ef9"),alt:""}}),r("span",{staticClass:"prompt"},[t._v("买家付款后才可以發貨")])]),r("div",{staticClass:"detail-cont"},[r("div",{staticClass:"detail01"},[r("img",{attrs:{src:e("c542"),alt:""}}),r("div",{staticClass:"text-width"},[r("el-form-item",{attrs:{label:"收货人:"}},[r("span",[t._v(t._s(t.dataForm.userAddrOrder.receiver))])]),r("el-form-item",{attrs:{label:"手机:"}},[r("span",[t._v(t._s(t.dataForm.userAddrOrder.mobile))])]),r("el-form-item",{attrs:{label:"收货地址"}},[r("span",[t._v(t._s(t.dataForm.userAddrOrder.province)+t._s(t.dataForm.userAddrOrder.city)+t._s(t.dataForm.userAddrOrder.area)+t._s(t.dataForm.userAddrOrder.addr))])])],1)]),r("div",{staticClass:"detail01"},[r("img",{attrs:{src:e("5fb3"),alt:""}}),r("span",[t._v("不开发票")])])])]),r("div",{staticClass:"buyers"},[r("div",{staticClass:"detail-title"},[r("img",{staticStyle:{"margin-right":"15px"},attrs:{src:e("779e"),alt:""}}),r("el-form-item",{staticStyle:{"margin-top":"22px"},attrs:{label:"买家:","label-width":"44px"}},[r("span",[t._v(t._s(t.dataForm.nickName))])])],1),r("div",{staticClass:"buyers-info"},[r("div",{staticClass:"detail02"},[r("img",{attrs:{src:e("06b9"),alt:""}}),r("div",{staticClass:"text-width"},[r("span",[t._v("买家備注:")]),r("br"),r("span",[t._v(t._s(t.dataForm.remarks))])])])])])]),r("div",{staticClass:"item-list"},[r("el-table",{attrs:{data:t.dataForm.orderItems,border:""}},[r("el-table-column",{attrs:{prop:"",label:"商品"},scopedSlots:t._u([{key:"default",fn:function(a){return[r("div",{staticClass:"prod-con"},[r("img",{staticClass:"prod-img",attrs:{src:t.resourcesUrl+a.row.pic}}),r("span",[t._v(t._s(a.row.prodName))])])]}}])}),r("el-table-column",{attrs:{prop:"price",label:"单价",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[r("span",[t._v(t._s(a.row.price))])]}}])}),r("el-table-column",{attrs:{prop:"count",label:"數量",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[r("span",[t._v(t._s(a.row.prodCount))])]}}])}),r("el-table-column",{attrs:{prop:"totalPrice",label:"总价",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[r("span",[t._v(t._s(a.row.productTotalAmount))])]}}])})],1)],1),r("div",{staticClass:"item-info"},[r("el-form-item",{attrs:{label:"商品总价:"}},[r("span",{staticClass:"text"},[t._v("￥"+t._s(t.dataForm.total))])]),t.dataForm.freightAmount?r("el-form-item",{attrs:{label:"配送费用:"}},[r("span",{staticClass:"text"},[t._v("￥"+t._s(t.dataForm.freightAmount))])]):t._e(),r("el-form-item",{attrs:{label:"应付金額:"}},[r("span",{staticClass:"text"},[t._v("￥"+t._s(t.dataForm.actualTotal))])])],1)])]),r("div",{staticClass:"order-log"},[r("div",{staticClass:"log-title"},[r("span",[t._v("訂單日志")])]),r("div",{staticClass:"log-cont"},[t.dataForm.orderTime?r("el-form-item",{attrs:{"label-width":"10px"}},[r("span",[t._v(t._s(t.dataForm.orderTime)+" "+t._s(t.dataForm.nickName)+" 创建訂單（成功）")])]):t._e(),t.dataForm.updateTime?r("el-form-item",{attrs:{"label-width":"10px"}},[r("span",[t._v(t._s(t.dataForm.updateTime)+" "+t._s(t.dataForm.nickName)+" 訂單更新（成功）")])]):t._e(),t.dataForm.payTime?r("el-form-item",{attrs:{"label-width":"10px"}},[r("span",[t._v(t._s(t.dataForm.payTime)+" "+t._s(t.dataForm.nickName)+" 訂單付款（成功）")])]):t._e(),t.dataForm.dvyTime?r("el-form-item",{attrs:{"label-width":"10px"}},[r("span",[t._v(t._s(t.dataForm.dvyTime)+" "+t._s(t.dataForm.nickName)+" 訂單發貨（成功）")])]):t._e(),t.dataForm.finallyTime?r("el-form-item",{attrs:{"label-width":"10px"}},[r("span",[t._v(t._s(t.dataForm.finallyTime)+" "+t._s(t.dataForm.nickName)+" 完成訂單（成功）")])]):t._e(),t.dataForm.cancelTime?r("el-form-item",{attrs:{"label-width":"10px"}},[r("span",[t._v(t._s(t.dataForm.cancelTime)+" "+t._s(t.dataForm.nickName)+" 取消訂單（成功）")])]):t._e()],1)])])])]),t.devyVisible?r("devy-add",{ref:"devyAdd",on:{refreshDataList:t.getDataList}}):t._e()],1)},i=[],s=e("40d9"),d={data(){return{visible:!1,dataForm:{orderId:0,orderNumber:"",remarks:"",total:0,actualTotal:0,dvyType:"",status:1,addrOrderId:0,nickName:"",orderItems:[],orderTime:"",updateTime:"",payTime:"",dvyTime:"",finallyTime:"",cancelTime:"",userAddrOrder:{}},resourcesUrl:"http://43.142.163.14:8081/images/",addOrUpdateVisible:!1,devyVisible:!1}},components:{DevyAdd:s["default"]},watch:{visible:function(){this.visible||(this.devyVisible=!1,this.addOrUpdateVisible=!1)}},computed:{stepsStatus:function(){return this.dataForm.finallyTime?4:this.dataForm.dvyTime?3:this.dataForm.payTime?2:this.dataForm.orderTime?1:void 0}},methods:{init(t){this.dataForm.orderNumber=t||0,this.visible=!0,this.$nextTick(()=>{this.$refs["dataForm"].resetFields()}),this.dataForm.orderNumber&&this.$http({url:this.$http.adornUrl("/order/order/orderInfo/"+this.dataForm.orderNumber),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm=t})},getDataList(){this.$http({url:this.$http.adornUrl("/order/order/orderInfo/"+this.dataForm.orderNumber),method:"get",params:this.$http.adornParams()}).then(({data:t})=>{this.dataForm=t})},dataFormSubmit(){},changeOrder(t){this.devyVisible=!0,this.$nextTick(()=>{this.$refs.devyAdd.init(t,this.dataForm.dvyId,this.dataForm.dvyFlowId)})},changeRemarks(){},changeAddr(t){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t)})}}},l=d,o=(e("87f9"),e("2877")),n=Object(o["a"])(l,r,i,!1,null,null,null);a["default"]=n.exports},"5ef9":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD4UlEQVRoQ+2ZQYgcRRSG39+TWYZGdEWFsInaahAJhIC5JCIYIigeIrk46kFBIYzksLhxupoRQwoMTHf1sIEF0RUlFxVZPIgHhYBGBdGLievBBQmZBTcEc5DFw/ZgdvpJhZ5lGHum7d6GzEDXbXj1/ve+96prurpAEz4w4flTAXCrO1h0oOjANiuwtYQ8z9ttGMbhMAwfIKLSNnVTuwPYEEKotI43AVzXrQL4EMBtaQVynP+XEOKutHpotVp7u93uMoAdaZ1znp8NQCn1BREdzTmZLHKZAa4R0c4sEXP2yQzAOSeSVa4AyFq5vPyKDuRVyUw6zLwJ4Ichzr8IIV6Ps0EpNS4PcRL4cSHEB4OTJgaAmTulUulAvV7/rR9inAACZo57F3ocwJM6aWa+HATBfinlRg9inABidyEppWma5s9E9EgEseQ4zvMTA6ATbTabewzDuNR72WTmVx3HOadtY9+BXqV93z/KzPq9TS+lThiG+xqNxuWJAdCJK6VaRPRGBLESBMGjEwUgpdxhmub3RHQogjg3TgBJ/wOx9gIgU9lydCo6kGMxM0kVHchUthyd/lcHmPl3IjoPoEJEzxDRrhxz6Je6SkRf6X9aInoKwMNJcRIBmPnj6enpV2q12g0t5rruHQC+BPBYknhK+3eVSuXZ2dnZv7Xf4uJieX19/SMA1VE6IwGY+c8gCCwppa7I1nBdd59hGL+mTHDk9HK5PDM3N6c/8WyNZrN5p2EYawDMYc5JHTgvhHg6ztnzvKsAZnKCaAshHozTUkp9S0RPDAUYNHiedxbAzfMnM19wHOfIEOG1vmfhhBDi3TQwnuedAPBOFGfNcZx7h8S5QESHI9tZIcTJ/nn/ueDwfb/GzO9FwhtTU1N7Blvred5BAD/2hPSJybbtb9IA+L5/hJm/7vkw8yHHcX4aWKr3AVjpLSEAr9m2vTgSYH5+ftfm5mabiMoRxHIYhscajcaq/t1qtQ50u93PAeyOhK5bljVTrVa7aQCWlpZK7Xb7GoB7el0olUrH6vW6Pn3pQ4xlGIaOsz/SvVEul+8fLGbsFZNS6i0iersvIZ3cCjNXADykD0J9lXvOcZzP0iTfm6uU0kfDT/t89ReSK0Skz8d7ARh9tlNCiDODcYbekSmlPiGiF0ckpoMJIYQ+ZGQenudJAKcTBN4XQtTi5gwF0C1eXV09w8yzMdvYHwBetm1b7xDbHq7rngTwJoDBC451Zj4+qsOJt5QLCwu3dzqdlwDcHYah3pMvWZa1nHbNJ1FKKSumab7AzBYRXSeii0EQXJRS/jPKNxEgKfCtthcARQe2WYGJX0L/AkSdr8A9Fw97AAAAAElFTkSuQmCC"},"5fb3":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFY0lEQVRoQ+1afYhUVRQ/587O7tqa7S6UlomGX4kgZRSGVoR9QVj+00a4UTvOu/eNYShI9AUt9EdBH8Smu3Pf7K5Ui9QYWGRhEa0REkYRWn6WH1haZjlb0RY7M+8Xd3kjb8cZ52PXcYt5/82753fO+Z1z5t3z7nlM//GLs/3XWs8UQkwz9wOBwLFQKHQ4H8fu7u5rAVziX0+n0wnbtnflw/j1Z2RSqdR3kUjk+Dns3ADgIrOeTCZ3rVq1KpGRPUNAay2Z+XEiuiqzCMBl5gVSyj3ZymOx2AMANuUyCmCFUuqsNcdx5gPYzcwiC/cXgNlKqZ+y9TmOs46IXvD5ZJx/rba29om2trZ/hglorePMfJ8ndISIjgGYwsxzAbwnpbyXmeFXrrX+jJmXAPiGmU+bNQCTmNlkZT8RXaeUGvRjHMfpIKLVAA4x848eZhYzTwXQrZSy/PLxeDyQSCT2MfNsAJ8TUbPxyZPZKqVcxtFotFUI8QYRDQC4Sym10wh0dXVNFULsZ+aJAN4H8Jht23s7OzubampqXiSiEIBfGhoaZre2tv5hMPF4fEIikdjLzDMAfC2EWGdZ1ifxeLx2YGBgLRE9Z6pACDE/HA5/bzDRaPRmIcSnHplNrus+FYlEjsZiscmu60aZeTmAnUqpRUbGcZzbiOgdImpwXTfEjuN8RES3A1irlHrFHwGP3OtENJwpALuYeR4R1QJIArjHtu1tfkwsFrsJgNFZ72FMNq40gfDkHpFSdmZlxpSIKRVzpYnIlOx88zckotMAFiuljJ7hy1dW21lrfcREzHXd623b/jK7BrXWy5n5GSK6xre2g5mftixre7a8+R2LxRYBeJ6IbsmsAzCZeVZK+WYujNZ6DTOvIaLpHvEUM28LBALrVq5cecCP6e7unu667lEAx00GfiaiyQDm+VlmG+nq6rosGAzOSKfTB5RSv+dyIvteX1/fpMHBwbnBYPCHtrY2Y6fg1dvbO21oaGhyc3PznpaWlr9zATZu3NiYTCYTAH4rmkBByxUUqBKoYLBzmqpmoJqBUUagrBJyHKcfwISmpqZb8z3etNbtRPSkEOJGy7K+GqWfeeFlEdBab2XmuwGsVkqtz9be09NzcTqdNh3lRCHEnEyrcD5IlEUgGo0uFUJ8TERHTpw4Mau9vd31O+fb3t+VUi4/H45ndJZFwOtBTJ+/wHSulmW9nVHY399fc/DgwaOmqxRCLAmHwzvGBQGtdcS0GT5nljDzUtPXENFm3/0ZzPwQEf0J4OXMfSHEF5ZlfZCn91kohJhUiCgz/xoOh7/1yxWVgZ6eniu8mi5kI+86gMNKqZnZAlrrq5l5XzGKzUtVMBicEgqFTpVcQjky4Le5jJkXEtEW85aVy5l8GdiwYcPEYDDYR0SNRZA41djYuKKlpWWoZALnUu44jkNEluu6D9q2bZyp2FVUCRXypkqgUITOsV7NgLcnjO//QEdHR11dXZ3ZnKaUm23zcq+UujMbbx7RqVTKHJfk2wdelVI+ms9uUSVkCNTX15sTCf9GdkYngDnMfLk5A2Lmk3mMnZRS3p+HgHnJH3Gq55NbL6VcPSoChaJefQoVilD1KVQgQtUSGgclZJszYNNemwPcUfhTMrSox2gxWnt7ey/1t7nFYMZCZswIjIUz5eioEignamOJqWZgLKNZjq7/VwYyIyYAizIDvnKiUknMiAxorT9k5jsAvKSUygzaKulPybZGEMiMWb2pozlheKtkjRUGjCBgbGutt5h5rOfH8KC7wj6Vaq6GiBYPD/kM0htEmyH0w2YaXqq2Cyi/e8THHiY1qVTKPw++gL4VNh0IBA6d9bVKYdj4kvgXBD3nkixE2JQAAAAASUVORK5CYII="},"779e":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFfElEQVRoQ+2Zf4iURRjHn2f23fXuQmoR66RCMPwnsrQktDS6MiVTK5MN9Ojau52Z885O6YcRGV1RkUFRKt3OvOtdXFCwRQSigoaXEGpZkGJEmqUEZYXtktKdd7vvE1O7sHfs3t4774kI9/63zDzP9/nMM/PMj0W4zD+8zOOHCYBLncGJDJTLQHd399ShoaEZiHg+HA6fjMfjAxcrU+OWgWQyOR8R2wBgMSJeXRIwAUAfALzLOf8EEc3vcfsCAyil6gBgGyLGxxDVNwCQEEJ8O4a+Y+oSCKCnp6d+cHBwLyLeNCa1/zsNENFjUsqPfNhU7GoNsGXLlkk1NTWHAGC2RSBERCullJ9a2A4zsQbQWr8NAOttAyCifsdx5rS0tPxg68PYWQF0dXVdyxj7GRHDQcSJ6KCU8o4gPqwAtNabAWBjEOES29uFEIdtfVkBKKVOIuIMW9ERdi8LIV609eUboK+vzzlx4sSQreBIOyLaKaVcZuvPN0AqlZrued4pW8EyAEeklDaV7D9XlxwAAI4KIW6xHRDfAOl0ujaTyZxHRGYrWmpHRHuklEtsffkGMEJKqaOIOMtWtNQOEV/lnG+y9WUF4LruK0T0vK3oCIAbOeff2/qyAuju7p6Ry+WOA0DIVtjYEdEOKeWKID6sAIyg1vpNAHjSVpyI/gGAm6WUJ219WFWholg6nQ5ls9mdAGC1ABGxiXPeGyT4QACFxRxGxA8AYJWPQAYBYJ0QwvVhU7Gr9RQqeiQi1Fq/Zk6miFhbJajPiKg16LQZVgSCjoLZF7LZ7N0AECOiNYj4FxGdRcSzAOABQJiIzE57AQC6EHGPEGJ/UN2ivXUGent7r+jv738CEZ8BgC+JSEej0R2xWCw/MjilVJgxNs/zvHsBYLkBQ8T1QogDQUGsAFzXXUhE5kq4nzG2MZFInPYTSCqVujOfzy+UUr7ux65cX98ASqkNiNiBiAnO+b6gAXR2drL6+voHGGNzAeBWAJhMRKcYY0nOubmyjvr5AlBKvYCIS+vq6pY0Njb+Xc15tXal1A2I2EVEB2pqarY2NTWZdQPJZHIuIj4HAFfmcrmH2tvbz1fyNWYArfXjRNQYjUaXx2Kx/mrBVWvXWs8moq2MsVWc89/L9ddaLyOiDQBwv5Sy7B1kTACu695GRO8QUUMlR9UCLm1Pp9ORTCbzdSQSWRyPx8+MZqu1Xk9E10spn7ZaA0Ysm80edhzn4ebm5p/8BFqpr9a6GQCuEkK8ZfoopRIAcN2w+o6409yVzRqZNm3akUgkcl852KoZUEqZU+eAlNKcfcbl01rvCIVCq1taWs4VHSql2hljuzzPW4WIvxDR4eKGV8jCn1JKs+sP+0YFKIz+8VAoNKtULCiF1voLIcSCkuAXIOJ0xthuz/PMWvtQSvlbSftixth8zvlLvgAKqZ0tpVwXNOhS+1IAcyjMZDKmuk0p7ODziOgQY+wY5/xjY6e1XkREC6SUnX4BdjPGNnPOPx9ngF25XG5NW1tbpmSUzcHwWQMRCoX2JhKJH4tthSn0a7n31IpTqFApzkSj0anljgdBgJRS5vjhFdeVqfuMsakDAwP7Ojo6LpinesdxziUSiWOFw+JXjuPcU24aVwRwXdek8g0hxF1Bgi1nu3379sn5fP5gOBxeVK2MKqU6AOAaKWXZK+xoAA96nmeewR8ZbwDjL5VKzfE8b2s+n1+5du3aP8ppuK671PM884C8zPdGZhYwIpp3S3ExAAr131Si9xhj70cikW2lRwnG2FMAcHrmzJmbGhoacpViqJgBrfUKz/OmtLa29lwsAOPX/M9QW1v7KBGtBoBJAHCKiI4g4l4hxHfVtKtuZNUcXOr2CYCJDAQcgYkpFHAAA5v/C9OZP0/1lRg5AAAAAElFTkSuQmCC"},"87c6":function(t,a,e){"use strict";e("20c2")},"87f9":function(t,a,e){"use strict";e("e77a")},c542:function(t,a){t.exports="data:image/png;base64,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"},cb27:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"mod-order-order"},[e("avue-crud",{ref:"crud",attrs:{page:t.page,data:t.dataList,option:t.tableOption},on:{"search-change":t.searchChange,"selection-change":t.selectionChangeHandle,"on-load":t.getDataList},scopedSlots:t._u([{key:"menu",fn:function(a){return[t.isAuth("order:order:update")&&2==a.row.status?e("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return t.cancelOrder(a.row.orderNumber)}}},[t._v("取消")]):t._e()]}}])},[e("template",{slot:"menuLeft"},[e("avue-crud",{attrs:{data:t.totalData,option:t.totalOption},scopedSlots:t._u([{key:"hun",fn:function(a){return[e("el-tag",{attrs:{type:"success"}},[t._v(t._s(a.row.hun))])]}},{key:"su",fn:function(a){return[e("el-tag",{attrs:{type:"success"}},[t._v(t._s(a.row.su))])]}},{key:"rice",fn:function(a){return[e("el-tag",{attrs:{type:"success"}},[t._v(t._s(a.row.rice))])]}}])})],1),e("template",{slot:"menuRight"},[t.isAuth("order:order:waitingConsignmentExcel")?e("el-button",{staticStyle:{"max-height":"45px"},attrs:{type:"primary",size:"small"},on:{click:function(a){return t.getSoldExcel()}}},[t._v("導出訂單")]):t._e()],1)],2)],1)},i=[];const s={border:!0,selection:!1,index:!1,indexLabel:"序号",stripe:!0,menuAlign:"center",menuWidth:200,align:"center",refreshBtn:!1,columnBtn:!1,searchBtn:!1,searchSize:"mini",addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,props:{label:"label",value:"value"},column:[{label:"日期",prop:"orderUseDate",type:"datetime",format:"yyyy-MM-dd",valueFormat:"yyyy-MM-dd HH:mm:ss",searchSpan:12,search:!0,more:!0},{label:"員工資訊",children:[{label:"廠區",prop:"attr2",type:"select",search:!0,dicData:[{value:"新樂",label:"新樂"},{value:"新仁",label:"新仁"}]},{label:"部門",prop:"deptName",width:250,type:"select",search:!0},{label:"員工",prop:"realName",width:150,search:!0},{label:"工號",prop:"userId",search:!0}]},{label:"點餐資訊",children:[{label:"餐點",prop:"attr1",type:"select",dicData:[{value:"素食",label:"素食"},{value:"葷食",label:"葷食"}]},{label:"是否加飯",prop:"isAddRice",type:"select",dicData:[{label:"否",value:"0"},{label:"是",value:"1"}],search:!0}]},{label:"點/取餐資訊",children:[{label:"餐點狀態",prop:"status",type:"select",dicData:[{value:2,label:"已訂"},{value:3,label:"已使用"},{value:6,label:"已取消"}],search:!0},{label:"預定時間",prop:"createTime",type:"datetime"},{label:"取餐時間",prop:"clockedTime"}]}]};var d=e("4fac"),l=e("f2dd"),o={data(){return{totalObj:{},totalData:[{fatory:"新樂厰",hun:this.dataSum?this.dataSum.totalHun2:0,su:this.dataSum?this.dataSum.totalSu2:0,rice:this.dataSum?this.dataSum.totalRice2:0},{fatory:"新仁厰",hun:this.dataSum?this.dataSum.totalHun1:0,su:this.dataSum?this.dataSum.totalSu1:0,rice:this.dataSum?this.dataSum.totalRice1:0},{fatory:"總數",hun:this.dataSum?this.dataSum.totalHun:0,su:this.dataSum?this.dataSum.totalSu:0,rice:this.dataSum?this.dataSum.totalRice:0}],totalOption:{border:!1,menu:!1,refreshBtn:!1,columnBtn:!1,searchBtn:!1,addBtn:!1,editBtn:!1,delBtn:!1,viewBtn:!1,page:!1,align:"center",menuAlign:"center",column:[{label:"廠區",prop:"fatory"},{label:"葷食",prop:"hun"},{label:"素食",prop:"su"},{label:"加飯",prop:"rice"}]},tableOption:s,dataForm:{},dateRange:[],factoryOptions:[{value:"新樂",label:"新樂"},{value:"新仁",label:"新仁"}],foodTypeOptions:[{value:"素食",label:"素食"},{value:"葷食",label:"葷食"}],options:[{value:2,label:"已訂"},{value:3,label:"已使用"},{value:6,label:"取消"}],resourcesUrl:"http://43.142.163.14:8081/images/",dataList:[],dataSum:{},page:{total:0,currentPage:1,pageSize:10},dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,consignmentInfoVisible:!1}},components:{AddOrUpdate:d["default"],ConsignmentInfo:l["default"]},activated(){this.getDataList(this.page)},methods:{cancelOrder(t){null!=t?this.$http({url:this.$http.adornUrl("/order/order/cancel/"+t),method:"get",data:this.$http.adornData({orderNumber:t})}).then(({data:t})=>{this.$message({message:"取消成功",type:"success",duration:1e3,onClose:()=>{this.getDataList(this.page)}})}):this.$message({message:"取消失敗",type:"error",duration:1e3})},getDataSum(t){this.$http({url:this.$http.adornUrl("/order/order/sum"),method:"get",params:this.$http.adornParams(Object.assign({attr1:""==this.dataForm.foodType?null:this.dataForm.foodType,attr2:""==this.dataForm.factory?null:this.dataForm.factory,isAddRice:""==this.dataForm.richAdd?null:this.dataForm.richAdd,deptName:""==this.dataForm.deptName?null:this.dataForm.deptName,realName:""==this.dataForm.realName?null:this.dataForm.realName,orderNumber:""==this.dataForm.orderNumber?null:this.dataForm.orderNumber,status:""==this.dataForm.status?null:this.dataForm.status,startTime:void 0==this.dateRange?null:this.dateRange[0],endTime:void 0==this.dateRange?null:this.dateRange[1]},t),!1)}).then(({data:t})=>{this.dataSum=t,this.totalData=[{fatory:"新樂厰",hun:this.dataSum?this.dataSum.totalHun2:0,su:this.dataSum?this.dataSum.totalSu2:0,rice:this.dataSum?this.dataSum.totalRice2:0},{fatory:"新仁厰",hun:this.dataSum?this.dataSum.totalHun1:0,su:this.dataSum?this.dataSum.totalSu1:0,rice:this.dataSum?this.dataSum.totalRice1:0},{fatory:"總數",hun:this.dataSum?this.dataSum.totalHun:0,su:this.dataSum?this.dataSum.totalSu:0,rice:this.dataSum?this.dataSum.totalRice:0}]})},getDataList(t,a){t=void 0===t?this.page:t,this.dataListLoading=!0,this.getDataSum(a),this.$http({url:this.$http.adornUrl("/order/order/page"),method:"get",params:this.$http.adornParams(Object.assign({current:null==t?this.page.currentPage:t.currentPage,size:null==t?this.page.pageSize:t.pageSize,attr1:""==this.dataForm.foodType?null:this.dataForm.foodType,attr2:""==this.dataForm.factory?null:this.dataForm.factory,isAddRice:""==this.dataForm.richAdd?null:this.dataForm.richAdd,deptName:""==this.dataForm.deptName?null:this.dataForm.deptName,realName:""==this.dataForm.realName?null:this.dataForm.realName,orderNumber:""==this.dataForm.orderNumber?null:this.dataForm.orderNumber,status:""==this.dataForm.status?null:this.dataForm.status,startTime:void 0==this.dateRange?null:this.dateRange[0],endTime:void 0==this.dateRange?null:this.dateRange[1]},a),!1)}).then(({data:t})=>{this.dataList=t.records,this.page.total=t.total,this.dataListLoading=!1})},clearDatas(){this.dataForm={},this.dateRange=[]},sizeChangeHandle(t){this.page.pageSize=t,this.page.currentPage=1,this.getDataList(this.page)},currentChangeHandle(t){this.page.currentPage=t,this.getDataList(this.page)},selectionChangeHandle(t){this.dataListSelections=t},orderStatus(){},addOrUpdateHandle(t){this.addOrUpdateVisible=!0,this.$nextTick(()=>{this.$refs.addOrUpdate.init(t)})},deleteHandle(t){var a=t?[t]:this.dataListSelections.map(t=>t.orderId);this.$confirm(`确定进行[${t?"删除":"批量删除"}]操作?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$http({url:this.$http.adornUrl("/prod/spec/"+a),method:"delete",data:this.$http.adornData(a,!1)}).then(({data:t})=>{this.$message({message:"操作成功",type:"success",duration:1500,onClose:()=>{this.getDataList(this.page)}})})}).catch(()=>{})},showConsignmentInfo(){this.consignmentInfoVisible=!0,this.$nextTick(()=>{this.$refs.consignmentInfo.init()})},getWaitingConsignmentExcel(t){this.$http({url:this.$http.adornUrl("/order/order/waitingConsignmentExcel"),method:"get",params:this.$http.adornParams({consignmentName:t.consignmentName,consignmentMobile:t.consignmentMobile,consignmentAddr:t.consignmentAddr,startTime:null===this.dateRange?null:this.dateRange[0],endTime:null===this.dateRange?null:this.dateRange[1]}),responseType:"blob"}).then(({data:t})=>{var a=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});const e="待發貨信息整理.xls",r=document.createElement("a");"download"in r?(r.download=e,r.style.display="none",r.href=URL.createObjectURL(a),document.body.appendChild(r),r.click(),URL.revokeObjectURL(r.href),document.body.removeChild(r)):navigator.msSaveBlob(a,e)})},getSoldExcel(){this.$http({url:this.$http.adornUrl("/order/order/soldExcelNew"),method:"get",params:this.$http.adornParams(Object.assign({attr1:""==this.dataForm.attr1?null:this.dataForm.attr1,attr2:""==this.dataForm.attr2?null:this.dataForm.attr2,isAddRice:""==this.dataForm.richAdd?null:this.dataForm.isAddRice,deptName:""==this.dataForm.deptName?null:this.dataForm.deptName,realName:""==this.dataForm.realName?null:this.dataForm.realName,userId:""==this.dataForm.userId?null:this.dataForm.userId,orderNumber:""==this.dataForm.orderNumber?null:this.dataForm.orderNumber,status:""==this.dataForm.status?null:this.dataForm.status,startTime:void 0==this.dateRange?null:this.dateRange[0],endTime:void 0==this.dateRange?null:this.dateRange[1]}),!1),responseType:"blob"}).then(({data:t})=>{var a=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});const e="點餐信息整理.xls",r=document.createElement("a");"download"in r?(r.download=e,r.style.display="none",r.href=URL.createObjectURL(a),document.body.appendChild(r),r.click(),URL.revokeObjectURL(r.href),document.body.removeChild(r)):navigator.msSaveBlob(a,e)})},searchChange(t){this.dateRange=t.orderUseDate?t.orderUseDate:null,this.dataForm=t,this.getDataList(this.page,t)}}},n=o,m=(e("87c6"),e("2877")),u=Object(m["a"])(n,r,i,!1,null,null,null);a["default"]=u.exports},e77a:function(t,a,e){},f2dd:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-dialog",{attrs:{modal:!1,title:"请输入發貨信息","close-on-click-modal":!1,visible:t.visible,width:"38%"},on:{"update:visible":function(a){t.visible=a}}},[e("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"120px"},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.dataFormSubmit()}}},[e("el-form-item",{attrs:{label:"发件人姓名",prop:"consignmentName"}},[e("el-input",{attrs:{"controls-position":"right",label:"发件人姓名"},model:{value:t.dataForm.consignmentName,callback:function(a){t.$set(t.dataForm,"consignmentName",a)},expression:"dataForm.consignmentName"}})],1),e("el-form-item",{attrs:{label:"發貨人手机号",prop:"consignmentMobile"}},[e("el-input",{attrs:{"controls-position":"right",label:"發貨人手机号"},model:{value:t.dataForm.consignmentMobile,callback:function(a){t.$set(t.dataForm,"consignmentMobile",a)},expression:"dataForm.consignmentMobile"}})],1),e("el-form-item",{attrs:{label:"發貨地址",prop:"consignmentAddr"}},[e("el-input",{attrs:{"controls-position":"right",label:"發貨地址"},model:{value:t.dataForm.consignmentAddr,callback:function(a){t.$set(t.dataForm,"consignmentAddr",a)},expression:"dataForm.consignmentAddr"}})],1)],1),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{size:"small"},on:{click:function(a){t.visible=!1}}},[t._v("取消")]),e("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},i=[],s={data(){return{visible:!1,dataForm:{consignmentName:"",consignmentMobile:"",consignmentAddr:""},dataRule:{consignmentName:[{required:!0,message:"不能为空",trigger:"blur"}],consignmentMobile:[{required:!0,message:"不能为空",trigger:"blur"}],consignmentAddr:[{required:!0,message:"不能为空",trigger:"blur"}]}}},methods:{init(t,a,e){this.visible=!0,this.$nextTick(()=>{this.$refs["dataForm"].resetFields()})},dataFormSubmit(){this.$refs["dataForm"].validate(t=>{t&&(this.visible=!1,this.$emit("inputCallback",this.dataForm))})}}},d=s,l=e("2877"),o=Object(l["a"])(d,r,i,!1,null,null,null);a["default"]=o.exports}}]);