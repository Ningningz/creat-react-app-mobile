/**
 * @file 定义路由匹配，渲染对应的 UI 组件
 * @author  chris<wfsr@foxmail.com>
 */
/* eslint-disable react/jsx-no-bind, import/dynamic-import-chunkname */

import { Switch, Route } from 'react-router-dom';
import loadable from 'react-loadable';

// import EnhancedRoute from './component/EnhancedRoute';
// import Loading from './component/Loading/index';
import routes from './route.config';
// import Test1 from './pages/Test1';
// import TestChildren1 from './pages/TestChildren1';

// import BasicLayout from './layout/BasicLayout';
// import BlankLayout from './layout/BlankLayout';

// const layouts = {
//     BasicLayout,
//     BlankLayout,
// };

// function RouteWithSubRoutes({exact, path, component, routes}) {
//     const Components = loadable({
//         loader: () => import(`./pages/${component}`),
//         loading: <p>loading</p>
//     });

//     return (
//       <Route
//         path={path}
//         exact={exact}
//         // component={component}
//         render={props => (
//           // pass the sub-routes down to keep nesting
//             <Components {...props} />
//             // <components {...props} routes={routes} />
//         )}
//       />
//     );
// }

const RouteWithSubRoutes = routes =>
    props => routes.map(route => {
        const { match: { path } } = props;
        const { path: subPath = '', component, exact = true, routes = [] } = route;

        const Component = loadable({
            loader: () => import(`~/pages/${component}`),
            loading() {
                return <div>正在加载</div>
            },
        });

        const key = subPath
            ? subPath.startsWith('/') ? subPath : `${path}/${subPath}`
            : path;

            console.log('key---',routes, key, component, exact, props.match);

        // if (routes.length) {
        //     console.log('routes.length---',routes);
        //     const render = props => {
        //         const Children = RouteWithSubRoutes(routes);
        //         return [
        //             <Component key="parent" {...props} />,
        //             <Children {...props} key="children" />
        //         ];
        //     };

        //     return (
        //         <Route
        //             exac={exact}
        //             key={key}
        //             path={key}
        //             {...props}
        //             render={render}
        //         />
        //     );
        // }

        return (
            <Route exac={exact} key={key} path={key} component={Component} />
        );

    });



export default function Routes(props) {

    return (
        <Switch>
            {routes.map((routeItem, index) => {
                const {
                    path = '/',
                    // layout,
                    exact = true,
                    // name,
                    routes,
                } = routeItem;
                let Component = RouteWithSubRoutes(routes);

                return <Route key={path} exact={exact} {...routeItem} render={
                    routerProps => {
                        console.log('Routes---', routerProps);
                        return <Component {...routerProps}/>
                    }
                } />;

            })}
        </Switch>
    );
}
