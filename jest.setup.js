import '@testing-library/jest-dom/extend-expect';
import 'jest-expect-message';

// Allow router mocks.
// eslint-disable-next-line no-undef
jest.mock('next/router', () => require('next-router-mock'));
