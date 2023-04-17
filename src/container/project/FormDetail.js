import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Spin, Card, Button, Steps, Drawer } from 'antd';
import { Switch, Route, NavLink, useRouteMatch, useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import FeatherIcon from 'feather-icons-react';
import propTypes, { array } from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { groupBy, isEmpty, mapValues } from 'lodash';
import qs from 'qs';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { AddUser } from './overview/style';
import DetailTab from './overview/DetailTab';
import ReferForm from './ReferForm';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';

function FormDetail(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        // 'https://script.google.com/macros/s/AKfycbwc6zsfumMrVjMwaSnku8NZxL2t5WJjtBK2LlXSkzx1CGptTvtjc4EBl5sBxnYqXJdgXQ/exec'
        `${process.env.REACT_APP_API_END_POINT}/api/form-template`,
      );
      setData(res.data.data);
      const unique = [...new Map(res.data.data.map((item) => [item.id_form_template, item])).values()];
      setList(unique);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  const params = useParams();
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const formFields = data.filter((item) => item.id_form_template === params.formId);
  const formName = formFields[0]?.name_form;
  const onBack = () => {
    history.push('/admin');
  };
  const user = useSelector((state) => state.auth.login);
  const grouped = mapValues(groupBy(formFields, 'step'), (clist) => clist);
  //   var grouped = mapValues(groupBy(formFields, 'steps'), (clist) =>
  //   clist.map((item) => mapValues(groupBy(item, 'name_field'), (item) => item))
  // );

  const groupByField = Object.values(grouped).map((item) => groupBy(item, 'name_field'));

  const next = (value) => {
    setCurrent(current + 1);
    setFormData({ ...value, ...formData });
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const calculateTotalPointValue = (arr) => {
    if (arr.every((item) => item === 0)) {
      return 'Tốt';
    }
    if ([...new Set(arr)].every((item) => item === 0 || item === 1) && arr.filter((item) => item === 1).length === 1) {
      return 'Đạt';
    }
    return 'Không đạt';
  };

  const onSubmit = async () => {
    const formId = uuidv4();
    const mapCount = {};
    const rows = [];
    Object.keys(formData).map((key) => {
      if (key.includes('_count_')) {
        const countLabel = key.split('_count_')?.[1];
        console.log('countLabel', countLabel);
        // eslint-disable-next-line no-prototype-builtins
        if (mapCount.hasOwnProperty(countLabel)) {
          mapCount[countLabel].push(formData[key]);
        } else {
          mapCount[countLabel] = [formData[key]];
        }
      }
      if (typeof formData[key] === 'object' && formData[key] !== null) {
        Object.keys(formData[key]).map((key2) => {
          let key2Format = '';
          switch (key2) {
            case 'district':
              key2Format = 'Quận/Huyện';
              break;
            case 'village':
              key2Format = 'Thôn/Xã';
              break;
            default:
              key2Format = key2;
              break;
          }
          const rowItem = {
            id_form: formId,
            id_field: `${key}_${key2Format}`,
            value: formData[key][key2Format],
          };
          return rows.push(rowItem);
        });
      } else {
        const rowItem = {
          id_form: formId,
          id_field: key,
          name_field: key.replaceAll('_', ' '),
          value: formData[key],
        };
        rows.push(rowItem);
      }

      return {};
    });
    Object.keys(mapCount).map((key) => {
      const rowItem = {
        id_form: formId,
        id_field: key,
        value: calculateTotalPointValue(mapCount[key]),
      };
      return rows.push(rowItem);
    });
    const res = await axios.post(`${process.env.REACT_APP_API_END_POINT}/api/form`, {
      formId,
      formName,
      userId: user.id,
      userName: user.username,
      idFormTemplate: params.formId,
      data: rows,
    });
    setFormData({});
    enqueueSnackbar('Gửi biểu mẫu thành công', { variant: 'success' });
    history.push('/admin');
  };

  const steps = Object.values(groupByField).map((tab, idx) => {
    const isLast = idx === Object.values(groupByField).length - 1;
    console.log('isLast :>> ', isLast);
    return {
      content: <DetailTab idx={idx} items={tab} isLast={isLast} formData={formData} onSubmit={next} onBackTab={prev} />,
    };
  });
  console.log('current', current);

  useEffect(() => {
    console.log('group', Object.values(groupByField).length);
    if (current === Object.values(groupByField).length && !isEmpty(formData)) {
      onSubmit();
    }
  }, [current]);

  const addRows = () => {
    // const range = 'Form Sumit!A2';
    // const spreadsheetId = '1QChy36UZeI144jl5NrCASWJsi5s74M28F1iwfcYInnE';
    // const values = [];
    // serverFunctions.mainAppendData(values, spreadsheetId, range);
  };

  const items = Object.keys(groupByField).map((item, index) => ({
    key: index,
    // title: `Bước ${index + 1}`,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',

    marginTop: 16,
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer title="Biểu mẫu liên quan" placement="right" closable={false} onClose={onClose} open={open} size="large">
        <ReferForm open={open} data={data} list={list} />
      </Drawer>

      <PageHeader
        ghost
        title={formName}
        onBack={onBack}
        // buttons={[
        //   <Button onClick={showDrawer} type="primary" key="3">
        //     Tìm kiếm form liên quan
        //   </Button>,
        // ]}
      />

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Card title={<Steps size="small" className="" current={current} items={items} />}>
                {' '}
                {loading ? (
                  <div style={contentStyle}>
                    <Spin />
                  </div>
                ) : (
                  <div style={contentStyle}>{steps[current]?.content}</div>
                )}
              </Card>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default FormDetail;
