//*******************************************************//
// 
// The Factory Pattern
//
//*******************************************************//

//******************** Defining Types *******************//

class Vehicle {
	constructor({ name, id }) {
		this.name = name
		this.id = id
	}
}

class Rocket extends Vehicle {
	constructor({ name, id, flickr_images, description, active }) {
		super({ name, id })
		this.images = flickr_images
		this.description = description
		this.active = active
	}
}

class Dragon extends Vehicle {
	constructor({ name, id, flickr_images, description, active }) {
		super({ name, id })
		this.images = flickr_images
		this.description = description
		this.active = active
	}
}

class Ship extends Vehicle {
	constructor({ name, id, image, type, roles }) {
		super({ name, id })
		this.image = image
		this.type = type
		this.roles = roles
	}
}

//******************** The Factory ********************//

class VehicleFactory {
	constructor() {
		this.vehicleClass = Vehicle;
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
				break
			default:
				this.vehicleClass = Vehicle
				break
		}

		return new this.vehicleClass(options)
	}
}

export default VehicleFactory
