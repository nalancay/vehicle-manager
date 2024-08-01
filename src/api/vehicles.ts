export default class Vehicles {
  static async getAllVehicles(apiUrl: string) {
    try {
      const response = await fetch(apiUrl, {
        method: "get",
        headers: {
          "X-Api-Key": "ngDkzSsHqhH8x5p0bCIeUIKiVkPHzN9Qxz4gP7ik",
        },
      });

      if (!response.ok) {
        throw new NetworkError();
      }

      const dataVehicles = await response.json();
      return dataVehicles;
    } catch (err) {
      throw err;
    }
  }
}

class NetworkError extends Error {
  constructor() {
    super("Hubo un error en el servidor. Parámetros inválidos.");
  }
}
