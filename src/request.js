export default class Request {

    getPath () {
        return location.pathname
    }

    getParams () {
        let queryParams = location.search.split('?')

        if (queryParams[1] !== undefined) {
            let paramsList = queryParams[1].split('&')

            return paramsList.reduce((params, hash) => {
                let [key, val] = hash.split('=')
                return Object.assign(params, {[key]: decodeURIComponent(val)})
            }, {})
        }
        return {}
    }

    getParam (key) {
        return this.getParam()[key]
    }

    getProtocol () {
        return location.protocol
    }

    getFullUrl () {
        return location.href
    }

    getQuery () {
        return location.search
    }

    getPort () {
        return location.port
    }
}