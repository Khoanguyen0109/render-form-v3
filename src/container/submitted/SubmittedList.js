import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import GridSubmit from './overview/GridSubmit';
import { SubmitHeader, SubmitSorting } from './style';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';

const { Search } = Input;

function SubmittedList() {
  const [search, setSearch] = useState('');
  const [formList, setFormList] = useState([]);
  const [defaultFormList, setDefaultFormList] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Tên biểu mẫu',
      dataIndex: 'formName',
      key: 'formName',
    },
    {
      title: 'Tên người tạo biểu mẫu',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
  ];

  const dataSource = [];

  const getForms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_END_POINT}/api/form-list`);
      setFormList(res.data.data);
      setDefaultFormList(res.data.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getForms();
  }, []);
  const onSearch = (value) => {
    // setSearch(value);
    if (value) {
      setFormList(
        defaultFormList.filter(
          (d) =>
            d.formName.toLowerCase().includes(value.toLowerCase()) ||
            d.username.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } else {
      setSearch('');
      setFormList(defaultFormList);
    }
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <SubmitHeader>
        <PageHeader ghost title="Biểu mẫu đã nộp" subTitle={<>Tổng số biểu mẫu đã nộp {formList.length}</>} />
      </SubmitHeader>
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <SubmitSorting>
              <div className="submit-sort-bar">
                <div className="submit-sort-search">
                  <Search
                    value={search}
                    onChange={onChange}
                    placeholder="Tìm kiếm biểu mẫu"
                    onSearch={onSearch}
                    style={{ width: '100%', marginBottom: '20px' }}
                  />
                </div>
              </div>
            </SubmitSorting>
            <div>
              {' '}
              <GridSubmit data={formList} loading={loading} />{' '}
            </div>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default SubmittedList;
