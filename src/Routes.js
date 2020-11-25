/* eslint-disable react/jsx-no-bind */
/**
 * @file 定义路由匹配，渲染对应的 UI 组件
 * @author  chris<wfsr@foxmail.com>
 */
import React, {lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './route.config';

const routeWithSubRoutes = routes =>
    props => routes.map(route => {
        const {match: {path}} = props;
        const {path: subPath = '', component, exact = true, routes = []} = route;
        const Component = lazy(() => import(`~/pages/${component}`));

        const key = subPath
            ? subPath.startsWith('/') ? subPath : `${path}/${subPath}`
            : path;

        return (
            <Route exac={exact} key={key} path={key} component={Component} />
        );

    });


export default function Routes(props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                {routes.map((routeItem, index) => {
                    const {
                        path = '/',
                        exact = true,
                        routes,
                    } = routeItem;
                    const Component = routeWithSubRoutes(routes);

                    return (
                        <Route
                            key={path} exact={exact} {...routeItem} render={
                                routerProps => <Component {...routerProps} />
                            }
                        />
                    );

                })}
            </Switch>
        </Suspense>

    );
}
