const isProd = process.env.NODE_ENV === 'production'
const prodUrl = 'http://localhost:4000'

exports.resolveRemote = ({key, devUrl}) => {
  const defaultUrl = isProd ? `/remote/${key}` : `${prodUrl}/remote/${key}`

  return `((resolve) => {
    const params = new URLSearchParams(window.location.search)
    let remoteUrl = '${devUrl}/remoteEntry.js'
    const devs = params.get('dev')?.split(',').map(_ => _.trim())
    if(!devs?.length || !devs.includes('${key}')) {
      remoteUrl = '${defaultUrl}/remoteEntry.js'
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
