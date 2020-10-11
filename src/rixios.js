//*******************************************************//
//
// Revealing Module & Facade Pattern
//
//*******************************************************//

const rixios = (function () {
	const privateDefaultHeaders = { 'Content-Type': 'application/json' }

	async function publicGet(url = '', config = {}) {
		if (this.baseUrl) {
			url = this.baseUrl + url
		}
		const { headers, params } = config
		return await privateRequest(url, {
			method: 'GET',
			headers: headers || privateDefaultHeaders,
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
