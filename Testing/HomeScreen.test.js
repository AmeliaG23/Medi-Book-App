import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../screens/HomeScreen'; // Adjust the import path based on your project structure

test('renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
