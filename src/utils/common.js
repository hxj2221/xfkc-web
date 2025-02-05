const baseUrl = process.env.VUE_APP_BASE_API

const func = {
  url: (filename, dir = 'file') => {
    return `${baseUrl}/${dir}/${filename}`
  }
}

export default func
