import Request from './request.js'

export default class Router  {

    constructor () {
        this.routes = {}
    }

    add (options) {
        // TODO - validate
        this.routes[options.path] = options
        return this
    }

    destroyPrevRouteIfExist () {
        if (this.currentRoute !== undefined && this.currentRoute.runner !== undefined) {
            new this.currentRoute.runner().destroy()
        }
        return this
    }

    run () {
        this.request = new Request()
        this.destroyPrevRouteIfExist()
            .runCurrentRoute( this.findRoute(this.request.getPath()) )
    }

    runCurrentRoute (route) {
        if (route === undefined) {
            console.log(`Rout ${path} not exists`)
            return false;
        }

        route.callback !== undefined
            ? route.callback.call(this, this.request)
            : new route.runner().run(this.request)

        this.currentRoute = route
    }

    findRoute (path) {
        if (typeof path === 'string') {
            let key = Object.keys(this.routes).find(route => Request.matchPath(path, route))
            return this.routes[key]
        }
    }
}