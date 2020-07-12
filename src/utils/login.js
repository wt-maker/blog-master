const loginStatus = () => {
    if (!window.localStorage.getItem('token')) {
        return false
    }
    let validDate = JSON.parse(window.localStorage.getItem('token') || '').exp * 1000
    let currentDate = (new Date()).getTime()
    return currentDate < validDate
}
export default loginStatus