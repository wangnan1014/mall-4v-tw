export const tableOption = {
  border: true,
  selection: true,
  index: false,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    label: '產品名字',
    prop: 'prodName',
    search: true
  }, 
  // {
  //   label: '商品原價',
  //   prop: 'oriPrice'
  // }, 
  {
    label: '商品現價',
    prop: 'price'
  }, 
  {
    label: '商品庫存',
    prop: 'totalStocks'
  },
  //  {
  //   label: '產品图片',
  //   prop: 'pic',
  //   type: 'upload',
  //   width: 150,
  //   listType: 'picture-img'

  // },
   {
    width: 150,
    label: '狀態',
    prop: 'status',
    search: true,
    slot: true,
    type: 'select',
    dicData: [
      {
        label: '未上架',
        value: 0
      }, {
        label: '上架',
        value: 1
      }
    ]
  }]
}
