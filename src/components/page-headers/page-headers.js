import React from 'react';
import PropTypes from 'prop-types';
import { PageHeaderStyle } from './style';

const PageHeader = (props) => {
  const { title, subTitle, routes, buttons, ghost, bgColor, className } = props;
  return (
    <>
      <div
        style={
          {
            // backgroundColor: bgColor || '#F4F5F7',
          }
        }
      >
        <PageHeaderStyle
          style={{
            // backgroundColor: 'rgb(244, 245, 247)',
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/011/561/871/original/aesthetic-abstract-modern-brown-background-illustration-perfect-for-wallpaper-backdrop-postcard-background-banner-vector.jpg')",
            marginBottom: '12px',
          }}
          // onBack={() => window.history.back()}
          className={className}
          title={title}
          subTitle={subTitle}
          breadcrumb={routes && { routes }}
          extra={buttons}
          ghost={ghost}
          {...props}
        />
      </div>
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  bgColor: PropTypes.string,
  className: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  buttons: PropTypes.array,
  ghost: PropTypes.bool,
};

export { PageHeader };
