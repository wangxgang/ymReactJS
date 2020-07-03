import React, { useEffect, useState } from 'react';
import { Tree, Table, Button } from 'antd';
import { CarryOutOutlined, FormOutlined, FileExcelFilled } from '@ant-design/icons';
import { getPerson, getOrganization } from '@/services/user'

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
];

const columns = [
  {
    title: 'personName',
    dataIndex: 'personName',
  },
  {
    title: 'gender',
    dataIndex: 'gender',
  },
  {
    title: 'orgPath',
    dataIndex: 'orgPath',
  },
  {
    title: 'orgPathName',
    dataIndex: 'orgPathName',
  },
  {
    title: 'orgIndexCode',
    dataIndex: 'orgIndexCode',
  },
  {
    title: 'orgName',
    dataIndex: 'orgName',
  },
  {
    title: 'certificateType',
    dataIndex: 'certificateType',
  },
  {
    title: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: 'certificateNo',
    dataIndex: 'certificateNo',
  },
];

const tableData = [];
for (let i = 0; i < 46; i++) {
  tableData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Demo = () => {
  useEffect(() => {
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }
    // 从服务器获取组织机构
    getOrganization().then(data => {
      let oData = data
      console.log(oData)
      setOrganizationData(oData || []);
      // 从服务器获取人员
      let parameters = {
        personName: '',
        orgIndexCodes: oData[0].orgIndexCode,
        pageNo: 1,
        pageSize: 12,
        isSubOrg: true
      }
      getPerson(parameters).then(data => {
        let tableData = data.list
        console.log(tableData)
        setTableData(tableData || []);
      })
    })
    
  }, []);

  const [showLine, setShowLine] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(false);
  const [oData, setOrganizationData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onSetLeafIcon = checked => {
    setShowLeafIcon(checked);
    setShowLine({
      showLeafIcon: false  //checked,
    });
  };

  const onSetShowLine = checked => {
    if (checked) {
      showLeafIcon
        ? setShowLine(checked)
        : setShowLine({
            showLeafIcon,
          });
    } else {
      setShowLine(checked);
    }
  };

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      {/* <div
        style={{
          marginBottom: 16,
        }}
      >
        showLine: <Switch checked={showLine} onChange={onSetShowLine} />
        <br />
        <br />
        showIcon: <Switch checked={showIcon} onChange={setShowIcon} />
        <br />
        <br />
        showLeafIcon: <Switch checked={showLeafIcon} onChange={onSetLeafIcon} />
      </div> */}
      <div className="left">
        <Tree
          showLine={showLine}
          showIcon={showIcon}
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
      <div className="right">
        <div className="right-head"></div>
        <div className="right-content">
          <Table columns={columns} dataSource={tableData} />
        </div>
      </div>
    </div>
  );
};

// ReactDOM.render(<Demo />, mountNode);
export default Demo;
