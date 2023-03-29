  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year+'-'+month+'-'+day//[year, month, day].map(this.formatNumber).join('-') 
  }
  function getDates(days) {//獲取當前時間的未來7天
    days = days?days:7;
    var dd=new Date();
    dd.setDate(dd.getDate()+days);
    return formatDate(dd);
  } 
  export const tableOption = {
      border: true,
      index: true,
      indexLabel: '序号',
      // stripe: true,
      menuAlign: 'center',
      align: 'center',
      addBtn: false,
      editBtn: false,
      delBtn: false,
      viewBtn: false,
      searchSize: 'mini',
      column: [
      {
          label: '日期',
          prop: 'sme01',
          type:'date',
          format: 'yyyy-MM-dd',                  // 这是组件展示的日期格式
          valueFormat: 'yyyy-MM-dd HH:mm:ss',        // 这是组件value值的格式
          searchDefault: [formatDate(new Date())+" 00:00:00",getDates(30)+" 00:00:00"],      // 这是我获取的默认的显示日期，我这里是['2020-08-04', '2020-09-22']
          searchSpan:12,
          // searchRange:true,                      
          // searchClearable: false,
          search:true,
          more:true,
      },
      {label:'是否工作日',
        prop: 'sme02',
        type: 'select',
        search: true,
        dicData:[
          {value: 'Y',
          label: '是'},
          {value: 'N',
          label: '否'}
        ]
      }
      ]
    }