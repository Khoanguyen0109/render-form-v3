import { Checkbox, Table } from 'antd';
import React, { useEffect, useState } from 'react';

function RadioGroup(props) {
  const { value, option, onChange } = props;
  const dataSource = option ? option.map((item) => ({ name: item })) : [];
  const [data, setData] = useState(value);

  useEffect(() => {
    const defaultValue = {};
    option.forEach((item) => {
      defaultValue[item] = false;
    });
    onChange(defaultValue);
  }, []);
  const onCheck = (key, checked) => {
    setData((pre) => ({
      ...pre,
      [key]: checked,
    }));
    onChange({
      ...value,
      [key]: checked,
    });
  };
  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Kiểm tra',
      dataIndex: 'check',
      key: 'check',
      render: (_, record) => (
        <Checkbox checked={data?.[record?.name]} onChange={(e) => onCheck(record.name, e.target.checked)} />
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
}

export default RadioGroup;
