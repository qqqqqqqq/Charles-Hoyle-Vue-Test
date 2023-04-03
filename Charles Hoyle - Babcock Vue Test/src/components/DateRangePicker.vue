
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
		priceQueryString: "",
		hireLength: 0,
		confirmHire: false,
		startDate: dateToString(new Date()),
		returnDate: dateToString(new Date())
    }
  },
  computed: {
    canQuote() {
      return ( stringToDate(this.returnDate) >= stringToDate(this.startDate) )
    }
  },
  methods: {
    quote() { 
		this.hireLength = ( (stringToDate(this.returnDate) - stringToDate(this.startDate) ) / 86400000 ) + 1;
		
		this.confirmHire = confirm(`Request price quote? \n\nvehicle ${this.$parent.selectedReg} for ${this.hireLength} days \n\nstarting on ${this.startDate} and ending on ${this.returnDate}`);
		if( !this.confirmHire ) { return false; }
		
		this.$parent.jsonConfirmBookingParams.start = this.startDate;
		this.$parent.jsonConfirmBookingParams.end = this.returnDate;
		this.priceQueryString = "&start=" + this.startDate + "&end=" + this.returnDate;
      	this.$parent.getPrice( this.priceQueryString );
      	
    }
  }
}

</script>

<template>
	<div>

		<input type="date" v-model="startDate">	
		<span class="adviceNote">&nbsp;to&nbsp;</span>
		<input type="date" v-model="returnDate">

		<button :disabled="!canQuote" @click="quote">Quote Price</button>

		<p>{{ canQuote ? '' : 'End date must be on or after start date.' }}</p>
	</div>
</template>

