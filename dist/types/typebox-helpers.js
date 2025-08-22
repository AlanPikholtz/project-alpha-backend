// Helper para crear rutas con tipos automáticos
export function createTypedRoute(options, handler) {
    return { ...options, handler };
}
