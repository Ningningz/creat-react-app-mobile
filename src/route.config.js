const config = [
    {
        path: "/test2",
        exact: false,
        routes: [
            {
                path: '',
                component: 'Test2',
            }
        ],
    },
    {
        path: "/test1",
        exact: false,
        routes: [
            {
                path: 'home',
                component: 'Test1',
                exact: true,
            },
            {
                path: "children1",
                component: 'TestChildren1',
                exact: true,
            },
        ]
    }
];

export default config;