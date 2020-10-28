<template>
	<div>
		<h1>Test1 Page</h1>
		<router-link id="link" :to="{name : 'test', hash : '#link'}">Test</router-link>
		<br><br>
		<router-link :to="{name : 'use' ,query : {name : 'reza',family : 'Nikafarin'}}">Use</router-link>

	</div>
</template>

<script>

    // import DatePicker from "../components/DatePicker";

    export default {
        // components: {DatePicker},

        data() {
            return {
                images: [],
                today: '',
            }
        },

        methods: {
            createUrl(file) {
                return URL.createObjectURL(file);
            }
        },

    }
</script>

<style scoped lang="scss">

	.parent {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;

		.child {
			width: calc(33.33% - 10px);
			margin: 5px;
			flex: 0 0 auto;
			background-position: center;
			background-size: cover;
			border: 2px solid red;

			.ratio {
				position: relative;
				padding-top: 100%;
			}
		}
	}

</style>
