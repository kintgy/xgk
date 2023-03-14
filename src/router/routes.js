const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/home/Index"),
    meta: {title: "首页", single_page: true, page: true,},
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login"),
    meta: {title: "登录", public: true, hidden: true},
  },
  {
    path: "/company",
    name: "Company",
    component: () => import("@/views/base/RenderView"),
    meta: {header: true, title: "BP"},
    children: [
      {
        path: "/company/manager",
        name: "CompanyManager",
        component: () => import("@/views/company/manager/Index"),
        meta: {title: "BP列表", page: true},
        children: [
          {
            path: "/company/manager/get/:id",
            name: "CompanyManagerGet",
            component: () => import("@/views/company/manager/Detail"),
            meta: {title: "详情", operation: true}
          },
          {
            path: "/company/manager/add",
            name: "CompanyManagerAdd",
            meta: {title: "新增（导入）", operation: true},
          },
          {
            path: "/company/manager/delete",
            name: "CompanyManagerDelete",
            meta: {title: "删除", operation: true},
          },
          {
            path: "/company/manager/edit",
            name: "CompanyManagerEdit",
            meta: {title: "修改", operation: true},
          },
        ]
      },
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/base/RenderView"),
    meta: {header: true, title: "Admin"},
    children: [
      {
        path: "/admin/user/manager",
        name: "AdminUser",
        component: () => import("@/views/admin/user/manager/Index"),
        meta: {title: "用户管理"}
      },
      {
        path: "/admin/user/role",
        name: "AdminUserRole",
        component: () => import("@/views/admin/user/role/Index"),
        meta: {title: "角色管理"}
      }
    ]
  },
  // {
  //   path: "/notification/:tab",
  //   name: "Notification",
  //   meta: {title: "通知", hidden: true, single_page: true, page: true, public: true,},
  //   components: {
  //     index: () => import("@/views/notification/Notifications"),
  //     announcement: () => import("@/views/notification/Announcements"),
  //   },
  //   children: [
  //     {
  //       path: "notification/index",
  //       meta: {title: "通知", tab: "index", hidden: true, public: true},
  //     },
  //     {
  //       path: "notification/announcement",
  //       meta: {title: "公告", tab: "announcement", hidden: true, public: true,},
  //     },
  //   ],
  // },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: () => import("@/views/base/RenderView"),
  //   meta: {header: true, title: "Admin"},
  //   children: [
  //     {
  //       path: "/admin/user",
  //       name: "AdminUser",
  //       component: () => import("@/views/base/RenderView"),
  //       meta: {group: true, title: "用户及部门岗位"},
  //       children: [
  //         {
  //           path: "/admin/user/manager",
  //           name: "AdminUserManager",
  //           component: () => import("@/views/admin/user/manager/Index"),
  //           meta: {title: "用户管理"},
  //         },
  //         {
  //           path: "/admin/user/department",
  //           name: "AdminUserDepartment",
  //           component: () => import("@/views/admin/user/department/Index"),
  //           meta: {title: "部门管理"},
  //           children: [],
  //         },
  //         {
  //           path: "/admin/user/post",
  //           name: "AdminUserPost",
  //           component: () => import("@/views/admin/user/post/Index"),
  //           meta: {title: "岗位管理"},
  //           children: [],
  //         },
  //       ],
  //     },
  //     {
  //       path: "/admin/performance",
  //       name: "AdminPerformance",
  //       component: () => import("@/views/base/RenderView"),
  //       meta: {group: true, title: "绩效考核设置"},
  //       children: [
  //         {
  //           path: "/admin/performance/audit",
  //           name: "AdminPerformanceAudit",
  //           component: () => import("@/views/admin/performance/audit/Index"),
  //           meta: {title: "考核表设置"},
  //         },
  //       ],
  //     },
  //     {
  //       path: "/admin/system",
  //       name: "AdminSystem",
  //       component: () => import("@/views/base/RenderView"),
  //       meta: {group: true, title: "系统设置"},
  //       children: [
  //         {
  //           path: "/admin/system/announcement",
  //           name: "AdminSystemAnnouncement",
  //           component: () => import("@/views/admin/system/announcement/Index"),
  //           meta: {title: "公告设置"},
  //         },
  //       ],
  //     },
  //     {
  //       path: "/admin/role",
  //       name: "AdminRole",
  //       component: () => import("@/views/admin/role/Index"),
  //       meta: {title: "角色权限设置"},
  //     },
  //   ],
  // }
];

export default routes;
