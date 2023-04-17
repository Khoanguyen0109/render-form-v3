/* eslint-disable no-new-func */
/* eslint-disable no-eval */
import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, DatePicker, Radio } from 'antd';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { every, some, trim } from 'lodash';
import AddressFromField from './AddressFrom';
import RadioGroup from './RadioGroup';
import { BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import Heading from '../../../components/heading/heading';

const { Option } = Select;
const { TextArea } = Input;

function DetailTab(props) {
  const { items, formData, idx, isLast, onSubmit, onBackTab } = props;
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    console.log('values :>> ', values);
    onSubmit(values);
  };

  const formatLabel = (label) => {
    return label.replaceAll(',', '').replaceAll(' ', '_');
  };
  const switchItem = (i, index) => {
    const showLabel = index === 0;
    const name = showLabel ? formatLabel(i.name_field) : formatLabel(i.name_field) + index;
    const formatName = i.countingKey ? `${name}_count_${formatLabel(i.countingKey)}` : name;
    const itemProps = {
      label: showLabel && i.name_field,
      // name: i.id_field,
      name: formatName,
      initialValue: '',
      rules: [{ required: i.require === 'TRUE', message: 'Vui lòng nhập ô này' }],
      // hidden: mapLevel1.length > 0 && !some(mapLevel1),
      // eslint-disable-next-line no-eval
      // hidden: i.condition_true !=='' ? eval(i.condition_true) : false
    };
    switch (i.field) {
      case 'input':
        return (
          <Form.Item {...itemProps}>
            <Input placeholder={i.placeholder} type={i.type} />
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item {...itemProps}>
            <Select style={{ width: '100%' }}>
              {i.option.split('/').map((option, index) => (
                <Option key={option} value={index}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      case 'date':
        return (
          <Form.Item {...itemProps}>
            <DatePicker />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item {...itemProps}>
            <Radio.Group>
              {i.option.split('/').map((option, index) => (
                <Radio key={option} value={index}>
                  {' '}
                  option{' '}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );

      case 'text-area': {
        return (
          <Form.Item {...itemProps}>
            <TextArea rows={4} />
          </Form.Item>
        );
      }
      case 'address': {
        return (
          <Form.Item {...itemProps}>
            <AddressFromField />
          </Form.Item>
        );
      }
      case 'checkbox-table': {
        return (
          <Form.Item {...itemProps} required={false} rules={{ required: false }}>
            <RadioGroup option={i.option.split('/')} />
          </Form.Item>
        );
      }
      default:
        break;
    }
  };
  const renderItem = (item) => {
    if (item.length > 1) {
      return (
        <div>
          {item.map((i, index) => {
            return switchItem(i, index);
          })}
        </div>
      );
    }
    return item.map((i, index) => {
      return switchItem(i, index);
    });
  };

  return (
    <Row justify="center">
      <Col xl={10} md={16} xs={24}>
        <div className="user-info-form">
          <BasicFormWrapper>
            <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit} initialValues={formData}>
              {Object.values(items).map((item) => renderItem(item))}

              <Form.Item>
                <div className="add-user-bottom text-right">
                  {idx !== 0 && (
                    <Button
                      className="ant-btn ant-btn-light"
                      onClick={() => {
                        onBackTab();
                      }}
                    >
                      Trờ lại
                    </Button>
                  )}
                  <Button htmlType="submit" type="primary">
                    {isLast ? 'Hoàn tất' : 'Tiếp'}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </div>
      </Col>
    </Row>
  );
}

export default DetailTab;
