import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Select, Typography } from 'antd';

function AddressFromField(props) {
  const { type, value, onChange } = props;
  console.log('value', value);
  const [data, setData] = useState(value);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);
  const [location, setLocation] = useState('');
  const provinceAPI = 'https://provinces.open-api.vn/api';
  // const getData = async () => {
  //   try {
  //     const res = await axios.get(`${provinceAPI}/`);
  //     const map = res.data.map((item) => ({ id: item.code, value: item.name, label: item.name }));
  //     setProvince(map);
  //   } catch (error) {
  //     console.log('error :>> ', error);
  //   }
  // };
  const getDistrict = async () => {
    try {
      // const code = province.find((item) => item.value === data.province).id;
      const code = 48; /// Da Nang
      const res = await axios.get(`${provinceAPI}/p/${code}?depth=2`);
      const map = res.data.districts.map((item) => ({ id: item.code, value: item.name, label: item.name }));
      setDistrict(map);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  console.log('district :>> ', district);
  console.log('data.district', data.district);
  const getVillage = async () => {
    try {
      const code = district.find((item) => item.value === data.district).id;
      if (code) {
        const res = await axios.get(`${provinceAPI}/d/${code}?depth=2`);
        const map = res.data.wards.map((item) => ({ id: item.code, value: item.name, label: item.name }));
        setVillage(map);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    // if (data.province) {
    getDistrict();
    // }
  }, [data.province]);
  useEffect(() => {
    if (data.district) {
      getVillage();
    }
  }, [data.district, district]);

  const onChangeData = (key, value) => {
    setData((pre) => ({ ...pre, [key]: value }));
    onChange?.({
      ...data,
      [key]: value,
    });
  };
  console.log('data', data);
  return (
    <div>
      {/* <div style={{ marginBottom: '12px' }}>
        <Typography style={{ textAlign: 'left', fontWeight: '400', fontSize: '14px' }}>Tỉnh Thành</Typography>
        <Select
          value={data.province}
          onChange={(value) => {
            console.log('value :>> ', value);
            onChangeData('province', value);
          }}
          style={{ width: '100%' }}
          options={province}
        />
      </div> */}
      <div style={{ marginBottom: '12px' }}>
        <Typography style={{ textAlign: 'left', fontWeight: '400', fontSize: '14px' }}>Quận, Huyện</Typography>
        <Select
          value={data.district}
          onChange={(value) => {
            onChangeData('district', value);
          }}
          style={{ width: '100%' }}
          options={district}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <Typography style={{ textAlign: 'left', fontWeight: '400', fontSize: '14px' }}>Thôn, Xã</Typography>
        <Select
          value={data.village}
          onChange={(value) => {
            onChangeData('village', value);
          }}
          style={{ width: '100%' }}
          options={village}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <Typography style={{ textAlign: 'left', fontWeight: '400', fontSize: '14px' }}>Địa chỉ</Typography>
        <Input
          value={data.location}
          type="text"
          onChange={(e) => onChangeData('location', e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}

export default AddressFromField;
