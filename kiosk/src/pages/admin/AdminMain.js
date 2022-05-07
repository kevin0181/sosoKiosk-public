const AdminMain = ({adminCategory}) => {

    const AdminMainView = () => {
        if (adminCategory === 'menu') {
            return <div>menu</div>
        } else {
            return <div>좆같네</div>
        }
    }
    return (
        <AdminMainView/>
    );
}

export default AdminMain;