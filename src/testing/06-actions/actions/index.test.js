import * as actions from './';
import * as api from '../api';
import {EMAILS, DEFAULT_EMAIL} from '../__fixtures__';


describe('updateEmails', () => {
  it('returns UPDATE_EMAILS type', () => {
    expect(actions.updateEmails(EMAILS)).toEqual({
      type: actions.UPDATE_EMAILS,
      payload: EMAILS,
    });
  });
});

describe('getEmails', () => {
  it('calls the getEmails API and dispatches UPDATE_EMAILS action on API success', async () => {
    // mock the API response to be successful, returning emails response
    jest.spyOn(api, 'getEmails').mockReturnValue(Promise.resolve(EMAILS));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    await actions.getEmails()(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.getEmails).toHaveBeenCalledTimes(1);
    expect(api.getEmails).toHaveBeenCalledWith();

    // verify that the appropriate action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(actions.updateEmails(EMAILS)).toEqual({
      type: actions.UPDATE_EMAILS,
      payload: EMAILS,
    });

    api.getEmails.mockRestore();
  });
});

describe('addEmail', () => {
  it('calls the addEmail API and throws an error on API failure', async () => {
    // mock the API response to be unsuccessful
    jest.spyOn(api, 'addEmail').mockReturnValue(Promise.resolve({success: false}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    // verify it throws an error when API is unsuccessful
    await expect(actions.addEmail(DEFAULT_EMAIL)(mockDispatch)).rejects.toBeInstanceOf(Error);

    // verify that the API was still called with the expected arguments
    expect(api.addEmail).toHaveBeenCalledTimes(1);
    expect(api.addEmail).toHaveBeenCalledWith(DEFAULT_EMAIL);

    api.addEmail.mockRestore();
  });

  it('calls the addEmail API and dispatches ADD_EMAIL action on API success', async () => {
    // mock the API response to be successful
    jest.spyOn(api, 'addEmail').mockReturnValue(Promise.resolve({success: true}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    await actions.addEmail(DEFAULT_EMAIL)(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.addEmail).toHaveBeenCalledTimes(1);
    expect(api.addEmail).toHaveBeenCalledWith(DEFAULT_EMAIL);

    // verify that the appropriate action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.ADD_EMAIL,
      payload: DEFAULT_EMAIL,
    });

    api.addEmail.mockRestore();
  });
});

describe('deleteEmail', () => {
  it('calls the deleteEmail API and throws an error on API failure', async () => {
    // mock the API response to be unsuccessful
    jest.spyOn(api, 'deleteEmail').mockReturnValue(Promise.resolve({success: false}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    // verify it throws an error when API is unsuccessful
    await expect(actions.deleteEmail(DEFAULT_EMAIL.id)(mockDispatch)).rejects.toBeInstanceOf(Error);

    // verify that the API was still called with the expected arguments
    expect(api.deleteEmail).toHaveBeenCalledTimes(1);
    expect(api.deleteEmail).toHaveBeenCalledWith(DEFAULT_EMAIL.id);

    api.deleteEmail.mockRestore();
  });

  it('calls the deleEmail API and dispatches DELETE_EMAIL action on API success', async () => {
    // mock the API response to be successful
    jest.spyOn(api, 'deleteEmail').mockReturnValue(Promise.resolve({success: true}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    await actions.deleteEmail(DEFAULT_EMAIL.id)(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.deleteEmail).toHaveBeenCalledTimes(1);
    expect(api.deleteEmail).toHaveBeenCalledWith(DEFAULT_EMAIL.id);

    // verify that the appropriate action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.DELETE_EMAIL,
      payload: DEFAULT_EMAIL.id,
    });

    api.deleteEmail.mockRestore();
  });
});

describe('markRead', () => {
  it('calls the setRead API and throws an error on API failure', async () => {
    // mock the API response to be unsuccessful
    jest.spyOn(api, 'setRead').mockReturnValue(Promise.resolve({success: false}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    await expect(actions.markRead(DEFAULT_EMAIL.id, true)(mockDispatch)).rejects.toBeInstanceOf(Error);

    // verify that the API was still called with the expected arguments
    expect(api.setRead).toHaveBeenCalledTimes(1);
    expect(api.setRead).toHaveBeenCalledWith(DEFAULT_EMAIL.id, true);

    api.setRead.mockRestore();
  });
  
  it('calls the setRead API and dispatches SET_READ_EMAIL action on API success', async () => {
    // mock the API response to be successful
    jest.spyOn(api, 'setRead').mockReturnValue(Promise.resolve({success: true}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    await actions.markRead(DEFAULT_EMAIL.id)(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.setRead).toHaveBeenCalledTimes(1);
    expect(api.setRead).toHaveBeenCalledWith(DEFAULT_EMAIL.id, true);

    // verify that the appropriate action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.SET_EMAIL_READ,
      payload: {
        emailId: DEFAULT_EMAIL.id,
        read: true,
      }
    });

    api.setRead.mockRestore();
  });
});

describe('markUnread', () => {
  it('calls the setRead API and throws an error on API failure', async () => {
    // mock the API response to be unsuccessful
    jest.spyOn(api, 'setRead').mockReturnValue(Promise.resolve({success: false}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    // verify it throws an error when API is unsuccessful
    await expect(actions.markUnread(DEFAULT_EMAIL.id, false)(mockDispatch)).rejects.toBeInstanceOf(Error);

    // verify that the API was still called with the expected arguments
    expect(api.setRead).toHaveBeenCalledTimes(1);
    expect(api.setRead).toHaveBeenCalledWith(DEFAULT_EMAIL.id, false);

    api.setRead.mockRestore();
  });
  
  it('calls the setRead API and dispatches SET_READ_EMAIL action on API success', async () => {
    // mock the API response to be successful
    jest.spyOn(api, 'setRead').mockReturnValue(Promise.resolve({success: true}));

    const mockDispatch = jest.fn();

    // Call action with the mock dispatch and wait until the API async to finish
    await actions.markUnread(DEFAULT_EMAIL.id)(mockDispatch);

    // verify that the API was called with the expected arguments
    expect(api.setRead).toHaveBeenCalledTimes(1);
    expect(api.setRead).toHaveBeenCalledWith(DEFAULT_EMAIL.id, false);

    // verify that the appropriate action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actions.SET_EMAIL_READ,
      payload: {
        emailId: DEFAULT_EMAIL.id,
        read: false,
      }
    });

    api.setRead.mockRestore();
  });
});
