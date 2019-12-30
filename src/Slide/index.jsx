import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import widthPropType from '../CustomProps/width';
import './slide.css';

const Slide = ({
  direction,
  width,
  menuIsClosing,
  setIsMenuOpen,
  children
}) => {
  const [menuIsOpening, setMenuIsOpening] = useState(false);

  const styles = {
    position: 'fixed',
    width,
    zIndex: 9999999999,
    top: 0,
    left: direction === 'right' ? null : 0,
    right: direction === 'right' ? 0 : null,
    height: '100vh',
    background: 'whitesmoke',
    transform: `translateX(${direction === 'right' ? '+' : '-'}100%)`,
    transition: 'transform 0.3s ease'
  };

  useEffect(() => {
    setMenuIsOpening(true);
  }, []);

  useEffect(() => {
    if (menuIsClosing) setMenuIsOpening(false);
  }, [menuIsClosing]);

  const onTansitionEnd = () => {
    if (menuIsClosing) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      style={styles}
      className={classNames({
        slideMenuInsideViewport: menuIsOpening
      })}
      onTransitionEnd={onTansitionEnd}
    >
      {children}
    </div>
  );
};

Slide.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  width: widthPropType.isRequired,
  menuIsClosing: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Slide;
