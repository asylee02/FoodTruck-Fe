const user = JSON.parse(localStorage.getItem('userId'));
const userId = user?.id

export const isLoginSelector = selector({
    key: 'isLoginSelector',
    get:({get}) =>!!get(userId)
})