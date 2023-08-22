export const useGetUserID = () => {

    // custom hook to get userID from localStorage
    return window.localStorage.getItem("userID");

};