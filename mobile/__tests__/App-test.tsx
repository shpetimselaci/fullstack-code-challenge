/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.render(<App />);
});
