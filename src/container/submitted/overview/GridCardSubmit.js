/* eslint-disable camelcase */
import React from 'react';
import { Progress, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { ProjectCard } from '../../project/style';

function GridCard({ value }) {
  const { path } = useRouteMatch();
  const history = useHistory();
  const { idFormTemplate, formId, formName, username, created_date } = value;
  return (
    <ProjectCard>
      <Cards headless>
        <div className="project-top">
          <div className="project-title">
            <h1>
              <Link to={`${path}/${formId}`}>{formName}</Link>
            </h1>
            {/* <Dropdown
              content={
                <>
                  <Link to={`${path}/${formId}`}>Tạo Form</Link>
                </>
              }
            >
              <Link to="#">
                <FeatherIcon icon="more-horizontal" size={18} />
              </Link>
            </Dropdown> */}
          </div>
          <p className="project-desc">
            <span>Người tạo:</span> {username}
          </p>
          <div className="project-timing">
            <div>
              <span>Ngày tạo</span>
              <strong>{created_date}</strong>
            </div>
            {/* <div>
              <span>Deadline</span>
              <strong>18 Mar 2020</strong>
            </div> */}
          </div>
        </div>
      </Cards>
    </ProjectCard>
  );
}

GridCard.propTypes = {
  value: PropTypes.object,
};

export default GridCard;
