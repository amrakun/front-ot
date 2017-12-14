import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/sign-in" className="ant-btn">
        Sign in
      </Link>
      <Link to="/register" className="ant-btn">
        Register
      </Link>
      <Link to="/eoi" className="ant-btn">
        EOI
      </Link>
    </div>
  );
};

export default Home;
