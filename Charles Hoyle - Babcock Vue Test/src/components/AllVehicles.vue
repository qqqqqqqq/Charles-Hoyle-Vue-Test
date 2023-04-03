<template>
	<div>
		<div class="pageCol leftPage">
		
			<h2>All Vehicles</h2>
			
			<div>
				<div class="adviceNote">
					Select a vehicle:
				</div>
				
				<table class="allVehicles">
					<tr class="headers">
						<td>Vehicle</td>
						<td>Category</td>
						<td>Model</td>
						<td>Make</td>
						<td>Fuel type</td>
						<td>£ per Day</td>			
					</tr>
					<tr v-for="vehicle in vehicles" :key="vehicle.id" v-on:click="selectVehicle(vehicle.reg)">
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
		
		<div class="pageCol rightPage">
			<div v-if="showDateSelectors">
					
				<div class="topContainer">

					<p class="adviceNote">Select dates for hire:</p>
					<div class="datePicker">
						<DateRangePicker />	
					</div>
					
					<div class="nameInput">
						<p class="adviceNote">Please enter your name to book vehicle</p>
						<input v-model="customerName" placeholder="enter name" />
					</div>
					
					<div class="selectedReg">
						<span class="aBitSmaller">Vehicle reg.</span> {{ this.selectedReg }}
					</div>

					<div v-if="this.priceQuote.price" class="priceQuote">
						<div>
							Price <span>£</span>{{ this.priceQuote.price }}
						</div>
						
					<button :disabled="!this.canBook()" v-on:click="bookVehicle">Book Vehicle</button>
						
					</div>

				</div>

			</div>
		</div>
		
		<div class="clearBoth"></div>
		
	</div>
</template>

<script>

export default {
  data() {
    return {
    	customerName: "",
    	selectedReg : "",
    	showDateSelectors: false,
		priceQuote: { "price": 0 },
		vehicles: [],
		
		jsonAllVehicles: "/static/allVehicles.json",
		jsonQueryPriceBase: "/static/queryDates.json?reg=",
		jsonQueryPrice: "",
		jsonConfirmBookingBase: "/static/confirmBooking.json",
		jsonConfirmBooking: "",
		jsonConfirmBookingParams : { 	
				reg: "",
				start: "",
				end: "",
				customer: "",
				quote: 0
			}
    };
  },
  
  methods: {
		async getData() {
		  try {
			const response = await this.$http.get( this.jsonAllVehicles );
			this.vehicles = response.data;
		  } catch (error) {
			console.log(error);
		  }
		},

		async getPrice( inpStr ) {
		  const url = this.jsonQueryPrice + inpStr;
		  this.jsonConfirmBooking = this.jsonConfirmBookingBase + this.selectedReg + inpStr;
		  
		  try {
			const response = await this.$http.get( url );
			this.priceQuote = response.data;
		  } catch (error) {
			console.log(error);
		  }
		},   
		
		canBook: function() {
      		return ( this.customerName != "" );
		},

		showdates : function() {
		  this.showDateSelectors = !this.showDateSelectors;
		},

		selectVehicle : function(vehid) { 
			this.selectedReg = vehid;
			this.jsonQueryPrice = this.jsonQueryPriceBase + vehid; 
			this.showdates();
		},

		bookVehicle : function() {
			this.jsonConfirmBookingParams.reg = this.selectedReg;
			this.jsonConfirmBookingParams.quote = this.priceQuote.price;
			this.jsonConfirmBookingParams.customer = this.customerName;
			console.log("===========>> POST params: ", this.jsonConfirmBookingParams);
			
			const confirmed = confirm(`${this.jsonConfirmBookingParams.customer} is booking vehicle ${this.jsonConfirmBookingParams.reg} \n\nFrom ${this.jsonConfirmBookingParams.start} to ${this.jsonConfirmBookingParams.end} inclusive \n\nPrice £${this.jsonConfirmBookingParams.quote}`);
			if( !confirmed )
				{ return false; }
			
			this.$http.post( this.jsonConfirmBookingBase, this.jsonConfirmBookingParams )
				.then(response => this.articleId = response.data.id)
				.catch(error => {
					console.error("There was an error in confirming your booking", error);
					alert("There was an error in confirming your booking, sorry");
				});
		}
  
  },

  mounted() {
    this.getData();
  }
  
};
</script>

