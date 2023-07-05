import { Link, Outlet } from '@modern-js/runtime/router'

export default function Layout() {
    return (
        <div>
            <div>
                <Link to={'/'}>首页</Link>
                <span> | </span>
                <Link to={'/editor'}>编辑器</Link>
            </div>
            <Outlet />
        </div>
    )
}
