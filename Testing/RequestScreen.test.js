import React from 'react';
import renderer from 'react-test-renderer';
import RequestScreen from '../screens/RequestScreen';


test('renders correctly', () => {
  const tree = renderer.create(<RequestScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});