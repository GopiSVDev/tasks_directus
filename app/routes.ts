import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/mainLayout.tsx", [
    index("routes/home.tsx"),
    route("register", "routes/auth/register.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("logout", "routes/auth/logout.tsx"),
    route("create", "routes/create.tsx"),
    route("tasks/:id/edit", "routes/tasks.$id.edit.tsx"),
    route("tasks/:id/delete", "routes/tasks.$id.delete.tsx"),
  ]),
] satisfies RouteConfig;
