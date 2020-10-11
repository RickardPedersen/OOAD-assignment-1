# OOAD-assignment-1
Assignment in Object-oriented analysis and design at Nackademin

## Setup

### Install dependencies
```
npm install
```

### Start app with live server
```
npm start
```

# Uppgift

## Välj 3 valfria designmönster från boken [”Learning JavaScript Design Patterns”](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
1. [Facade Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript)
2. [Factory Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)
3. [Revealing Module Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)

## Beskrivning av mina designmönster

### Facade Pattern
Facade Pattern är ett strukturellt designmönster vilket innebär att det behandlar relationer mellan objekt.

Grundprincipen bakom Facade Pattern är att dölja komplex kod eller stora kodblock bakom ett användarvänligt gränssnitt.

jQuery är ett exempel på Facade Pattern. Med jQuery kan utvecklare på ett enkelt sätt hantera bland annat DOM-manipulation och AJAX-requests, som innan ES6 var väldigt komplext med JavaScript.

**Exempel:**
Så här kan det se ut om man inte använder Facade Pattern:
```JavaScript
async function withoutFacade() {
	async function getUsers() {
		const response = await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		return response.json()
	}

	async function getUserPosts(userId) {
		const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		return response.json()
	}

	const users = await getUsers()
	console.log(users)
	for (const user of users) {
		const posts = await getUserPosts(user.id)
		console.log(posts)
	}
}

withoutFacade()
```
Vi kan istället dölja den komplexa koden bakom en fasad som skulle kunna se ut såhär.
I detta exemplet är fasaden inbygd i en [Revealing Module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript). Du kan läsa mer om Revealing Module Pattern längre ner.
```JavaScript
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
```
Nu har utvecklarna tillgång till ett användarvänligt gränssnitt!
```JavaScript
async function withFacade() {
	const jsonplaceholder = rixios.create('https://jsonplaceholder.typicode.com')

	async function getUsers() {
		return await jsonplaceholder.get('/users')
	}

	async function getUserPosts(userId) {
		return await jsonplaceholder.get('/posts', { params: { userId } })
	}

	const users = await getUsers()
	console.log(users)
	for (const user of users) {
		const posts = await getUserPosts(user.id)
		console.log(posts)
	}
}
withFacade()
```

### Factory Pattern

### Revealing Module Pattern

## Dokumentation

### Garretts designmodell
1. **Den strategiska nivån**
Denna nivån handlar om produktmål och användarbehov
2. **Omfattningsnivån**
Denna nivån handlar främst om kravspecifikation (innehåll och funtionalitet)

### Den strategiska nivån
