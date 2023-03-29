export const tableOption = {
  border: true,
  // selection: true,
  index: false,
  indexLabel: '序號',
  // stripe: true,
  menuAlign: 'center',
  menuWidth: 350,
  align: 'center',
  // refreshBtn: true,
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
    label: '參數名',
    prop: 'paramKey',
    search: true
  }, {
    label: '參數值',
    prop: 'paramValue'
  }, {
    label: '備注',
    prop: 'remark'
  }]
}
