
<script>
function stringToDate(str) {
  const [y, m, d] = str.split('-')
  return new Date(+y, m - 1, +d)
}

function dateToString(date) {
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  )
}

function pad(n, s = String(n)) {
  return s.length < 2 ? `0${s}` : s
}

export default {
  data() {
    return {
		queryDate: dateToString(new Date()),
		todaysDate: dateToString(new Date())		
    }
  },
  
  methods: {
  
    isValidDate(){
      return ( stringToDate(this.queryDate) >= stringToDate(this.todaysDate) )
    },
  
    dateChosen(){ 
    	if( this.isValidDate() ){
			this.$parent.getAvailableVehicles( this.queryDate );
		}  	
    }
    
  },

  created() {
		this.$parent.dateQueried = this.queryDate; 
  }
  
}

</script>

<template>
	<div>
		<p class="adviceNote">Select a date for available vehicles:</p>
		<input type="date" v-model="queryDate" v-on:change="dateChosen">
		<p class="adviceNote" v-if="!this.isValidDate()">Please select a date from today onwards</p>
	</div>
</template>

