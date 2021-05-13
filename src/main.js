import React from 'react';
import './main.css';
import { Helmet } from 'react-helmet';

export default function ChildComponent() {
  return (
    <div>
      <Helmet>
        <title> British Museum Collections</title>
      </Helmet>
    </div>
  )
}