const rixios = (function () {
	const defaultHeaders = { 'Content-Type': 'application/json' }

	async function publicGet(url = '', config = {}) {
		if (this.baseUrl) {
			url = this.baseUrl + url
		}
		const { headers, params } = config
		return await privateRequest(url, {
			method: 'GET',
			headers: headers || defaultHeaders,
			params: { ...params },
		})
	}

	async function privateRequest(url, options) {
		const queryString = Object.entries(options.params)
			.map((param) => {
				return `${param[0]}=${param[1]}`
			})
			.join('&')

		const fullUrl = `${url}?${queryString}`
		delete options.params

		console.log(`${options.method} ${fullUrl}`)
		const res = await fetch(fullUrl, options)
		return res.json()
	}

	function publicCreate(baseUrl) {
		return {
			baseUrl,
			get: publicGet,
		}
	}

	return {
		get: publicGet,
		create: publicCreate,
	}
})()

export default rixios

async function test() {
	const res = await rixios.get('https://jsonplaceholder.typicode.com/users')
	const res2 = await rixios.get('https://jsonplaceholder.typicode.com/posts')
	console.log(res)
	console.log(res2)

	const api = rixios.create('https://jsonplaceholder.typicode.com')
	const res3 = await api.get('/users')
	const res4 = await api.get('/posts')
	console.log(res3)
	console.log(res4)
}
test()
