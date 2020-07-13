const loginStatus = () => {
    let token = window.localStorage.getItem('token')
    if (!token) {
        return false
    }
    let validDate = JSON.parse(token).exp * 1000
    let currentDate = (new Date()).getTime()
    return currentDate < validDate
}
export default loginStatus