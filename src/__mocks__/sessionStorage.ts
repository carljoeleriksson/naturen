export const mockSessionStorage = () => {
    const setItemMock = jest.fn();
    const getItemMock = jest.fn();
  

    beforeEach(() => {
      Storage.prototype.setItem = setItemMock;
      Storage.prototype.getItem = getItemMock;
      getItemMock.mockReturnValueOnce('user')
    });
  
    afterEach(() => {
      setItemMock.mockRestore();
      getItemMock.mockRestore();
    //  console.log("mockLocalStorage restore")
    });
  
    return { setItemMock, getItemMock };
  };
