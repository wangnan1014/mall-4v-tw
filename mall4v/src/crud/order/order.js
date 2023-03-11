export const tableOption = {
    border: true,
    selection: false,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 100,
    align: 'center',
    refreshBtn: false,
    columnBtn:false,
    searchBtn:false,
    searchSize: 'mini',
    addBtn: false,
    editBtn: false,
    delBtn: false,
    viewBtn: false,
    props: {
      label: 'label',
      value: 'value'
    },
    column: [
    {
        label: '預定日期',
        prop: 'orderUseDate',
        type:'date',
        format: 'yyyy-MM-dd',                  // 这是组件展示的日期格式
        valueFormat: 'yyyy-MM-dd HH:mm:ss',        // 这是组件value值的格式
        // searchValue: [this.dateRange[0], this.dateRange[1]],      // 这是我获取的默认的显示日期，我这里是['2020-08-04', '2020-09-22']
        searchSpan:12,
        // searchRange:true,                      
        // searchClearable: false,
        search:true,
        more:true,
    },
    {label:'員工資訊',
      children:[{
      label: '廠區',
      prop: 'attr2',
      type: 'select',

      search: true,
      dicData:[
        {value: '新樂',
        label: '新樂'},
        {value: '新仁',
        label: '新仁'}
      ]
    }, {
      label: '部門',
      prop: 'deptName',
      width:250,
      // type: 'select',
      search: true,
    },{
      label: '員工',
      prop: 'realName',
      width:150,
      search: true
    }, {
      label: '工號',
      prop: 'userId',
      search: true
    }]},
    //  {
    //   label: '卡號',
    //   prop: 'status',
    
    // },
    {label:'點餐資訊',
      children:[
    {
        label: '餐點',
        prop: 'attr1',
        type: 'select',
        dicData: [
            {value: '素食',
            label: '素食'},
            {value: '葷食',
            label: '葷食'}
        ],
    },
    {
        label: '是否加飯',
        prop: 'isAddRice',
        type: 'select',
        dicData: [
            {
            label: '否',
            value: '0'
            }, {
            label: '是',
            value: '1'
            }
        ],
       search: true
    }
    ]}
    ,
    {label:'點/取餐資訊',
    children:[
    {
        label: '餐點狀態',
        prop: 'status',
        type: 'select',
        dicData: [
          {  
                value: 2,
                label: '已訂'
            },
            {
                value: 3,
                label: '已使用'
            },
            {
                value: 6,
                label: '已取消'
            },
        ],
        search: true
    },
    {
        label: '訂餐時間',
        prop: 'createTime',
        type:'datetime',
    },
    {
        label: '取餐時間',
        prop: 'clockedTime',
    }]}

    ]
  }
  