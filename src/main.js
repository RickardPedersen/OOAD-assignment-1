/** TODO
 * mål och användarbehov
 * kravspecifikation
 * bättre pattern beskrivningar (skillnader)
 * mer kommentarer
 * förbättra UML diagram
 */
import rixios from './rixios.js'
import VehicleFactory from './vehicles.js'

const factory = new VehicleFactory()

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

function createVehicles(data = [], type) {
	const vehicles = []
	for (let vehicle of data) {
		vehicle.vehicleType = type
		const obj = factory.createVehicle(vehicle)
		vehicles.push(obj)
	}
	return vehicles
}

const rocketButton = document.getElementById('rocketButton')
const dragonButton = document.getElementById('dragonButton')
const shipButton = document.getElementById('shipButton')

rocketButton.addEventListener('click', async function() {
	const rocketData = await getRockets()
	const rockets = createVehicles(rocketData, 'rocket')
	console.log(rockets)
})

dragonButton.addEventListener('click', async function() {
	const dragonData = await getDragons()
	const dragons = createVehicles(dragonData, 'dragon')
	console.log(dragons)
})

shipButton.addEventListener('click', async function() {
	const shipData = await getShips()
	const ships = createVehicles(shipData, 'ship')
	console.log(ships)
})
