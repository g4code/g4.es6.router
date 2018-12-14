import Request from './request.js'

export default class Router  {

    constructor () {
        this.routes = {}
        this.currentPath = null;
    }

    add (options) {
        // TODO - validate
        this.routes[options.path] = options
        return this
    }

    destroyPrevRouteIfExist () {
        let route = this.routes[this.currentPath]
        if (route !== undefined && route.runner !== undefined) {
            new route.runner().destroy()
        }
    }

    run () {
        let request = new Request()
        let path = request.getPath()
        let route = this.routes[path]

        if (route === undefined) {
            console.log(`Rout ${path} not exists`)
            return false;
        }

        this.destroyPrevRouteIfExist()

        if (route.callback !== undefined) {
            route.callback.call(this, request)
        }

        if (route.runner !== undefined) {
            new route.runner().run(request)
        }

        this.currentPath = path
    }

}