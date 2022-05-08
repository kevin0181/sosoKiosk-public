const AdminLoginSession = () => {
    const sessionId = sessionStorage.getItem("id");
    if (sessionId === null || sessionId === undefined || sessionId === '') {
        return false;
    } else {
        return true;
    }
}

export default AdminLoginSession;