export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [
    {
      label: '商品名',
      prop: 'prodName',
      search: true
    },
    {
      label: '用户昵称',
      prop: 'nickName',
      slot: true
    },
    {
      label: '记录時間',
      prop: 'recTime',
      width: '200'
    },
    {
      label: '回复時間',
      prop: 'replyTime',
      width: '200',
      dicData: [
        {
          label: '无',
          value: ''
        }
      ]
    },
    {
      label: '评价得分',
      prop: 'score'
    },
    {
      label: '是否匿名',
      prop: 'isAnonymous',
      dicData: [
        {
          label: '否',
          value: 0
        }, {
          label: '是',
          value: 1
        }
      ]
    },
    {
      prop: 'status',
      label: '审核狀態',
      search: true,
      type: 'select',
      dicData: [
        {
          label: '待审核',
          value: 0
        }, {
          label: '审核通过',
          value: 1
        }, {
          label: '审核未通过',
          value: -1
        }
      ]
    }
  ]
}
