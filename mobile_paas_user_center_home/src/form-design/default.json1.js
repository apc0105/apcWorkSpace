import FormConfig from './form-props/form-config';

export default {
  config: FormConfig.defaultValue(),
  'elements': [
    {
      'key': 'b0nYfCdHfwa87GXz',
      'display': 'block',
      'width': '100%',
      'labelWidth': '80px',
      'shown': 1,
      'labelAlign': 'right',
      'controlBorderWidth': 0,
      'controlBorderStyle': 'none',
      'type': 'fd-cascade',
      'name': '级联选择',
      'readonly': 0,
      'required': 0,
      'multiple': 0,
      'valueProp': 'key',
      'labelProp': 'label',
      'cascade': 3,
      'id': 'MdwXyLAZZh8YdI9gOjjP9Wvf6KaQNJzg',
      'remoteUrl': 'admin/dicts/async',
      'remoteAsync': 1,
      'options': [
        {
          'key': '1',
          'label': '选项一',
          '_id': 1566117107877,
          'childrens': [
            {
              'key': '11',
              'label': '11',
              '_id': 1566117122029,
              'childrens': [
                {
                  'key': '111',
                  'label': '111',
                  '_id': 1566117124399,
                  'childrens': []
                }
              ]
            }
          ]
        },
        {
          'key': '2',
          'label': '选项二',
          '_id': 1566117107878,
          'childrens': [
            {
              'key': '21',
              'label': '21',
              '_id': 1566117112166,
              'childrens': [
                {
                  'key': '211',
                  'label': '211',
                  '_id': 1566117116688,
                  'childrens': []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'key': 'RFHapOe7J0E5rJDG',
      'display': 'block',
      'width': '100%',
      'labelWidth': '80px',
      'shown': 1,
      'labelAlign': 'right',
      'controlBgColor': 'rgba(64,158,255,.1)',
      'controlBorderColor': '#EBEEF5',
      'controlBorderWidth': '1px',
      'controlBorderStyle': 'solid',
      'type': 'fd-layout',
      'cells': 2,
      'cellElement': [{ weight: 1, elementId: 'iIUMwCmIBph4ZEmwWD8WgYl6uiabZTDQ' }, { weight: 1 }],
      'id': 'kWUMNezN8Dn84hu8eCW1PO7iWeF7Scs9',
      'marginTop': '8px',
      'marginBottom': '8px',
      'marginLeft': '8px',
      'marginRight': '8px'
    },
    {
      'key': 'name',
      'display': 'block',
      'width': '100%',
      'labelWidth': '80px',
      'labelAlign': 'right',
      'type': 'fd-input',
      'name': '姓名',
      'readonly': 0,
      'autofill': 0,
      'required': 0,
      'digit': 0,
      'id': 'iIUMwCmIBph4ZEmwWD8WgYl6uiabZTDQ',
      'parentId': 'kWUMNezN8Dn84hu8eCW1PO7iWeF7Scs9',
      'number': 0,
      shown: 1
    }, {
      'key': 'Ia9xZmbqTZsQf1Up',
      'display': 'block',
      'width': '100%',
      'labelWidth': '80px',
      'labelAlign': 'right',
      'type': 'fd-select',
      'name': '性别',
      'readonly': 0,
      shown: 1,
      'required': 0,
      'multiple': 0,
      'itemBtnStyle': 0,
      'valueProp': 'key',
      'labelProp': 'label',
      'id': 'PDn58FyB1SEMtF4P5gnFWNspBY2ahqQ5',
      'options': [
        {
          'key': '1',
          'label': '选项一',
          '_id': 1565143450360
        },
        {
          'key': '2',
          'label': '选项二',
          '_id': 1565143450361
        }
      ],
      'dict': {
        'id': 1,
        'name': 'SSSSS'
      }
    }, {
      'key': 'VTxgeeWh6jAgKRSN',
      'display': 'block',
      name: '明细表格',
      'width': '100%',
      'labelWidth': '80px',
      'shown': 1,
      'labelAlign': 'right',
      // "controlBgColor": "#FFFFFF",
      // "controlBorderColor": "#EBEEF5",
      // "controlBorderWidth": "1px",
      // "controlBorderStyle": "solid",
      'type': 'fd-table',
      'columns': [
        {
          'weight': 1,
          '_id': 0
        },
        {
          'weight': 1,
          '_id': 1
        }
      ],
      'marginTop': '8px',
      'marginBottom': '8px',
      'marginLeft': '8px',
      'marginRight': '8px',
      'id': 'BrTn4tuc25ytDvIaD8nt9OKTwjawM899'
    }
  ]
}
