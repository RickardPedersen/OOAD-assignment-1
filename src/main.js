import rixios from './rixios.js'
import VehicleFactory from './vehicles.js'

const factory = new VehicleFactory(),
	rockets = [],
	dragons = [],
	ships = []

// Setup base url for spacex API
const spacexAPI = rixios.create('https://api.spacexdata.com/v4')

async function getRockets() {
	return await spacexAPI.get('/rockets')
}

async function getDragons() {
	return await spacexAPI.get('/dragons')
}

async function getShips() {
	return await spacexAPI.get('/ships')
}

async function getVehicles() {
	const rocketData = await getRockets()
	for (let rocket of rocketData) {
		rocket.vehicleType = 'rocket'
		const obj = factory.createVehicle(rocket)
		rockets.push(obj)
	}
	console.log(rockets)

	const dragonData = await getDragons()
	for (let dragon of dragonData) {
		dragon.vehicleType = 'dragon'
		const obj = factory.createVehicle(dragon)
		dragons.push(obj)
	}
	console.log(dragons)

	const shipData = await getShips()
	for (let ship of shipData) {
		ship.vehicleType = 'ship'
		const obj = factory.createVehicle(ship)
		ships.push(obj)
	}
	console.log(ships)
}
getVehicles()



//*******************************************************//
//
// CODE EXAMPLES
//
//*******************************************************//



/****************** FACADE PATTERN  *****************/



/****************** Demo without Facade  *****************/

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
//withoutFacade()

/****************** Demo with Facade (rixios) *****************/

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
//withFacade()
