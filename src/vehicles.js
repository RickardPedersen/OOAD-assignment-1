//*******************************************************//
// 
// The Factory Pattern
//
//*******************************************************//

//******************** Defining Types *******************//

class Rocket {
	constructor({ name, id, description, active }) {
		this.name = name
		this.id = id
		this.description = description
		this.active = active
	}
}

class Dragon {
	constructor({ name, id, description, active }) {
		this.name = name
		this.id = id
		this.description = description
		this.active = active
	}
}

class Ship {
	constructor({ name, type, roles }) {
		this.name = name
		this.type = type
		this.roles = roles
	}
}

//******************** The Factory ********************//

class VehicleFactory {
	constructor() {
		this.vehicleClass = Rocket;
	}

	createVehicle(options = {}) {
		switch (options.vehicleType) {
			case 'rocket':
				this.vehicleClass = Rocket
				break
			case 'dragon':
				this.vehicleClass = Dragon
				break
			case 'ship':
				this.vehicleClass = Ship
		}

		return new this.vehicleClass(options)
	}
}

export default VehicleFactory
