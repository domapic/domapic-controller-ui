export const multiRoutesMatcher = routes => `(${routes.join("|")})`;

export const sectionsRoutes = sections => Object.values(sections).map(section => section.route);
