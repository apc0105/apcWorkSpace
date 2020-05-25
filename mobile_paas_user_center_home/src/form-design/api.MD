
GET  admin/dicts/list
params: { type }
result:
{
    code: 200,
    content: [
      { id: 1, value: '1', label: '选项1' },
      { id: 2, value: '2', label: '选项2' },
      { id: 3, value: '3', label: '选项3' },
    ]
  }
}

----------------------------------------------------------------------
GET admin/dicts/types  

params: 

{
    filter: { keyword: null },
    sort: {},
    pager: { current: 1, pageSize: 20, total: 0 },
    dataList: []
}
    
result:
{
    code: 200,
    content: {
      pager: { pageSize: 20, current: 1, total: 1 },
      sort: {},
      filter: {},
      dataList: [
        {
          id: 1,
          type: 'SSSSS'
        }, {
          id: 2,
          type: 'XXXX'
        },
      ],
    }
  }
}

----------------------------------------------------------------------
GET admin/dicts/async 【任意地址】[用于下拉框，单选等指定远程地址]

params :任意参数
result:
{
    code: 200,
    content: [
      { id: 1, value: '1', label: 'API选项1' },
      { id: 2, value: '2', label: 'API选项2,API选项2,API选项2' },
      { id: 3, value: '3', label: 'API选项3' },
    ]
  }
}

如果要支持 级联选择
url1:【懒加载方式，一次只加载一级的数据】
GET admin/dicts/cascade?level=1  获取一级选项
GET admin/dicts/cascade?level=2 & parentId=xx  获取二级选项
GET admin/dicts/cascade?level=3 & parentId=yy  获取三级选项

result:
{
    code: 200,
    content: [
      { id: 1, value: '1', label: 'API选项1' },
      { id: 2, value: '2', label: 'API选项2,API选项2,API选项2' },
      { id: 3, value: '3', label: 'API选项3' },
    ]
  }
}

url2:【一次加载所有的选择数据】
admin/dicts/cascades 

result:
[
  {
    "key": "1",
    "label": "选项一",
    "childrens": [
      {
        "key": "11",
        "label": "选项11",
        "childrens": [
          {
            "key": "111",
            "label": "选项111",
            "childrens": []
          }
        ]
      }
    ]
  },
  {
    "key": "2",
    "label": "选项二",
    "childrens": [
      {
        "key": "21",
        "label": "选项21",
        "childrens": [
          {
            "key": "211",
            "label": "选项211",
            "childrens": []
          }
        ]
      }
    ]
  }
]
