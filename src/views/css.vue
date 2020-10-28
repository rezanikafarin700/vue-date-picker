<template>
	<div>
		<div class="con">
			<div class="circle">
				<div class="h"></div>
				<div class="point"></div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "css"
    }
</script>

<style scoped lang="scss">

	.con {
		width: 1000px;
		margin: 100px  auto 100px auto;

		.circle {
			width: 200px;
			height: 200px;
			border: 5px solid #000000;
			border-radius: 50%;
			position: relative;

			.point{
				width: 20px;
				height: 20px;
				border: 1px solid #000000;
				background-color: #000000;
				border-radius: 50%;
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				margin: auto;
			}

			.h{
				background-color: #555555;
				width: 4px;
				height: 60px;
				border-radius: 2px;
				position: absolute;
				left: 0;
				right: 0;
				top: calc(50% - 60px);
				margin: auto;
				transform-origin: 50% 100%;
			}

		}

	}
</style>