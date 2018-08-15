import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// setups up jest + enzyme matchers (https://github.com/FormidableLabs/enzyme-matchers)
import 'jest-enzyme';

configure({adapter: new Adapter()});

// TODO: Cause test failures for console.warn/error
