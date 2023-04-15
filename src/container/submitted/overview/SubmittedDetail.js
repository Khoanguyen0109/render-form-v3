/* eslint-disable prefer-destructuring */
import { Col, Row, Skeleton, Switch, Typography } from 'antd';
import axios from 'axios';
import { groupBy, mapValues } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NotificationWrapper } from '../detailStyle';
import { Cards } from '../../../components/cards/frame/cards-frame';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';

const { Paragraph } = Typography;

const listStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 0,
  padding: 0,
};
function SubmittedDetail() {
  const params = useParams();
  const { idFormTemplate, formId } = params;
  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getFormData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        // 'https://script.google.com/macros/s/AKfycbwc6zsfumMrVjMwaSnku8NZxL2t5WJjtBK2LlXSkzx1CGptTvtjc4EBl5sBxnYqXJdgXQ/exec'
        `${process.env.REACT_APP_API_END_POINT}/api/form-value/${formId}`,
      );
      const result = res.data.data;
      const map = {};
      result.forEach((item) => {
        map[item.idField] = item.value;
      });
      console.log('map :>> ', map);
      setFormData(map);
      setForm(res.data.form);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('formData :>> ', formData);
  useEffect(() => {
    getFormData();
  }, [formId]);

  return (
    <Main>
      <NotificationWrapper>
        {loading ? (
          <Cards
            title={
              <div className="setting-card-title">
                <Skeleton.Input />
              </div>
            }
          >
            <Row gutter={15}>
              <Col xs={24}>
                <div className="notification-box-single">
                  <div className="notification-body">
                    <Cards headless>
                      <nav>
                        <ul
                          style={{
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          <li style={listStyle}>
                            <div className="notification-list-single">
                              <Skeleton paragraph={{ rows: 1 }} style={{ width: '350px', height: '50px' }} />
                            </div>
                          </li>
                        </ul>
                      </nav>
                    </Cards>
                  </div>
                </div>
              </Col>
            </Row>
          </Cards>
        ) : (
          <Cards
            title={
              <div className="setting-card-title">
                <Heading as="h4">{form?.formName}</Heading>
                <span>Ngày tạo: {form?.created_date}</span>
              </div>
            }
          >
            <Row gutter={15}>
              <Col xs={24}>
                <div className="notification-box-single">
                  {/* <Cards headless bodyStyle={{ backgroundColor: '#F7F8FA', borderRadius: 10 }}> */}

                  <div className="notification-body">
                    <Cards headless>
                      <nav>
                        <ul
                          style={{
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          {Object.keys(formData)
                            .reverse()
                            .map((key) => {
                              return (
                                <li style={listStyle}>
                                  <div className="notification-list-single">
                                    <Heading className="notification-list-single__title" as="h4">
                                      <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                        {key}
                                      </Paragraph>
                                    </Heading>
                                    <p>{formData[key]}</p>
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </nav>
                    </Cards>
                  </div>
                  {/* </Cards> */}
                </div>
              </Col>
            </Row>
          </Cards>
        )}
      </NotificationWrapper>
    </Main>
  );
}

export default SubmittedDetail;
