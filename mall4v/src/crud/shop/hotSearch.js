export const tableOption = {
  border: true,
  index: false,
  selection: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [
    {
      label: '热搜标题',
      prop: 'title',
      search: true
    },
    {
      label: '热搜内容',
      prop: 'content',
      search: true
    },
    {
      label: '录入時間',
      prop: 'recDate',
      sortable: true
    },
    {
      label: '順序',
      prop: 'seq',
      sortable: true
    },
    {
      label: '启用狀態',
      prop: 'status',
      type: 'select',
      slot: true,
      search: true,
      dicData: [
        {
          label: '未启用',
          value: 0
        }, {
          label: '启用',
          value: 1
        }
      ]
    }
  ]
}
