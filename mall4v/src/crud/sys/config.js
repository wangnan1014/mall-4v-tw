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
    label: '参数名',
    prop: 'paramKey',
    search: true
  }, {
    label: '参数值',
    prop: 'paramValue'
  }, {
    label: '備注',
    prop: 'remark'
  }]
}