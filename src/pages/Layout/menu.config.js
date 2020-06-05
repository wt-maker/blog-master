export const menuList = [
    {
        title:'H O M E',
        key:'home',
        path:'/',
        icon:'HomeOutlined',
        content:'H O M E'
    },
    {
        title:'文章管理',
        key:'article-manage',
        icon:'HddOutlined',
        content:'文章管理',
        child:[
            {
                content:'文章列表',
                key:'article-list',
                path:'/article/list'
            },
            {
                content:'添加文章',
                key:'article-add',
                path:'/article/add'
            },
            {
                content:'草稿箱',
                key:'article-drafts',
                path:'/article/drafts'
            },
            {
                content:'标签管理',
                key:'article-tags',
                path:'/article/tags'
            }
        ]
    },
    {
        title:'源码管理',
        key:'source-manage',
        icon:'GithubOutlined',
        content:'源码管理',
        child:[
            {
                content:'源码列表',
                key:'source-list',
                path:'/source/list'
            },
            {
                content:'添加源码',
                key:'source-add',
                path:'/source/add'
            }
        ]
    }
]