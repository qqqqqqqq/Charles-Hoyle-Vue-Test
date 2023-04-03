<template>
	<div>
		<h2>Vehicles available on {{ dateQueried }}</h2>
				
		<div class="datePicker">
			<DatePicker />	
		</div>
				
		<div>			
			<table>
				<tr class="headers">
					<td>Vehicle</td>
					<td>Category</td>
					<td>Model</td>
					<td>Make</td>
					<td>Fuel type</td>
					<td>£ per Day</td>			
				</tr>
				<tr v-for="vehicle in vehicles" :key="vehicle.id">
					<td>{{ vehicle.reg }}</td> 
					<td>{{ vehicle.category }}</td> 
					<td>{{ vehicle.model }}</td>  
					<td>{{ vehicle.make }}</td>  
					<td>{{ vehicle.fuel }}</td>  
					<td>{{ vehicle.price }}</td>  
				</tr>
			</table>	
		</div>

	</div>
</template>

<script>

export default {
  data() {
    return {
    	dateQueried: "",
		vehicles: [],
		jsonAvailableVehiclesBase: "/static/availableVehicles.json?date="
    };
  },
  
  methods: {
		async getAvailableVehicles( inpString = this.dateQueried ) {
			this.dateQueried = inpString;
			const reqUrl = this.jsonAvailableVehiclesBase + inpString; 
			try {
				const response = await this.$http.get( reqUrl );
				this.vehicles = response.data;
			} catch (error) {
				console.log(error);
				}
		}
		
    },

  mounted() { 
  		console.log("available vehicles mounted, this.dateQueried = ", this.dateQueried);
  		this.getAvailableVehicles( this.dateQueried );
  }

};
</script>

