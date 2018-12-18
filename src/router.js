import Request from './request.js'



export default class Router  {

    constructor () {
        this.routes = {}
        this.currentPath;
    }

    add (options) {
        // TODO - validate
        this.routes[options.path] = options
        return this
    }

    destroyPrevRouteIfExist () {
        let route = this.findRoute(this.currentPath)
        if (route !== undefined && route.runner !== undefined) {
            new route.runner().destroy()
        }
    }

    run () {
        let request = new Request()
        let route = this.findRoute( request.getPath())
        this.destroyPrevRouteIfExist()
        this.runCurrentRoute(route, request)
    }

    runCurrentRoute (route, request) {
        if (route === undefined) {
            console.log(`Rout ${path} not exists`)
            return false;
        }

        if (route.callback !== undefined) {
            route.callback.call(this, request)
        }

        if (route.runner !== undefined) {
            new route.runner().run(request)
        }

        this.currentPath = request.getPath()
    }

    findRoute (path) {
        if (typeof path === 'string') {
            let key = Object.keys(this.routes).find(route => this.matchPath(path, route))
            return this.routes[key]
        }
    }


    matchPath (locationPath, routePath) {
        locationPath = locationPath.split('/')
        routePath = routePath.split('/')

        if(locationPath.length === routePath.length){
            let isUriPath = true;
            for(let key in locationPath) {
                if(locationPath[key] !== routePath[key] && !/^:/.test( routePath[key])){
                    isUriPath = false;
                }
            }
            return isUriPath
        }

        return false;
    }

}