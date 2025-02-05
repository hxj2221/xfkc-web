const baseUrl = process.env.VUE_APP_BASE_API

const func = {
  url: (filename) => {
    return `${baseUrl}/avatar/${filename}`
  }
}

export default func
