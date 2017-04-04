import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ReactModuleLoader from '../index';

// Shallow Rendering
describe('Shallow Rendering', () => {

  it('to have one `h1`', () => {
    const wrapper = shallow(<ReactModuleLoader
      mounted={{}}
      astKeyName="test"
      functionsKeyName='test'/>);
    expect(wrapper.find('h1')).to.have.length(1);
  });

});

// Full DOM Rendering
describe('Full DOM Rendering', () => {

  it('allows us to set props', () => {
    const wrapper = mount(<ReactModuleLoader
      mounted={{}}
      astKeyName="test"
      functionsKeyName='test' bar='baz'/>);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({bar: 'foo'});
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('calls componentDidMount', () => {
    sinon.spy(ReactModuleLoader.prototype, 'componentDidMount');
    const wrapper = mount(<ReactModuleLoader
      mounted={{}}
      astKeyName="test"
      functionsKeyName='test'/>);
    expect(ReactModuleLoader.prototype.componentDidMount.calledOnce).to.be.true;
    ReactModuleLoader.prototype.componentDidMount.restore();
  });

});

// Static Rendered Markup
describe('Static Rendered Markup', () => {

  it('renders one `h1`', () => {
    const wrapper = render(<ReactModuleLoader
      mounted={{}}
      astKeyName="test"
      functionsKeyName='test'/>);
    expect(wrapper.find('h1').length).to.equal(1);
  });

});
