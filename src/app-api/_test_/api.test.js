import '@testing-library/jest-dom/extend-expect';
import { AddComment, AddMindPop, ChangePasswordApi, Check, CollectionListing, fetchTags, FriendsList, GetComments, GetMemory, GetWelcomePopupStatus, handleLike, handleUnLike, LoginApi, Logout, MindPopListApi, MoveToDrafts, ProfileInfo, PromptListApi, PublishMemory, RecentPublishedApi, RegisterApi, ResetPasswordApi, SetWelcomePopupStatus, SsoLogin, UpdateMemory, UploadFile } from '../api';
describe('ApiTestCases', () => {
  it('render LoginApi', () => {
    const result = LoginApi({ name: ' LoginApi' });
    expect(result).toBeDefined();
  });
  it('render Logout', () => {
    const result = Logout({ name: ' Logout' });
    expect(result).toBeDefined();
  });
  it('render RecentPublishedApi', () => {
    const result = RecentPublishedApi({ name: ' RecentPublishedApi' });
    expect(result).toBeDefined();
  });
  it('render GetComments', () => {
    const result = GetComments({ name: ' GetComments' });
    expect(result).toBeDefined();
  });
  it('render handleLike', () => {
    const result = handleLike({ name: ' handleLike' });
    expect(result).toBeDefined();
  });
  it('render handleUnLike', () => {
    const result = handleUnLike({ name: ' handleUnLike' });
    expect(result).toBeDefined();
  });
  it('render AddComment', () => {
    const result = AddComment({ name: ' AddComment' });
    expect(result).toBeDefined();
  });
  it('render CollectionListing', () => {
    const result = CollectionListing({ name: ' CollectionListing' });
    expect(result).toBeDefined();
  });
  it('render FriendsList', () => {
    const result = FriendsList({ name: ' FriendsList' });
    expect(result).toBeDefined();
  });
  it('render fetchTags', () => {
    const result = fetchTags({ name: ' fetchTags' });
    expect(result).toBeDefined();
  });
  it('render PublishMemory', () => {
    const result = PublishMemory({ name: ' PublishMemory' });
    expect(result).toBeDefined();
  });
  it('render UpdateMemory', () => {
    const result = UpdateMemory({ name: ' UpdateMemory' });
    expect(result).toBeDefined();
  });
  it('render UploadFile', () => {
    const result = UploadFile({ name: ' UploadFile' });
    expect(result).toBeDefined();
  });
  it('render MoveToDrafts', () => {
    const result = MoveToDrafts({ name: ' MoveToDrafts' });
    expect(result).toBeDefined();
  });
  it('render SsoLogin', () => {
    const result = SsoLogin({ name: ' SsoLogin' });
    expect(result).toBeDefined();
  });
  it('render ResetPasswordApi', () => {
    const result = ResetPasswordApi({ name: ' ResetPasswordApi' });
    expect(result).toBeDefined();
  });
  it('render RegisterApi', () => {
    const result = RegisterApi({ name: ' RegisterApi' });
    expect(result).toBeDefined();
  });
  it('render Check', () => {
    const result = Check({ name: ' Check' });
    expect(result).toBeDefined();
  });
  it('render ProfileInfo', () => {
    const result = ProfileInfo({ name: ' ProfileInfo' });
    expect(result).toBeDefined();
  });
  it('render MindPopListApi', () => {
    const result = MindPopListApi({ name: ' MindPopListApi' });
    expect(result).toBeDefined();
  });
  it('render AddMindPop', () => {
    const result = AddMindPop({ name: ' AddMindPop' });
    expect(result).toBeDefined();
  });
  it('render PromptListApi', () => {
    const result = PromptListApi({ name: ' PromptListApi' });
    expect(result).toBeDefined();
  });
  it('render SetWelcomePopupStatus', () => {
    const result = SetWelcomePopupStatus({ name: ' SetWelcomePopupStatus' });
    expect(result).toBeDefined();
  });
  it('render GetWelcomePopupStatus', () => {
    const result = GetWelcomePopupStatus({ name: ' GetWelcomePopupStatus' });
    expect(result).toBeDefined();
  });
  it('render ChangePasswordApi', () => {
    const result = ChangePasswordApi({ name: ' ChangePasswordApi' });
    expect(result).toBeDefined();
  });
  it('render GetMemory', () => {
    const result = GetMemory({ name: ' GetMemory' });
    expect(result).toBeDefined();
  });
});
