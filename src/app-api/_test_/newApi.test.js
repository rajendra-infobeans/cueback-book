import '@testing-library/jest-dom/extend-expect';
import { SignInApi, FederatedSignIn, GetMemories } from '../newApi';

describe('NewApiTestCases', () => {
  it('render SignInApi', () => {
    const result = SignInApi({ name: ' devesh' });
    expect(result).toBeDefined();
  });
  it('render FederatedSignIn', () => {
    const result = FederatedSignIn({ name: ' devesh' });
    expect(result).toBeDefined();
  });
  it('render GetMemories', () => {
    const result = GetMemories({ name: ' devesh' });
    expect(result).toBeDefined();
  });
});
