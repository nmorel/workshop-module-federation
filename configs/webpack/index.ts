exports.resolveRemote = ({key, devUrl}) => {
  return `((resolve) => {
    const {host, search} = window.location
    const params = new URLSearchParams(search)
    let remoteUrl = '${devUrl}/remoteEntry.js'
    const devs = params.get('dev')?.split(',').map(_ => _.trim())
    if (!devs?.length || !devs.includes('${key}')) {
      let prefixUrl = '/'
      if (host.startsWith('localhost:300')) {
        // Host is in dev mode, redirecting to local prod server
        prefixUrl = 'http://localhost:4000/'
      }
      remoteUrl = prefixUrl + 'remote/${key}/remoteEntry.js'
    }

    const script = document.createElement('script')
    script.src = remoteUrl
    script.onload = () => {
      const proxy = {
        get: (request) => window.${key}.get(request),
        init: (arg) => {
          try {
            return window.${key}.init(arg)
          } catch (e) {
            console.log('remote container already initialized')
          }
        },
      }
      resolve(proxy)
    }
    document.head.appendChild(script)
  })`
}
