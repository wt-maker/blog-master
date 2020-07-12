const loginStatus = () => {
    if (!window.localStorage.getItem('token')) {
        return false
    }
    /* const lifeTime = JSON.parse(window.localStorage.getItem('token') || '').lifeTime * 1000
    const nowTime = (new Date()).getTime()
    if (nowTime > lifeTime) {
        return false
    } */
    return true
}
export default loginStatus