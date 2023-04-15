import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col, Pagination, Skeleton } from 'antd';
import GridCard from './GridCardSubmit';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';

function GridSubmit(props) {
  const { data, loading } = props;

  return (
    <Row gutter={25}>
      {loading ? (
        [...Array(10).keys()].map((key) => (
          <Cards key={key} headless>
            <Skeleton active />
          </Cards>
        ))
      ) : data.length ? (
        data.map((value) => {
          return (
            <Col key={value.id_form_template} xl={8} md={12} xs={24}>
              <GridCard value={value} />
              {/* <div>list</div> */}
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <Cards headless>
            <Heading>Data Not Found!</Heading>
          </Cards>
        </Col>
      )}
    </Row>
  );
}

export default GridSubmit;
