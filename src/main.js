import rixios from './rixios.js'
import VehicleFactory from './vehicles.js'

const factory = new VehicleFactory()
const rockets = []
const dragons = []
const ships = []

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




//******************** RIXIOS EXAMPLES ********************//

async function rixiosExamples() {
	// without base url
	const users = await rixios.get('https://jsonplaceholder.typicode.com/users')
	console.log(users)
	for (const user of users) {
		// request with query params
		const posts = await rixios.get('https://jsonplaceholder.typicode.com/posts', { params: { userId: user.id } })
		console.log(posts)
	}
	
	// with base url
	const jsonplaceholder = rixios.create('https://jsonplaceholder.typicode.com')

	const users2 = await jsonplaceholder.get('/users')
	console.log(users2)
	for (const user of users2) {
		// request with query params
		const posts = await jsonplaceholder.get('/posts', { params: { userId: user.id } })
		console.log(posts)
	}
}
// rixiosExamples()
